import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';


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
      <IssueDetails>
        {issue.title}
        {issue.body}
      </IssueDetails>

      <CommentSection>
        <span />
        {issueComments.map(comment =>
          <Comment>
            {comment.body}
          </Comment>
        )}
      </CommentSection>

    </>
  )
}


const IssueDetails = styled.div`
    border: 1px solid black;
    width: 700px;
    margin: auto;
  `
  
const CommentSection = styled.div`
  width: 700px;
  margin: auto;
  span {
    border-left: #e1e4e8 solid 2px;
    height: 1300px;
    z-index: -1;
    position: absolute;
    margin-left: 16px;
  }
`

const Comment = styled.div`
    border: 1px black solid;
    width: 669px;
    margin: 32px auto;
    min-height: 21px;
    padding: 16px;
    background-color: white;
  `

export default IssueComments;
