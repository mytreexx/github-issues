import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Octicon, { IssueOpened, IssueClosed, Comment, TriangleDown } from '@primer/octicons-react';
import { Link, useParams } from 'react-router-dom';
import color from 'color';
import format from 'date-fns/format';
import { Helmet } from 'react-helmet';

import IssueContainerNav from './IssueContainerNav/IssueContainerNav';
import NoIssues from './NoIssues/NoIssues';
import Loading from '../../../UI-components/Loading';
import ErrorPage from '../../../UI-components/ErrorPage';
import Pagination from '../../../UI-components/Pagination';


const IssueContainer = () => {
  const { repoName } = useParams();
  const { userName } = useParams();
  const { pageNumber } = useParams();
  const [issues, setIssues] = useState();
  const [error, setError] = useState(false);
  const [numberOfIssues, setNumberOfIssues] = useState();

  useEffect(() => {
    fetch(`http://localhost:8000/repos/${userName}/${repoName}/page/${pageNumber}`)
      .then(response => response.json())
      .then(response => {
        if (response.error) {
          setError(true);
        } else {
          setError(false);
          setIssues(response.items);
          setNumberOfIssues(response.total_count);
        }
      })
  }, [userName, repoName, pageNumber]);

  console.log(issues)
  return (
    <>
      <Helmet>
        <title>Issues · {`${userName}/${repoName}`} </title>
      </Helmet>
      <IssueContainerNav />
      <Main>
        <IssueListContainer>
          {error ? <ErrorPage /> :
            issues && issues.length > 0 ?
              (
                <>
                  {issues.map(issue =>
                    <Issue key={issue.id}>
                      <Container>
                        <StyledOcticon icon={issue.state === 'open' ? IssueOpened : IssueClosed} />

                        <TitleContainer>
                          <span>
                            <IssueTitleLink to={{ pathname: `/${userName}/${repoName}/issues/${issue.number}` }} >
                              {issue.title}
                            </IssueTitleLink>
                            {issue.labels.map(label =>
                              <Label
                                key={label.id}
                                color={label.color}>
                                {label.name}
                              </Label>
                            )}
                          </span>

                          <IssueDetails>
                            #{issue.number} opened on {format((new Date(issue.created_at)), "MMM d, y")} by <a href='/'>{issue.user.login}</a>
                          </IssueDetails>
                        </TitleContainer>
                      </Container>

                      <Container type='numberOfComments'>
                        {issue.comments > 0 &&
                          <IssueComments>
                            <StyledOcticon icon={Comment} />
                            <span>
                              {issue.comments}
                            </span>
                          </IssueComments>}
                      </Container>
                    </Issue>
                  )}
                </>
              ) : issues ? <NoIssues /> : <Loading />}
        </IssueListContainer>

        <Pagination numberOfPages={Math.ceil(numberOfIssues / 25)} />
      </Main>
    </>
  )
}

const Main = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`

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
    background-color: #F6F8FA;
  }
`

const IssueTitleLink = styled(Link)`
  font-size: 16px;
  text-decoration: none;
  font-weight: 600;
  color: #24292e;
  cursor: pointer;
  
  :hover {
    color: #0366d6;
  }
`

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
`

const Container = styled.span`
  display: flex;
  justify-content: flex-start;
  padding-top: 8px;
  align-self: flex-start;
  min-width: ${props => props.type === 'numberOfComments' && '50px'}
`

const TitleContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  padding: 0 0 8px 8px;
  max-width: 870px;
`

const StyledOcticon = styled(Octicon)`
 color: ${props => props.listHeader ? '#24292e'
    : props.icon === IssueOpened ? '#28a745'
      : props.icon === IssueClosed ? '#cb2431'
        : '#586069'};
  padding: ${props => (props.icon === IssueOpened || props.icon === IssueClosed) && '5px 0 0 16px'};
  width: ${props => props.icon === TriangleDown && '8px'};
  margin-left: ${props => props.icon === TriangleDown && '4px'};      
`

const Label = styled.div`
  background-color: #${props => props.color};
  color: ${props => color('#' + props.color).isLight() ? 'black' : 'white'};
  font-size: 12px;
  font-weight: 600;
  height: 20px;
  padding: 0 8px;
  margin: 0 2px;
  display: inline-block;
  border-radius: 2em;
  box-shadow: inset 0 -1px 0 rgba(27,31,35,.12);
  cursor: pointer;
`

const IssueComments = styled.div`
  padding-right: 16px;
  font-size: 12px;
  font-weight: 600;

  span {
    padding-left: 4px;
  }

`

export default IssueContainer;
