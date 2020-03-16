import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Flex } from 'reflexbox/styled-components';


const IssueComments = () => {
  const [issue, setIssue] = useState();
  const [issueComments, setIssueComments] = useState();

  useEffect(() => {
    fetch('http://localhost:8000/repos/bluzi/name-db/458')
      .then(response => response.json())
      .then(issueDetails => {
        setIssue(issueDetails);
      })

    fetch('http://localhost:8000/repos/bluzi/name-db/458/comments')
      .then(response => response.json())
      .then(issueComments => {
        setIssueComments(issueComments);
      })
  }, []);


  if (!issue || !issueComments) {
    return null;
  }

  return (
    <>
      <IssueDetails>
        {issue.title}
        {issue.body}
      </IssueDetails>

      {issueComments.map(comment =>
        <Comment>
          {comment.body}
        </Comment>
      )}

    </>
  )

}


const IssueDetails = styled.div`
    border: 1px solid black;
  `

const Comment = styled.div`
    border: 1px black solid;
  `

export default IssueComments;
