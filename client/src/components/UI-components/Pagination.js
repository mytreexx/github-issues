import React from 'react';
import styled from 'styled-components';
import { Link, useParams } from 'react-router-dom';
import Octicon, { ChevronLeft, ChevronRight } from '@primer/octicons-react';


const Pagination = (props) => {
  const { repoName } = useParams();
  const { userName } = useParams();
  let { pageNumber } = useParams();

  let numberOfPages = Object.keys(Array.from({ length: props.numberOfPages }));
  let startPages;

  pageNumber = parseInt(pageNumber) || 1;

  //Determine number of shown pages on left side according to current page number
  (pageNumber === 6) ? startPages = 3 : (pageNumber > 6) ? startPages = 2 : startPages = 5;


  let paginationStart = numberOfPages.slice(0, startPages);
  let paginationEnd = numberOfPages.slice(-2);
  let paginationCurrent = numberOfPages.slice(pageNumber - 3, pageNumber + 2);

  if (props.numberOfPages > 10) {
    // Collapse both sides if page is in the middle range
    if (pageNumber > 6 && pageNumber <= props.numberOfPages - 5) {
      numberOfPages = [...paginationStart, "...", ...paginationCurrent, "..", ...paginationEnd];

      // Collapse right side if page is not in the end range
    } else if (pageNumber <= props.numberOfPages - 5 || pageNumber === 6) {
      numberOfPages = [...paginationStart, ...paginationCurrent, "...", ...paginationEnd];

      // Collapse left side if page is not in the start range
    } else if (pageNumber >= 6) {
      numberOfPages = [...paginationStart, "...", ...paginationCurrent, ...paginationEnd]

      // No collapsing in other cases
    } else {
      numberOfPages = [...paginationStart, ...paginationCurrent, ...paginationEnd];
    }
  }

  // Filter out duplicate page numbers within paginationStart, paginationCurrent, paginationEnd
  numberOfPages = numberOfPages.filter((item, index) => numberOfPages.indexOf(item) === index);


  return (
    props.numberOfPages <= 1 ? null :
      (
        <Container>
          <PageButton
            to={{ pathname: `/${userName}/${repoName}/issues/page/${pageNumber - 1}` }}
            className={`${pageNumber === 1 ? 'disabled' : 'controlButton'}`}
          >
            <Octicon icon={ChevronLeft} />
            &nbsp;
            Previous
          </PageButton>

          {numberOfPages.map((page, index) => {
            page = parseInt(page)
            return (isNaN(page) ? <span key={index}>...</span> :
              <PageButton
                key={index}
                to={{ pathname: `/${userName}/${repoName}/issues/page/${page + 1}` }}
                id={`${page + 1 === pageNumber && 'selected'}`}
              >
                {page + 1}
              </PageButton>
            )
          })}

          <PageButton
            to={{ pathname: `/${userName}/${repoName}/issues/page/${pageNumber + 1}` }}
            className={`${pageNumber === props.numberOfPages ? 'disabled' : 'controlButton'}`}
          >
            Next
            &nbsp;
            <Octicon icon={ChevronRight} />
          </PageButton>
        </Container>)
  )
};


const Container = styled.div`
  margin-top: 20px;

  span {
    color: #24292e;
  }
  
  .disabled {
    color: #6a737d;
    cursor: default;
    pointer-events: none;
    
    :hover{
      border: 1px solid transparent;
    }
  }

  .controlButton {
    color: #0366d6;
  }

  #selected {
    background-color: #0366d6;
    border-radius: 5px;
    color: white;
    
    :hover {
      border: 1px #0366d6 solid;
      border-radius: 5px;
    }
  }
`

const PageButton = styled(Link)`
  padding: 5px 12px;
  line-height: 20px;
  border: 1px solid transparent;
  color: #24292e;
  text-decoration: none;
  font-size: 14px;
  margin: 20px 2px 0;
  font-weight: 400;

  :hover {
    border: 1px #e1e4e8 solid;
    border-radius: 5px;
  }
`

export default Pagination;