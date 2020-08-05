import React from 'react';
import styled from 'styled-components';
import { Link, useParams } from 'react-router-dom';
import Octicon, { ChevronLeft, ChevronRight } from '@primer/octicons-react';
import useMediaQuery from '@tevhooks/use-media-query';

import {MEDIA_QUERY} from  '../../config';


const Pagination = (props) => {
  const { repoName } = useParams();
  const { userName } = useParams();
  const breakpoint = useMediaQuery("(min-width: 500px)");
  let pagesLength;

  //Github API only provides a maximum of 1,000 results, which is 40 pages * 25 results per page
  //Check if received number of pages is higher than 40 and set maximum number of 40
  props.numberOfPages > 40
    ? (pagesLength = 40)
    : (pagesLength = props.numberOfPages);

  let numberOfPages = Object.keys(Array.from({ length: pagesLength }));
  let startPages;

  pageNumber = parseInt(pageNumber) || 1;

  //Determine number of shown pages on left side according to current page number
  pageNumber === 6
    ? (startPages = 3)
    : pageNumber > 6
    ? (startPages = 2)
    : (startPages = 5);

  let paginationStart = numberOfPages.slice(0, startPages);
  let paginationEnd = numberOfPages.slice(-2);
  let paginationCurrent = numberOfPages.slice(pageNumber - 3, pageNumber + 2);

  if (pagesLength > 10) {
    // Collapse both sides if page is in the middle range
    if (pageNumber > 6 && pageNumber <= pagesLength - 5) {
      numberOfPages = [...paginationStart, "...", ...paginationCurrent, "..", ...paginationEnd];

      // Collapse right side if page is not in the end range
    } else if (pageNumber <= pagesLength - 5 || pageNumber === 6) {
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
  numberOfPages = numberOfPages.filter(
    (item, index) => numberOfPages.indexOf(item) === index
  );

  return props.numberOfPages <= 1 ? null : (
    <Container>
      <PageButton
        to={{
          pathname: `/${userName}/${repoName}/issues/page/${pageNumber - 1}`,
        }}
        className={`${pageNumber === 1 ? 'disabled' : 'controlButton'}`}
        onClick={window.scrollTo({
          top: 0,
          left: 0,
          behavior: 'smooth',
        })}
      >
        <Octicon icon={ChevronLeft} />
        &nbsp;
        {breakpoint && 'Previous'}
      </PageButton>

      {numberOfPages.map((page, index) => {
        page = parseInt(page);
        return isNaN(page) ? (
          <span key={index}>...</span>
        ) : (
            <PageButton
              key={index}
              to={{
                pathname: `/${userName}/${repoName}/issues/page/${page + 1}`,
              }}
              id={`${page + 1 === pageNumber && "selected"}`}
              onClick={window.scrollTo({
                top: 0,
                left: 0,
                behavior: 'smooth',
              })}
            >
              {page + 1}
            </PageButton>
          );
      })}

      <PageButton
        to={{
          pathname: `/${userName}/${repoName}/issues/page/${pageNumber + 1}`,
        }}
        className={`${
          pageNumber === props.numberOfPages ? "disabled" : "controlButton"
          }`}
        onClick={window.scrollTo({
          top: 0,
          left: 0,
          behavior: 'smooth',
        })}
      >
        {breakpoint && 'Next'}
        &nbsp;
        <Octicon icon={ChevronRight} />
      </PageButton>
    </Container>
  );
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

    :hover {
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

  @media only screen and (max-width: 450px) {
    transform: scale(0.9, 0.9);
  }
`;

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
`;

export default Pagination;
