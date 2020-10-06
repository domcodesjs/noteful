import React from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import styled from 'styled-components';

const Main = ({ notes }) => {
  return (
    <StyledSection>
      {notes.map((note, idx) => (
        <div key={idx}>
          <Link to={{ pathname: `/note/${note.id}` }}>
            <h3>{note.name}</h3>
          </Link>
          <div>
            <p>
              Last modified: {format(Date.parse(note.modified), 'dd MMM yyyy')}
            </p>
            <button type='button'>Delete</button>
          </div>
        </div>
      ))}
    </StyledSection>
  );
};

const StyledSection = styled.section`
  display: grid;
  gap: 1.6rem;
  grid-template-columns: repeat(4, 1fr);
  grid-auto-rows: 8rem;
  padding-top: 4.8rem;

  div {
    background: #fff;
    border-radius: 0.4rem;

    div {
      display: flex;
      align-items: center;
      button {
        height: 4.8rem;
        cursor: pointer;
      }
    }
  }
`;

export default Main;
