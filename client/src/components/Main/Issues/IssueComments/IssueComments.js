import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import Octicon, { IssueOpened, IssueClosed } from '@primer/octicons-react';
import format from 'date-fns/format';
import color from 'color';
import ReactMarkdown from 'react-markdown';
import { Helmet } from 'react-helmet';

import NotFound from '../../../UI-components/NotFound';
import { SERVER_URL, MEDIA_QUERY } from '../../../../config';
import Loading from '../../../UI-components/Loading';


const IssueComments = () => {
  const { issueNumber } = useParams();
  const { repoName } = useParams();
  const { userName } = useParams();

  const [issue, setIssue] = useState();
  const [issueComments, setIssueComments] = useState();
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch(`${SERVER_URL}/repos/${userName}/${repoName}/${issueNumber}`)
      .then((response) => response.json())
      .then((issueDetails) => {
        if (issueDetails.length === 0) {
          setError(true);
          console.log(error);
        } else {
          setError(false);
          setIssue(issueDetails);
        }
      });

    fetch(`${SERVER_URL}/repos/${userName}/${repoName}/${issueNumber}/comments`)
      .then((response) => response.json())
      .then((issueComments) => {
        setIssueComments(issueComments);
      });
  }, [issueNumber, repoName, userName, error]);

  if (!issue || !issueComments) {
    return <Loading />
  } else if (issue.error) {
    return <NotFound />
  };

  return (
    <>
      <Helmet>
        <title>{`${issue.title} · Issue #${issue.number} · ${userName}/${repoName}`}</title>
      </Helmet>

      <Container>
        <IssueDetails>
          <Title>
            {issue.title}
            &nbsp;
              <span>#{issue.number}</span>
            <div>
              <Status
                state={issue.state === 'open' ? 'openedState' : 'closedState'}
              >
                <Octicon
                  icon={issue.state === 'open' ? IssueOpened : IssueClosed}
                />
                <span id='state'>{issue.state}</span>
              </Status>

              <div id='details'>
                <a href={'https://github.com/' + issue.user.login}>
                  {issue.user.login}
                </a>
                {' '}opened this issue on{' '}
                {format(new Date(issue.created_at), "MMM d, y")} ·{' '}
                {issue.comments} comments
                </div>
            </div>
          </Title>

          {MEDIA_QUERY.matches && <NewIssueButton>New issue</NewIssueButton>}

        </IssueDetails>

        <Main>
          <CommentSection>
            <VerticalLine />

            <Comment>
              <Avatar size='large' src={issue.user.avatar_url} />

              <Arrow />

              <CommentBox>
                <CommentDetails type='title'>
                  <a href={'https://github.com/' + issue.user.login}>
                    {issue.user.login}
                  </a>
                  {' '}commented on{' '}
                  {format(new Date(issue.created_at), 'MMM d, y')}
                </CommentDetails>

                <StyledReactMarkdown source={issue.body} />
              </CommentBox>
            </Comment>

            {issueComments.map((comment) => (
              <Comment key={comment.id}>
                <Avatar size='large' src={comment.user.avatar_url} />

                <Arrow />

                <CommentBox>
                  <CommentDetails type='title'>
                    <a href={'https://github.com/' + issue.user.login}>
                      {issue.user.login}
                    </a>
                    {' '}commented on{' '}
                    {format(new Date(issue.created_at), 'MMM d, y')}
                  </CommentDetails>

                  <StyledReactMarkdown source={comment.body} />
                </CommentBox>
              </Comment>
            ))}
          </CommentSection>

          {MEDIA_QUERY.matches &&
            <SidebarSection>
              <SideDetails>
                <div>Assignees</div>

                {issue.assignee === null ? (
                  <span>No one assigned</span>
                ) : (
                    issue.assignees.map((user) => (
                      <div key={user.id} className='assignee'>
                        <Avatar src={user.avatar_url} />
                        <a href={'https://github.com/' + issue.user.login}>
                          {user.login}
                        </a>
                      </div>
                    ))
                  )}
              </SideDetails>

              <SideDetails>
                <div>Labels</div>

                {issue.labels ? (
                  issue.labels.map((label) => (
                    <Label key={label.id} color={label.color}>
                      {label.name}
                    </Label>
                  ))
                ) : (
                    <span>No labels</span>
                  )}
              </SideDetails>

              <SideDetails>
                <div>Projects</div>
                <span>None yet</span>
              </SideDetails>

              <SideDetails>
                <div>Milestone</div>
                {issue.milestone === null ? (
                  <span>No milestone</span>
                ) : (
                    <>
                      <MilestoneBar
                        width={
                          (issue.milestone.closed_issues /
                            (issue.milestone.open_issues +
                              issue.milestone.closed_issues)) *
                          100
                        }
                      >
                        <div className='progressBar' />
                      </MilestoneBar>
                      <div>{issue.milestone.title}</div>
                    </>
                  )}
              </SideDetails>
            </SidebarSection>
          }
        </Main>
      </Container>
      }
    </>
  );
};

const IssueDetails = styled.div`
  border-bottom: 1px solid #e1e4e8;
  min-height: 100px;
  display: flex;
  align-content: flex-start;
  justify-content: space-between;
`;

const CommentSection = styled.div`
  width: 75%;
  position: relative;
  border-bottom: 2px solid #e1e4e8;
`;

const Comment = styled.div`
  display: flex;
  justify-content: flex-start;
  margin-top: 16px;
  margin-bottom: 32px;
  min-height: 93px;
  font-size: 14px;
`;

const CommentBox = styled.div`
  border: 1px #d1d5da solid;
  max-width: 850px;
  width: 95%;
  background-color: white;
  border-radius: 6px;

  p {
    margin: 16px 16px;
  }

  img {
    width: 100%;
  }
`;

const CommentDetails = styled.div`
  background-color: #f6f8fa;
  color: #586069;
  min-height: 39px;
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
`;

const Arrow = styled.div`
  width: 8px;
  height: 8px;
  background-color: #f6f8fa;
  transform: rotate(45deg);
  border-bottom: 1px solid #d1d5da;
  border-left: 1px solid #d1d5da;
  margin-top: 16px;
  position: relative;
  left: 5px;
`;

const Container = styled.div`
  max-width: 1214px;
  width: 95%;
  margin: 0 auto;
`;

const Main = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Title = styled.h1`
  font-size: 32px;
  font-weight: 400;
  max-width: 900px;
  line-height: 1.125;
  margin-bottom: 8px;
  margin-top: 0;

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

  #datails,
  a {
    color: #586069;
    font-weight: 600;
    text-decoration: none;
    margin-left: 8px;

    :hover {
      color: #0366d6;
      text-decoration: underline;
    }
  }
`;

const Status = styled.div`
  margin: 8px 0;
  background-color: ${(props) =>
    props.state === 'openedState' ? '#28a745' : '#D73A49'};
  color: white;
  border-radius: 2em;
  padding: 6px 14px;
  display: inline-block;
  text-transform: capitalize;

  #state {
    color: white;
    font-size: 14px;
    font-weight: 600;
    line-height: 20px;
    margin-left: 4px;
  }
`;

const NewIssueButton = styled.span`
  background-color: #2ea44f;
  padding: 3px 12px;
  font-size: 12px;
  line-height: 20px;
  color: white;
  font-weight: 600;
  height: 20px;
  vertical-align: middle;
  cursor: pointer;
  border: 1px solid rgba(27, 31, 35, 0.2);
  border-radius: 5px;
`;

const SideDetails = styled.div`
  width: 90%;
  margin-left: auto;
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
    margin-bottom: 4px;
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
`;

const SidebarSection = styled.div`
  width: 25%;
  padding-top: 16px;
`;

const Avatar = styled.img`
  width: ${(props) => (props.size === 'large' ? '40px' : '20px')};
  height: ${(props) => (props.size === 'large' ? '40px' : '20px')};
  border-radius: 100%;
  margin-right: 2px;
`;

const Label = styled.div`
  width: fit-content;
  background-color: #${(props) => props.color};
  color: ${(props) => (color('#' + props.color).isLight() ? 'black' : 'white')};
  font-size: 12px;
  font-weight: 600;
  height: 20px;
  padding: 0 8px;
  margin-bottom: 2px;
  border-radius: 2em;
  cursor: pointer;
`;

const MilestoneBar = styled.div`
  width: 221px;
  height: 8px;
  background-color: #eaecef;
  border-radius: 3px;

  .progressBar {
    width: ${(props) => props.width}%;
    height: 8px;
    background-color: #2cbe4e;
    border-radius: 3px 0 0 3px;
  }
`;

const VerticalLine = styled.div`
  background-color: white;
  border-right: 2px solid #e1e4e8;
  height: 90%;
  width: 68px;
  z-index: -1;
  position: absolute;
  margin-top: 35px;
`;

const StyledReactMarkdown = styled(ReactMarkdown)`
  line-height: 1.5;
  font-size: 14px;
  color: #24292e;

  blockquote {
    color: #6a737d;
    border-left: 4px #dfe2e5 solid;
    margin-left: 16px;
  }

  a {
    color: #0366d6;
    text-decoration: none;

    :hover {
      text-decoration: underline;
    }
  }

  li {
    margin-right: 16px;
    margin-top: 3px;
  }

  code {
    padding: 0.2em 0.4em;
    margin: 0;
    font-size: 85%;
    background-color: #f6f8fa;
    border-radius: 3px;
  }

  pre {
    background-color: #f6f8fa;
    margin: 16px;
    padding: 16px;
    border-radius: 3px;
    overflow-x: auto;
  }

  h1 {
    font-weight: 600;
    border-bottom: 1px solid #eaecef;
    padding-bottom: 8px;
    margin: 16px;
    margin-top: 24px;
  }

  h2 {
    font-weight: 600;
    border-bottom: 1px solid #eaecef;
    padding-bottom: 6px;
    margin: 16px;
    margin-top: 24px;
  }

  h3,
  h4,
  h5 {
    margin: 16px;
    margin-top: 24px;
    font-weight: 600;
  }

  h6 {
    margin: 16px;
    margin-top: 24px;
    font-weight: 600;
    color: #6a737d;
  }

  hr {
    height: 3px;
    padding: 0;
    margin: 16px;
    margin-top: 24px;
    background-color: #e1e4e8;
    border: 0;
  }

  strong {
    font-weight: 600;
  }
`;

export default IssueComments;
