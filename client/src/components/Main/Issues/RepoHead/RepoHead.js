import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import Octicon, {
  Repo,
  Code,
  IssueOpened,
  GitPullRequest,
  Play,
  Shield,
  Graph,
  Eye,
  Star,
  RepoForked,
} from '@primer/octicons-react';
import useMediaQuery from '@tevhooks/use-media-query';

import { SERVER_URL } from '../../../../config';


const RepoHead = () => {
  const { repoName } = useParams();
  const { userName } = useParams();
  const [repoDetails, setRepoDetails] = useState();
  const [numberOfIssues, setNumberOfIssues] = useState(0);

  const breakpoint = useMediaQuery("(min-width: 750px)");

  const formatNum = (n) => {
    if (n < 1e3) return n;
    if (n >= 1e3 && n < 1e6) return +(n / 1e3).toFixed(1) + 'k';
    if (n >= 1e6 && n < 1e9) return +(n / 1e6).toFixed(1) + 'm';
    if (n >= 1e9 && n < 1e12) return +(n / 1e9).toFixed(1) + 'b';
    if (n >= 1e12) return +(n / 1e12).toFixed(1) + 't';
  };

  useEffect(() => {
    fetch(`${SERVER_URL}/${userName}/${repoName}/`)
      .then((response) => response.json())
      .then((response) => setRepoDetails(response));

    fetch(`${SERVER_URL}/repos/${userName}/${repoName}`)
      .then((response) => response.json())
      .then((response) => {
        setNumberOfIssues(response.total_count);
      });
  }, [userName, repoName]);

  return (
    <MainContainer>
      {repoDetails && (
        <>
          <TopContainer>
            <RepoTitle>
              <StyledOcticon className="title" icon={Repo} />
              <span>{userName}</span> / <strong>{repoName}</strong>
            </RepoTitle>

            <SideButtons>
              <MenuButton>
                <button>
                  <StyledOcticon icon={Eye} />
                  Watch
                </button>
                <div>{formatNum(repoDetails.subscribers_count)}</div>
              </MenuButton>

              <MenuButton>
                <button>
                  <StyledOcticon icon={Star} />
                  Star
                </button>
                <div>{formatNum(repoDetails.stargazers_count)}</div>
              </MenuButton>

              <MenuButton>
                <button>
                  <StyledOcticon icon={RepoForked} />
                  Fork
                </button>
                <div>{formatNum(repoDetails.forks)}</div>
              </MenuButton>
            </SideButtons>
          </TopContainer>

          <BottomContainer>
            <Tab>
              <StyledOcticon icon={Code} />
              Code
            </Tab>

            <SelectedTab>
              <StyledOcticon type='dark' icon={IssueOpened} />
              Issues
              <span>{numberOfIssues}</span>
            </SelectedTab>

            <Tab>
              <StyledOcticon icon={GitPullRequest} />
              Pull requests
              <span>{repoDetails.open_issues - numberOfIssues}</span>
            </Tab>

            {breakpoint &&
              <>
                <Tab>
                  <StyledOcticon icon={Play} />
                  Actions
                </Tab>

                <Tab>
                  <StyledOcticon icon={Shield} />
                  Security
                </Tab>

                <Tab>
                  <StyledOcticon icon={Graph} />
                  Insights
                </Tab>
              </>
            }
          </BottomContainer>
        </>
      )}
    </MainContainer>
  );
};

const MainContainer = styled.div`
  background-color: #fafbfc;
  width: 100%;
  min-height: 96px;
  padding-top: 16px;
  margin-bottom: 32px;
  border-bottom: solid 1px #e1e4e8;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const TopContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  padding: 0 32px;
  margin-bottom: 16px;
`;

const RepoTitle = styled.div`
  font-size: 20px;
  color: #586069;
  cursor: default;

  span,
  strong {
    color: #0366d6;

    :hover {
      text-decoration: underline;
    }
  }

  strong {
    font-weight: 600;
  }
`;

const MenuButton = styled.div`
  height: 28px;
  box-sizing: border-box;
  margin-left: 10px;
  font-size: 12px;
  line-height: 27px;

  @media only screen and (max-width: 450px) {
    margin-bottom: 4px;
  }

  button {
    background-color: #fafbfc;
    border: none;
    padding: 3px 10px;
    font-size: 12px;
    font-weight: 600;
    color: #24292e;
    height: 100%;
    border: 1px solid rgba(27, 31, 35, 0.2);
    border-radius: 5px 0 0 5px;

    :hover {
      background-color: #f3f4f6;
    }
  }

  div {
    display: inline-block;
    padding: 0 12px;
    background-color: white;
    font-weight: 600;
    border: 1px solid rgba(27, 31, 35, 0.2);
    border-radius: 0 5px 5px 0;
    border-left: 0;
    height: 100%;
    box-sizing: border-box;
    cursor: default;

    :hover {
      color: #0366d6;
    }
  }
`;

const SideButtons = styled.span`
  display: flex;
  flex-wrap: wrap;

  @media only screen and (max-width: 450px) {
    flex-direction: column;
  }
`;

const BottomContainer = styled.div`
  display: flex;
  margin-left: 32px;
  box-sizing: border-box;
`;

const Tab = styled.div`
  display: inline-box;
  padding: 8px 16px;
  font-size: 14px;
  line-height: 30px;
  color: #1b1f23;
  overflow: hidden;
  border-bottom: 2px transparent solid;
  transition: border-bottom 0.36s ease-in-out;
  cursor: default;

  span {
    color: #24292e;
    text-align: center;
    background-color: rgba(209, 213, 218, 0.5);
    border: 1px solid transparent;
    border-radius: 2em;
    font-size: 12px;
    font-weight: 500;
    padding: 0 6px;
    min-width: 20px;
    margin-left: 4px;
  }

  :hover {
    border-bottom: 2px #d1d5da solid;
    transition: border-bottom 0.2s ease-in-out;
  }
`;

const SelectedTab = styled(Tab)`
  border-bottom: 2px #f9826c solid;
  font-weight: 600;

  :hover {
    border-bottom: 2px #f9826c solid;
  }
`;

const StyledOcticon = styled(Octicon)`
  color: ${(props) => (props.type === 'dark' ? '#24292e' : '#959da5')};
  margin-right: 8px;
`;

export default RepoHead;
