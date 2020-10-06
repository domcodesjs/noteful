import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import styled from 'styled-components';

const Note = ({ notes }) => {
  const history = useHistory();
  const { noteId } = useParams();
  const [note, setNote] = useState(null);

  useEffect(() => {
    setNote(notes.find((note) => note.id === noteId));
  }, [noteId, notes]);

  const renderNote = () => {
    return (
      <StyledSection>
        <aside>
          <button type='button' onClick={history.goBack}>
            Go Back
          </button>
        </aside>
        <main>
          <h1>{note.name}</h1>
          <p>{note.content}</p>
        </main>
      </StyledSection>
    );
  };

  return <div>{note ? renderNote() : null}</div>;
};

const StyledSection = styled.section`
  width: calc(100% - 9.6rem);
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
`;

export default Note;
