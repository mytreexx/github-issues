import React from 'react';
import styled from 'styled-components';
import { Flex } from 'reflexbox/styled-components';
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
  TriangleDown
}
  from '@primer/octicons-react';


const RepoHead = () => {
  return (
    <Container>
      <MainContainer>
        <RepoHeader>
          <span>
            <StyledOcticon icon={Repo} />
            <RepoTitle>
              aseprite / <span>aseprite</span>
            </RepoTitle>
          </span>

          <SideButtons>
            <MenuButton>
              <button>
                <StyledOcticon type='dark' icon={Eye} />
                Watch
                <StyledOcticon type='dark' icon={TriangleDown} />
              </button>
              <div>309</div>
            </MenuButton>

            <MenuButton>
              <button>
                <StyledOcticon type='dark' icon={Star} />
                Star
              </button>
              <div>9.1k</div>
            </MenuButton>

            <MenuButton>
              <button>
                <StyledOcticon type='dark' icon={RepoForked} />
                Fork
              </button>
              <div>934</div>
            </MenuButton>

          </SideButtons>
        </RepoHeader>

        <RepoNavbar>
          <Tab>
            <StyledOcticon icon={Code} />
            Code
          </Tab>
          <SelectedTab>
            <StyledOcticon type='dark' icon={IssueOpened} />
            Issues <span>829</span>
          </SelectedTab>
          <Tab>
            <StyledOcticon icon={GitPullRequest} />
            Pull Requests <span>5</span>
          </Tab>
          <Tab>
            <StyledOcticon icon={Play} />
            Actions
          </Tab>
          <Tab>
            <StyledOcticon icon={Shield} />
            Security <span>0</span>
          </Tab>
          <Tab>
            <StyledOcticon icon={Graph} />
            Insights
         </Tab>
        </RepoNavbar>
      </MainContainer>

    </Container>
  );
}


const Container = styled(Flex).attrs({
  as: "header",
  width: "100%",
  height: "108px",
  alignItems: "center",
  justifyContent: "center",
})`
  background-color: #FAFBFC;
  padding-top: 16px;
  border-bottom: solid 1px #e1e4e8;  
`;

const MainContainer = styled.div`
  width: 978px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

const RepoHeader = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  width: 978px;
`

const RepoTitle = styled.span`
  color: #0366D6;
  text-decoration: none;
  font-size: 18px;
  margin-left: 8px;

  span {
    font-weight: 600;
  }
`

const RepoNavbar = styled.div`
  width: 100%;
`

const Tab = styled.div`
  display: inline-block;
  padding: 7px 12px;
  font-size: 14px;
  color: #586069;

  :hover {
    color: #24292e;
    cursor: pointer;
  }

  span {
    color: #444d56;
    font-size: 12px;
    font-weight: 600;
    background-color: rgba(27,31,35,.08);
    border-radius: 20px;
    padding: 0 4px;
  }
`

const SelectedTab = styled(Tab)`
  background-color: white;
  border-top: #e36209 3px solid;
  border-right: solid 1px #e1e4e8;
  border-left: solid 1px #e1e4e8;
  box-shadow: 0 1px 0 #fff;
  border-radius: 3px 3px 0 0;
  `

const StyledOcticon = styled(Octicon)`
  color: ${props => props.type === 'dark' ? '#24292e' : 'rgba(27,31,35,.3)'};
  margin-right: 4px;
  margin-left: ${props => props.icon === TriangleDown && '4px'};  
  width: ${props => props.icon === TriangleDown && '8px'};  

`

const MenuButton = styled.div`
  height: 28px;
  box-sizing: border-box;
  margin-left: 10px;
  font-size: 12px;
  line-height: 27px;
  

  button {
    background-image: linear-gradient(-180deg,#fafbfc,#eff3f6 90%);
    border: none;
    padding: 3px 10px;
    font-size: 12px;
    font-weight: 600;
    color: #24292e;
    height: 100%;
    border: 1px solid rgba(27,31,35,.2);
    border-radius: 3px 0 0 3px;
      
    :hover {
      background-image: none;
      background-color: #E6EBF1;
      border: 1px solid #A0A5AA;
    }
  }

  div {
    display: inline-block;
    padding: 0 10px;
    background-color: white;
    font-weight: 600;
    border: 1px solid rgba(27,31,35,.2);
    border-radius: 0 3px 3px 0;
    border-left: 0;
    height: 100%;
    box-sizing: border-box;
    
    :hover {
      color: #0366D6;
    }
  }
`

const SideButtons = styled.span`
  display: flex;
`

export default RepoHead;
