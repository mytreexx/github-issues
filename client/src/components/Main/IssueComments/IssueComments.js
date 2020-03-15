import React, { useState, useEffect } from 'react';


const IssueComments = () => {
  const [issue, setIssue] = useState();
  const [issueComments, setIssueComments] = useState();

  useEffect(() => {
    fetch('http://localhost:8000/repos/bluzi/name-db/458')
      .then(response => response.json())
      .then(issueDetails => {
        setIssue(issueDetails.items);
        console.log(issueDetails.title);
      })
  }, []);

  useEffect(() => {
    fetch('http://localhost:8000/repos/bluzi/name-db/458/comments')
      .then(response => response.json())
      .then(issueComments => {
        setIssueComments(issueComments.items);
        issueComments.map((comment) =>
        console.log(comment.body));
      })
  }, []);


  return (
    <div>
      issue comments
    </div>
  )
}

export default IssueComments;
