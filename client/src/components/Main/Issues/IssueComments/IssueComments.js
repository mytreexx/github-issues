import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import Octicon, { IssueOpened } from '@primer/octicons-react';
import format from 'date-fns/format';



const IssueComments = () => {
  const { issueNumber } = useParams();
  const { repoName } = useParams();
  const { userName } = useParams();

  const [issue, setIssue] = useState();
  const [issueComments, setIssueComments] = useState();

  useEffect(() => {
    fetch(`http://localhost:8000/repos/${userName}/${repoName}/${issueNumber}`)
      .then(response => response.json())
      .then(issueDetails => {
        setIssue(issueDetails);
      })

    fetch(`http://localhost:8000/repos/${userName}/${repoName}/${issueNumber}/comments`)
      .then(response => response.json())
      .then(issueComments => {
        setIssueComments(issueComments);
      })
  }, [issueNumber, repoName, userName]);


  if (!issue || !issueComments) {
    return null;
  }

  return (
    <>
      <Container>
        <IssueDetails>
          <Title>
            {issue.title}
            <span>
              #{issue.number}
            </span>
            <div>
              <Status>
                <Octicon icon={IssueOpened} />
                {issue.state}
              </Status>
              {issue.user.login} opened this issue at {format((new Date(issue.created_at)), "MMM d, y")} · {issue.comments} comments
            </div>
          </Title>

        </IssueDetails>
        <Main>
          <CommentSection>
            <Comment>
              {issue.body}
            </Comment>

            {issueComments.map(comment =>
              <Comment>
                {comment.body}
              </Comment>
            )}
          </CommentSection>

          <SidebarSection>
            <p>Assignees</p>
            <p>Assignees</p>
            <p>Assignees</p>
            <p>Assignees</p>
            <p>Assignees</p>
          </SidebarSection>
        </Main>

      </Container>


    </>
  )
}


const IssueDetails = styled.div`
  border-bottom: 1px solid #e1e4e8;
  min-height: 110px;
  `

const CommentSection = styled.div`
  width: 700px;
  
`

const Comment = styled.div`
  border: 1px black solid;
  width: 669px;
  margin: 32px auto;
  min-height: 21px;
  padding: 16px;
  background-color: white;
  `


const Container = styled.div`
  width: 980px;
  margin: auto;
  `

const SidebarSection = styled.div`
  width: 220px;
  border: 1px red solid;
`
const Main = styled.div`
  display: flex;
  justify-content: space-between;
`

const Title = styled.h1`
  font-size: 32px;
  font-weight: 400;
  max-width: 900px;
  line-height: 1.125;
  
    span {
      color: #6a737d;
      font-weight: 300;
      margin-left: 8px;
    }

    div {
      font-size: 14px;
    }
    
`

const Status = styled.div`
  background-color: #2cbe4e;
  color: white;
  font-size: 14px;
  border-radius: 3px;
  padding: 4px 8px;
  font-weight: 600;
  line-height: 20px;
  display: inline-block;
  text-transform: capitalize;
`



export default IssueComments;
