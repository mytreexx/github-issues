import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Octicon, {
  IssueOpened,
  IssueClosed,
  Comment,
} from '@primer/octicons-react';
import { Link, useParams } from 'react-router-dom';
import color from 'color';
import format from 'date-fns/format';
import { Helmet } from 'react-helmet';
import * as queryString from 'query-string';

import NoIssues from './NoIssues/NoIssues';
import Loading from '../../../../UI-components/Loading';
import ErrorPage from '../../../../UI-components/ErrorPage';
import Pagination from '../../../../UI-components/Pagination';
import { SERVER_URL } from '../../../../../config';

const IssueList = (props) => {
  const { repoName } = useParams();
  const { userName } = useParams();

  const [issues, setIssues] = useState();
  const [error, setError] = useState(false);
  const [numberOfIssues, setNumberOfIssues] = useState();
  const [isLoading, setIsLoading] = useState(false);

  let filter;

  const queryParameters = queryString.parse(window.location.search);
  const pageNumber = Number(queryParameters.page) || 1;

  props.openFilter && props.closedFilter
    ? (filter = 'all')
    : !props.openFilter && props.closedFilter
    ? (filter = 'closed')
    : (filter = 'open');

  useEffect(() => {
    fetch(
      `${SERVER_URL}/repos/${userName}/${repoName}?is=${filter}&page=${pageNumber}`
    )
      .then(setIsLoading(true))
      .then((response) => response.json())
      .then((response) => {
        if (response.error) {
          setError(true);
        } else {
          setError(false);
          setIssues(response.items);
          setNumberOfIssues(response.total_count);
          setIsLoading(false);
          window.history.pushState('', '', `?page=${pageNumber}&is=${filter}`);
        }
      });
  }, [userName, repoName, pageNumber, filter]);

  if (error) {
    return (
      <Main>
        <ErrorPage />
      </Main>)
  } else if (issues) {
    if (isLoading) {
      return <Loading />
    } else if (issues.length <= 0) {
      return (
        <Main>
          <NoIssues />
        </Main>
      )
    }
  } else {
    return <Loading />
  };

  return (
    <>
      <Helmet>
        <title>Issues · {`${userName}/${repoName}`} </title>
      </Helmet>

      <Main>
        <IssueListContainer>
          {
            issues.map((issue) => (
              <Issue key={issue.id}>
                <Container>
                  <StyledOcticon
                    icon={issue.state === 'open' ? IssueOpened : IssueClosed}
                  />

                  <TitleContainer>
                    <span>
                      <IssueTitleLink
                        to={{
                          pathname: `/${userName}/${repoName}/issues/${issue.number}`,
                        }}
                      >
                        {issue.title}
                      </IssueTitleLink>
                      {issue.labels.map((label) => (
                        <Label key={label.id} color={label.color}>
                          {label.name}
                        </Label>
                      ))}
                    </span>

                    <IssueDetails>
                      #{issue.number} opened on{' '}
                      {format(new Date(issue.created_at), 'MMM d, y')} by{' '}
                      <a href={'https://github.com/' + issue.user.login}>
                        {issue.user.login}
                      </a>
                    </IssueDetails>
                  </TitleContainer>
                </Container>

                <Container type='numberOfComments'>
                  {issue.comments > 0 && (
                    <IssueComments>
                      <StyledOcticon icon={Comment} />
                      <span>{issue.comments}</span>
                    </IssueComments>
                  )}
                </Container>
              </Issue>
            ))
          }
        </IssueListContainer>

        <Pagination pageNumber={pageNumber} numberOfPages={Math.ceil(numberOfIssues / 25)} />
      </Main>
    </>
  );
};

const Main = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const IssueListContainer = styled.div`.
  display: flex;
  width: 1214px;
  max-width: 1214px;
  width: 95%;
  min-height: 335px;
  padding: 0;
  border: solid 1px #e1e4e8;
  border-top: solid 1px transparent;
  border-radius: 4px;
  margin: 0 32px; 
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  align-items: center;
`;

const Issue = styled.div`
  width: 100%;
  min-height: 57.5px;
  border-top: solid 1px #e1e4e8;
  margin: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;

  :hover {
    background-color: #f6f8fa;
  }
`;

const IssueTitleLink = styled(Link)`
  font-size: 16px;
  text-decoration: none;
  font-weight: 600;
  color: #24292e;
  cursor: pointer;

  :hover {
    color: #0366d6;
  }
`;

const IssueDetails = styled.span`
  font-size: 12px;
  color: #586069;

  a {
    text-decoration: none;
    color: #586069;
    cursor: pointer;

    :hover {
      color: #0366d6;
    }
  }
`;

const Container = styled.span`
  display: flex;
  justify-content: flex-start;
  padding-top: 8px;
  align-self: flex-start;
  min-width: ${(props) => props.type === 'numberOfComments' && '50px'};
`;

const TitleContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  padding: 0 0 8px 8px;
  max-width: 870px;
`;

const StyledOcticon = styled(Octicon)`
  color: ${(props) =>
    props.listHeader
      ? '#24292e'
      : props.icon === IssueOpened
      ? '#28a745'
      : props.icon === IssueClosed
      ? '#cb2431'
      : '#586069'};
  padding: ${(props) =>
    (props.icon === IssueOpened || props.icon === IssueClosed) &&
    '5px 0 0 16px'};
  flex-shrink: 0;
`;

const Label = styled.div`
  background-color: #${(props) => props.color};
  color: ${(props) => (color('#' + props.color).isLight() ? 'black' : 'white')};
  font-size: 12px;
  font-weight: 600;
  height: 20px;
  padding: 0 8px;
  margin: 0 2px;
  display: inline-block;
  border-radius: 2em;
  box-shadow: inset 0 -1px 0 rgba(27, 31, 35, 0.12);
  cursor: pointer;
`;

const IssueComments = styled.div`
  padding-right: 16px;
  font-size: 12px;
  font-weight: 600;

  span {
    padding-left: 4px;
  }
`;

export default IssueList;
