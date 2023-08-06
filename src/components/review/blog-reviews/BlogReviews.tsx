import { useFetchBlogPosts } from '@hooks/query/useFetchBlogPosts';
import styled from 'styled-components';
import BlogSwiper from './BlogSwiper';

interface Props {
  festivalName: string;
}
/** 2023/07/21 - Blog 게시글 영역 - by leekoby */
const BlogReviews: React.FC<Props> = ({ festivalName }): JSX.Element => {
  const { data, isLoading } = useFetchBlogPosts(festivalName);
  if (isLoading) return <>Loading...</>;

  return <BlogReviewContainer>{data && data && <BlogSwiper BlogPosts={data} />}</BlogReviewContainer>;
};

export default BlogReviews;

const BlogReviewContainer = styled.section`
  margin-bottom: 3rem;
`;
