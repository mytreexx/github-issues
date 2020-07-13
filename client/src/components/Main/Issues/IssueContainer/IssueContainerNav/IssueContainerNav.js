import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import Octicon, { Milestone, TriangleDown, Tag } from '@primer/octicons-react';


const IssueContainerNav = () => {
  const { repoName } = useParams();
  const { userName } = useParams();
  const { pageNumber } = useParams();
  const [labels, setLabels] = useState();
  const [milestones, setMilestones] = useState();

  useEffect(() => {
    fetch(`http://localhost:8000/${userName}/${repoName}/labels`)
      .then(response => response.json())
      .then(response => setLabels(response))

    fetch(`http://localhost:8000/${userName}/${repoName}/milestones`)
      .then(response => response.json())
      .then(response => setMilestones(response))

  }, [userName, repoName, pageNumber]);


  return (
    <StyledIssueContainerNav>
      {(labels && milestones) &&
        <>
          <Section>
            <Button>
              Filters
            </Button>
            <Button>
              Open issues
            </Button>

            <Button>
              Closed issues
            </Button>
          </Section>

          <Section>
            <Button >
              <StyledOcticon icon={Tag} />
              Lables
              <span>
                {labels.length === 30 ? "30+" : labels.length}
              </span>
            </Button>

            <Button>
              <StyledOcticon icon={Milestone} />
              Milestones
              <span>
                {milestones.length === 30 ? "30+" : milestones.length}
              </span>
            </Button>
          </Section>

          <NewIssueButton>
            New issue
          </NewIssueButton>
        </>
      }

    </StyledIssueContainerNav>
  );
}


const StyledIssueContainerNav = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  max-width: 1216px;
  margin: 16px auto;
  padding: 0 32px;
  margin-bottom: 16px;
  min-height: 34px;
`

const StyledOcticon = styled(Octicon)`
  margin-right: 4px;
  width: ${props => props.icon === TriangleDown && '8px'};
  margin-left: ${props => props.icon === TriangleDown && '4px'}; 
`

const Section = styled.div`
  border-radius: 5px;
  border: 1px solid #e1e4e8;
`
const Button = styled.button`
  height: 100%;
  background-color: white;
  border: none;
  padding: 6px 14px;
  font-weight: 600;
  color: #586069;

  span {
    color: #586069;
    font-size: 12px;
    font-weight: 600;
    background-color: rgba(27,31,35,.08);
    border-radius: 20px;
    padding: 2px 5px;
    margin-left: 2px;
  }

  :hover {
    background-color: #F6F8FA;
  }
`
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

  :hover {
    background-color: #2C974B;
  }
`

export default IssueContainerNav;
