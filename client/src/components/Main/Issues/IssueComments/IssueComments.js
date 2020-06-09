import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import Octicon, { IssueOpened } from '@primer/octicons-react';
import format from 'date-fns/format';
import color from 'color';
import ReactMarkdown from 'react-markdown';
import { Helmet } from 'react-helmet';


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
      <Helmet>
        <title>{`${issue.title} · Issue #${issue.number} · ${userName}/${repoName}`}</title>
      </Helmet>
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
                <span id='state'>
                  {issue.state}
                </span>
              </Status>
              <div id='details'>
                <a href='/'>{issue.user.login}</a> opened this issue on {format((new Date(issue.created_at)), "MMM d, y")} · {issue.comments} comments
              </div>
            </div>
          </Title>
          <NewIssueButton>
            New issue
          </NewIssueButton>
        </IssueDetails>
        <Main>
          <CommentSection>
            <VerticalLine />

            <Comment>

              <Avatar size='large' src={issue.user.avatar_url} />

              <Arrow />

              <CommentBox>
                <CommentDetails type='title'>
                  <a href='/'>{issue.user.login}</a> commented on {format((new Date(issue.created_at)), "MMM d, y")}
                </CommentDetails>
                <p>
                  <ReactMarkdown source={issue.body} />
                </p>

              </CommentBox>
            </Comment>

            {issueComments.map(comment =>
              <Comment key={comment.id}>
                <Avatar size='large' src={comment.user.avatar_url} />

                <Arrow />

                <CommentBox >
                  <CommentDetails type='title'>
                    <a href='/'>{issue.user.login}</a> commented on {format((new Date(issue.created_at)), "MMM d, y")}
                  </CommentDetails>

                  <ReactMarkdown source={comment.body} />

                </CommentBox>
              </Comment>
            )}
          </CommentSection>

          <SidebarSection>
            <SideDetails>
              <div>
                Assignees
              </div>

              {issue.assignees ? issue.assignees.map(user =>
                <div key={user.id} className='assignee'>
                  <Avatar src={user.avatar_url} />
                  <a href='/'>
                    {user.login}
                  </a>
                </div>
              ) : <span>No one assigned</span>}
            </SideDetails>

            <SideDetails>
              <div>
                Labels
              </div>
              {
                issue.labels.map(label =>
                  <Label
                    key={label.id}
                    color={label.color}>
                    {label.name}
                  </Label>
                )
              }

            </SideDetails>

            <SideDetails>
              <div>Projects</div>
              <span>None yet</span>
            </SideDetails>
            <SideDetails>
              <div>Milestone</div>
              {issue.milestone === null ? (<span>No milestone</span>) : (
                <>
                  <MilestoneBar width={issue.milestone.closed_issues / (issue.milestone.open_issues + issue.milestone.closed_issues) * 100}>
                    <div className='progressBar' />
                  </MilestoneBar>
                  <div>{issue.milestone.title}</div>
                </>
              )}

            </SideDetails>
          </SidebarSection>
        </Main>
      </Container>
    </>
  )
}


const IssueDetails = styled.div`
  border-bottom: 1px solid #e1e4e8;
  min-height: 100px;
  display: flex;
  justify-content: space-between;
`

const CommentSection = styled.div`
  width: 727px;
  position: relative;
  border-bottom: 2px solid #e1e4e8;
`

const Comment = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 16px;
  margin-bottom: 32px;
  min-height: 93px;
  font-size: 14px;
`

const CommentBox = styled.div`
  border: 1px #d1d5da solid;
  width: 671px;
  background-color: white;
  border-radius: 3px;

  p {
    margin: 16px 16px;
  }

  img {
    width: 100%;
  }
`

const CommentDetails = styled.div`
  background-color: #F6F8FA;
  color: #586069;
  height: 39px;
  border-bottom: 1px #e1e4e8 solid;
  padding: 8px 16px;
  box-sizing: border-box;

  a {
    text-decoration: none;
    color: #24292e;
    font-weight: 600;
    cursor: pointer;

    :hover {
      color: #0366d6;
      text-decoration: underline;
    }
  }
`

const Arrow = styled.div`
  width: 8px;
  height: 8px;
  background-color: #F6F8FA;
  transform: rotate(45deg);
  border-bottom: 1px solid #d1d5da;
  border-left: 1px solid #d1d5da;
  margin-top: 16px;
  position: relative;
  left: 6px;
`

const Container = styled.div`
  width: 980px;
  margin: auto;
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
  margin-bottom: 8px;
  
  span {
    color: #6a737d;
    font-weight: 300;

  }

  div {
    font-size: 14px;
  }
  
  #details {
    display: inline-block;
    color: #586069;
  }

  #datails, a {
    color: #586069;
    font-weight: 600;
    text-decoration: none;
    margin-left: 8px;

    :hover {
      color: #0366d6;
      text-decoration: underline;
    }
  }
`

const Status = styled.div`
  margin: 8px 0;
  background-color: #2cbe4e;
  color: white;
  border-radius: 3px;
  padding: 4px 8px;
  display: inline-block;
  text-transform: capitalize;

  #state {
    color: white;
    font-size: 14px;
    font-weight: 600;
    line-height: 20px;
    margin-left: 4px;
  }
`

const NewIssueButton = styled.span`
  background-image: linear-gradient(-180deg,#34d058,#28a745 90%);
  padding: 3px 10px;
  font-size: 12px;
  line-height: 20px;
  color: white;
  font-weight: 600;
  margin: 32px 0;
  height: 20px;
  vertical-align: middle;
  cursor: pointer;
  border: 1px solid rgba(27,31,35,.2);
  border-radius: .25em;

  :hover {
    border: black;
  }
`

const SideDetails = styled.div`
  border-bottom: 1px #e1e4e8 solid;
  padding-top: 16px;
  font-size: 12px;
  color: #586069;
  display: flex;
  flex-direction: column;    
  font-weight: 600;
  
  div {
    line-height: 20px;
    display: flex;
    margin-bottom: 10px;
  }

  a {
    color: #24292e;
    text-decoration: none;

    :hover {
      color: #0366d6;
    }
  }

  div:first-of-type {
    color: #586069;
    margin-bottom: 8px;
  }

  :last-child {
    border-bottom: none;
  }

  span {
    font-weight: 400;
    margin-bottom: 16px;
  }
`

const SidebarSection = styled.div`
  width: 220px;
  padding-top: 16px;
`

const Avatar = styled.img`
  width: ${props => props.size === "large" ? "40px" : "20px"};
  height: ${props => props.size === "large" ? "40px" : "20px"};
  border-radius: 3px;
  margin-right: 2px;
`

const Label = styled.div`
  background-color: #${props => props.color};
  color: ${props => color('#' + props.color).isLight() ? 'black' : 'white'};
  font-size: 12px;
  font-weight: 600;
  height: 20px;
  padding: 0 4px;
  margin-bottom: 3px !important;
  border-radius: 2px;
  cursor: pointer;

`

const MilestoneBar = styled.div`
  width: 221px;
  height: 8px;
  background-color: #eaecef;
  border-radius: 3px;

  .progressBar {
    width: ${props => props.width}%;
    height: 8px;
    background-color: #2cbe4e;
    border-radius: 3px 0 0 3px; 
   }
`

const VerticalLine = styled.div`
  background-color: white;
  border-right: 2px solid #e1e4e8;
  height: 100%;
  width: 68px;
  z-index: -1;
  position: absolute;
  margin-top: 35px;
`

export default IssueComments;
