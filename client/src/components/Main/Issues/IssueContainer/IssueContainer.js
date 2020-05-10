import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Flex } from 'reflexbox/styled-components';
import Octicon, { IssueOpened, IssueClosed, Comment, TriangleDown } from '@primer/octicons-react';
import { Link, useParams } from 'react-router-dom';
import color from 'color';
import format from 'date-fns/format';

import IssueContainerNav from './IssueContainerNav/IssueContainerNav';
import NoIssues from './NoIssues/NoIssues';


const IssueContainer = () => {
  const { repoName } = useParams();
  const { userName } = useParams();
  const [issues, setIssues] = useState();
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:8000/repos/${userName}/${repoName}/`)
      .then(response => response.json())
      .then(response => {
        if (response.error) {
          setError(true);
        } else {
          setError(false);
          setIssues(response.items);
        }
      })
  }, [userName, repoName]);

  return (
    <>
      <IssueContainerNav />

      {error && <div>Could not show issues</div>}

      <IssueListContainer>
        {issues ?
          (<>
            <IssueListHeader>
              <span>
                <IssueOcticon icon={IssueOpened} />
                <a href='/'> 18 Open</a>
                <a href='/'>21 Closed</a>
              </span>

              <span>
                <a href='/'>
                  Author
                  <ArrowDownOcticon icon={TriangleDown} />
                </a>
                <a href='/'>
                  Label
                  <ArrowDownOcticon icon={TriangleDown} />
                </a>
                <a href='/'>
                  Projects
                  < ArrowDownOcticon icon={TriangleDown} />
                </a>
                <a href='/'>
                  Milestones
                  <ArrowDownOcticon icon={TriangleDown} />
                </a>
                <a href='/'>
                  Asignee
                  <ArrowDownOcticon icon={TriangleDown} />
                </a>
                <a href='/'>
                  Sort
                  <ArrowDownOcticon icon={TriangleDown} />
                </a>
              </span>
            </IssueListHeader>

            {
              issues.map(issue =>
                <Issue key={issue.id}>
                  <Container>
                    <IssueOcticon icon={issue.state === 'open' ? IssueOpened : IssueClosed} />

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
                        <CommentOcticon icon={Comment} />
                        {issue.comments}
                      </>
                    }
                  </Container>
                </Issue>
              )}
          </>
          ) : <NoIssues />}
      </IssueListContainer>
    </>
  )
}


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

const IssueOcticon = styled(Octicon)`
  color: #28a745;
  padding: 5px 0 0 16px;
`

const CommentOcticon = styled(Octicon)`
  color: #586069;
`

const ArrowDownOcticon = styled(Octicon)`
  width: 8px;
  margin-left: 4px;
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
