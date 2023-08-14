import ReactPaginate from 'react-paginate';
import styled from 'styled-components';
import { HiChevronRight as Right, HiChevronLeft as Left } from 'react-icons/hi';

interface PaginationProps {
  totalPages: number;
  page: number;
  onPageChange: (selected: number) => void;
}
/** 2023/08/15- 페이지네이션 컴포넌트 - by leekoby */

const Pagination = ({ totalPages, page, onPageChange }: PaginationProps) => {
  const handlePageClick = (selectedItem: { selected: number }) => {
    onPageChange(selectedItem.selected + 1);
  };

  return (
    <MyPaginate
      forcePage={page - 1}
      previousLabel={<Left />}
      nextLabel={<Right />}
      breakLabel={'...'}
      pageCount={totalPages}
      marginPagesDisplayed={2}
      pageRangeDisplayed={3}
      onPageChange={handlePageClick}
      containerClassName="pagination justify-content-center"
      pageClassName="page-item"
      pageLinkClassName="page-link"
      previousClassName="page-item"
      previousLinkClassName="page-link"
      nextClassName="page-item"
      nextLinkClassName="page-link"
      activeClassName="active"
    />
  );
};

const MyPaginate = styled(ReactPaginate).attrs({
  activeClassName: 'active',
})`
  background-color: var(--color-light);
  font-size: 1.6rem;
  display: flex;
  justify-content: center;
  list-style-type: none;
  padding: 0 5rem;
  li a {
    border-radius: 7px;
    padding: 0.1rem 1rem;
    cursor: pointer;
  }
  li.previous a,
  li.next a {
    color: var(--color-sub);
  }
  li.active a {
    color: var(--color-main);

    font-weight: 700;
    min-width: 32px;
  }
  li.disabled a {
    color: var(--color-light-gray);
  }
  li.disable,
  li.disabled a {
    cursor: default;
  }
`;
export default Pagination;
