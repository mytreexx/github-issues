import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Flex } from 'reflexbox/styled-components';
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

  console.log(numberOfIssues)
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
              (<>
                <IssueListHeader>
                  <span>
                    <StyledOcticon listHeader icon={IssueOpened} />
                    <a href='/'> 18 Open</a>
                    <a href='/'>21 Closed</a>
                  </span>

                  <span>
                    <a href='/'>
                      Author
                  <StyledOcticon icon={TriangleDown} />
                    </a>
                    <a href='/'>
                      Label
                  <StyledOcticon icon={TriangleDown} />
                    </a>
                    <a href='/'>
                      Projects
                  <StyledOcticon icon={TriangleDown} />
                    </a>
                    <a href='/'>
                      Milestones
                  <StyledOcticon icon={TriangleDown} />
                    </a>
                    <a href='/'>
                      Asignee
                  <StyledOcticon icon={TriangleDown} />
                    </a>
                    <a href='/'>
                      Sort
                  <StyledOcticon icon={TriangleDown} />
                    </a>
                  </span>
                </IssueListHeader>

                {
                  issues.map(issue =>
                    <Issue key={issue.id}>
                      <Container>
                        <StyledOcticon icon={issue.state === 'open' ? IssueOpened : IssueClosed} />

                        <TitleContainer>
                          <span>
                            <IssueTitleLink to={{ pathname: `/${userName}/${repoName}/issues/${issue.number}` }} >
                              {issue.title}
                            </IssueTitleLink>
                            {
                              issue.labels.map(label =>
                                <Label
                                  key={label.id}
                                  color={label.color}>
                                  {label.name}
                                </Label>
                              )
                            }
                          </span>

                          <IssueDetails>
                            #{issue.number} opened on {format((new Date(issue.created_at)), "MMM d, y")} by <a href='/'>{issue.user.login}</a>
                          </IssueDetails>
                        </TitleContainer>
                      </Container>

                      <Container>
                        {
                          issue.comments > 0 &&
                          <>
                            <StyledOcticon icon={Comment} />
                            {issue.comments}
                          </>
                        }
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


const IssueListContainer = styled(Flex).attrs({
  width: "978px",
  minHeight: "335px"
})`
  padding: 0;
  border: solid 1px #d1d5da;
  border-radius: 4px;
  margin: auto; 
  display: flex;
  flex-direction: column;
  align-items: center;
  }
`;

const Issue = styled.div`
  width: 100%;
  min-height: 57.5px;
  border-top: solid 1px #d1d5da;
  margin: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;

  :hover {
    background-color: #F6F8FA;
  }
`

const IssueListHeader = styled(Issue)`
  border-top: none;
  width: 100%;
  background-color: #F6F8FA;
  pointer-events: none;

  span {
    margin-right: 20px;
  }

  a {
    color: #586069;
    text-decoration: none;
    font-size: 14px; 
    margin-left: 32px;
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
`

const TitleContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  padding: 0 0 8px 8px;
  max-width: 690px;
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
  padding: 0 4px;
  margin: 0 2px;
  display: inline-block;
  border-radius: 2px;
  box-shadow: inset 0 -1px 0 rgba(27,31,35,.12);
  cursor: pointer;
`

export default IssueContainer;
