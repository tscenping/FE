import { useState } from 'react'
import Pagination from 'react-js-pagination'
import styled from 'styled-components'

interface paginationProps {
  totalItemsCount: number // Required. Total count of items which you are going to display
  // onChange?: Function //Required. Page change handler. Receive pageNumber as arg
  activePage?: number // Required. Active page
  itemsCountPerPage?: number // Count of items per page
  pageRangeDisplayed?: number //Range of pages in paginator, exclude navigation blocks (prev, next, first, last pages)
  prevPageText?: string // or ReactElement Text of prev page navigation button
  firstPageText?: string // or ReactElement Text of first page navigation button
  lastPageText?: string // or ReactElement Text of first page navigation button
  nextPageText?: string // or ReactElement Text of first page navigation button
  // getPageUrl?: Function // Generate href attribute for page
  innerClass?: string // default: pagination Class name of <ul> tag
  activeClass?: string // default: active Class name of active <li> tag
  activeLinkClass?: string // Class name of active <a> tag
  itemClass?: string // Default class of the <li> tag
  itemClassFirst?: string // Class of the first <li> tag
  itemClassPrev?: string // Class of the previous <li> tag
  itemClassNext?: string // Class of the next <li> tag
  itemClassLast?: string // Class of the last <li> tag
  disabledClass?: string // default: Class name of the first, previous, next and last <li> tags when disabled
  hideDisabled?: boolean // default: false navigation buttons (prev, next, first, last) if they are disabled.
  hideNavigation?: boolean // default: false Hide navigation buttons (prev page, next page)
  hideFirstLastPages?: boolean // default: false Hide first/last navigation buttons
  linkClass?: string // Default class of the <a> tag
  linkClassFirst?: string // Class of the first <a> tag
  linkClassPrev?: string // Class of the previous <a> tag
  linkClassNext?: string // Class of the next <a> tag
  linkClassLast?: string // Class of the last <a> tag
}

const PaginationBox = styled.div`
  .pagination {
    display: flex;
    justify-content: center;
    margin-top: 15px;
    scale: 1.5;
  }
  ul {
    list-style: none;
    padding: 0;
  }
  ul.pagination li {
    display: inline-block;
    width: 24px;
    height: 24px;
    border: 1px solid #e2e2e2;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 14px;
    cursor: pointer;
  }
  ul.pagination li:first-child {
    border-radius: 5px 0 0 5px;
  }
  ul.pagination li:last-child {
    border-radius: 0 5px 5px 0;
  }
  ul.pagination li a {
    text-decoration: none;
    color: #337ab7;
    font-size: 14px;
  }
  ul.pagination li.active a {
    color: white;
  }
  ul.pagination li.active {
    background-color: #337ab7;
  }
  ul.pagination li a:hover,
  ul.pagination li a.active {
    color: blue;
  }
`
export default function CustomPagination(props: paginationProps) {
  const [page, setPage] = useState(1)

  const handlePageChange = (page: number) => {
    setPage(page)
    console.log(page)
  }

  return (
    <div>
      <PaginationBox>
        <Pagination
          activePage={page} // 현재 페이지
          itemsCountPerPage={props.itemsCountPerPage} // 한 페이지에 보여줄 아이템 개수
          totalItemsCount={props.totalItemsCount} // 전체 아이템 개수
          pageRangeDisplayed={5} // 페이지 범위
          prevPageText={'‹'}
          nextPageText={'›'}
          onChange={handlePageChange}
        />
      </PaginationBox>
    </div>
  )
}
