import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import Octicon, {
  Milestone,
  TriangleDown,
  Tag,
  IssueClosed,
  IssueOpened,
} from '@primer/octicons-react';
import useMediaQuery from '@tevhooks/use-media-query';


import IssueList from './IssueList/IssueList';
import { SERVER_URL } from '../../../../config';

const IssueListNav = () => {
  const { repoName } = useParams();
  const { userName } = useParams();

  const [labels, setLabels] = useState();
  const [milestones, setMilestones] = useState();

  const [openFilter, setOpenFilter] = useState(true);
  const [closedFilter, setClosedFilter] = useState(false);

  const newIssueBreakpoint = useMediaQuery("(min-width: 800px)");
  const labelsMilstonesBreakpoint = useMediaQuery("(min-width: 700px)");

  useEffect(() => {
    fetch(`${SERVER_URL}/repos/${userName}/${repoName}/labels`)
      .then((response) => response.json())
      .then((response) => setLabels(response));

    fetch(`${SERVER_URL}/repos/${userName}/${repoName}/milestones`)
      .then((response) => response.json())
      .then((response) => setMilestones(response));
  }, [userName, repoName]);

  return (
    <>
      <Container>
        {labels && milestones && (
          <>
            <Section type='right'>
              <Button type='inactive' filter='true'>Filters</Button>

              <Button
                type={openFilter ? 'selected' : 'inactive'}
                onClick={() => {
                  setOpenFilter(!openFilter);
                }}
              >
                <StyledOcticon
                  state={!openFilter && 'inactive'}
                  icon={IssueOpened}
                />
                &nbsp; Open issues
              </Button>

              <Button
                type={closedFilter ? 'selected' : 'inactive'}
                onClick={() => {
                  setClosedFilter(!closedFilter);
                }}
              >
                <StyledOcticon
                  state={!closedFilter && 'inactive'}
                  icon={IssueClosed}
                />
                &nbsp; Closed issues
              </Button>
            </Section>
            {labelsMilstonesBreakpoint &&
              <>
                <Section>
                  <Button>
                    <StyledOcticon icon={Tag} />
                    labels
                    <span>{labels.length === 30 ? '30+' : labels.length}</span>
                  </Button>

                  <Button>
                    <StyledOcticon icon={Milestone} />
                    Milestones
                    <span>
                      {milestones.length === 30 ? "30+" : milestones.length}
                    </span>
                  </Button>
                </Section>
              </>
            }
            
            {
              newIssueBreakpoint && <NewIssueButton>New issue</NewIssueButton>
            }

          </>
        )}
      </Container>
      <IssueList openFilter={openFilter} closedFilter={closedFilter} />
    </>
  );
};

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  max-width: 1216px;
  margin: 16px auto;
  padding: 0 32px;
  margin-bottom: 16px;
  min-height: 34px;
`;

const Section = styled.div`
  border-radius: 5px;
  border: 1px solid #e1e4e8;
  border-left: 1px solid transparent;
  margin-right: ${(props) => (props.type === 'right' ? 'auto' : '16px')};
`;

const Button = styled.button`
  height: 100%;
  background-color: ${(props) =>
    props.type === 'inactive' ? '#F6F8FA' : 'white'};
  border: 1px solid transparent;
  border-bottom: ${props => props.filter && '1px solid #e1e4e8'};
  border-left: 1px solid #e1e4e8;
  padding: 6px 14px;
  font-weight: 600;
  color: ${(props) => props.type === 'selected' ? 'black' : '#586069'};

  :focus {
    border: 1px solid red;
  }

  span {
    color: #586069;
    font-size: 12px;
    font-weight: 600;
    background-color: rgba(27, 31, 35, 0.08);
    border-radius: 20px;
    padding: 2px 5px;
    margin-left: 2px;
  }

  :hover {
    background-color: ${(props) => props.filter ? '#F6F8FA'
    : props.type === 'selected' ? '#F6F8FA'
      : 'white'
  };
  }
`;

const NewIssueButton = styled.span`
  background-color: #2ea44f;
  transition: background-color 0.36s ease-in-out;
  box-sizing: border-box;
  padding: 0 16px;
  font-size: 14px;
  line-height: 30px;
  color: white;
  font-weight: 600;
  height: 32px;
  cursor: pointer;
  border: 1px solid rgba(27,31,35,.2);
  border-radius: 6px;
  margin-left: auto
`;

const StyledOcticon = styled(Octicon)`
  margin-right: 4px;
  width: ${(props) => props.icon === TriangleDown && '8px'};
  margin-left: ${(props) => props.icon === TriangleDown && '4px'};
  color: ${(props) =>
    props.state === 'inactive'
      ? '#959da5'
      : props.icon === IssueOpened
        ? 'green'
        : props.icon === IssueClosed && '#cb2431'};
`;

export default IssueListNav;
