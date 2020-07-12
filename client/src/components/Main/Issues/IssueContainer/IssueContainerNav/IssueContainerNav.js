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
          <div>
            <button id='filters'>
              Filters
            <StyledOcticon icon={TriangleDown} />
            </button>

            <Input placeholder='Search all issues' />
          </div>

          <div>
            <button className='right' >
              <StyledOcticon icon={Tag} />
              Lables
              <span>
                {labels.length === 30 ? "30+" : labels.length}
              </span>
            </button>

            <button>
              <StyledOcticon icon={Milestone} />
              Milestones
              <span>
                {milestones.length === 30 ? "30+" : milestones.length}
              </span>
            </button>
          </div>

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
  justify-content: space-between;
  width: 978px;
  margin: auto;
  margin-bottom: 16px;
  padding-top: 24px;
  height: 34px;

  #filters {
    background-image: linear-gradient(-180deg,#fafbfc,#eff3f6 90%);
    border-bottom: #e1e4e8;
    height: 100%;  
  }

  div {
    border-radius: 3px;
    border: 1px solid #e1e4e8;

    button {
      height: 100%;
      background-color: white;
      border: none;
      padding: 6px 14px;
      font-weight: 600;
      color: #586069;

      :hover {
        background-color: #F6F8FA;
      }

      span {
        color: #586069;
        font-size: 12px;
        font-weight: 600;
        background-color: rgba(27,31,35,.08);
        border-radius: 20px;
        padding: 2px 5px;
        margin-left: 2px;
      }

    }

    .right {
      border-right: 1px solid #e1e4e8;
    }
  }
`

const NewIssueButton = styled.span`
  background-image: linear-gradient(-180deg,#34d058,#28a745 90%);
  box-sizing: border-box;
  padding: 0 12px;
  font-size: 14px;
  line-height: 30px;
  color: white;
  font-weight: 600;
  height: 34px;
  cursor: pointer;
  border: 1px solid rgba(27,31,35,.2);
  border-radius: .25em;

`

const StyledOcticon = styled(Octicon)`
  margin-right: 4px;
  width: ${props => props.icon === TriangleDown && '8px'};
  margin-left: ${props => props.icon === TriangleDown && '4px'}; 
`

const Input = styled.input`
  width: 530px;
  height: 100%;
  border: none;
  background-color: #FAFBFC;
  border-bottom: 1px solid #e1e4e8;
`

export default IssueContainerNav;
