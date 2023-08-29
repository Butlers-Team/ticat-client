import { useInfiniteQuery } from '@tanstack/react-query';
import { getCatergories } from '@api/category';
import { CategoriesRequest } from 'types/api/category';

/** 2023/07/11 - 축제 카테고리 클릭 시 축제 리스트 무한스크롤 패칭 쿼리 - sineTlsl */
const useFetchCategories = (categoryTab: string, selectedItems: string[]) => {
  const { data, fetchNextPage, hasNextPage, isLoading } = useInfiniteQuery(
    ['categories', categoryTab, selectedItems.join(',')],
    ({ pageParam = 1 }) => {
      let params: CategoriesRequest = {
        page: pageParam,
        size: 10,
      };
      if (categoryTab !== '전체' && selectedItems.length >= 1) {
        const areas = selectedItems.join(',');

        params = {
          category: categoryTab,
          ...params,
          areas,
        };
      } else if (categoryTab === '전체' && selectedItems.length >= 1) {
        const areas = selectedItems.join(',');

        params = {
          ...params,
          areas,
        };
      } else if (categoryTab !== '전체') {
        params = {
          category: categoryTab,
          ...params,
        };
      }

      return getCatergories(params);
    },
    {
      getNextPageParam: lastPage => {
        const { page, totalPages } = lastPage.pageInfo;
        const nextPage = page < totalPages ? page + 1 : undefined;

        return nextPage;
      },
    },
  );

  return { data, fetchNextPage, hasNextPage, isLoading };
};

export { useFetchCategories };
