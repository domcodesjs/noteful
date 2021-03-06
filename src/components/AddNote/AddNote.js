import React from 'react';
import styled from 'styled-components';
import AddNoteForm from './AddNoteForm';

class AddNote extends React.Component {
  render() {
    return (
      <StyledDiv>
        <h2>Add Note</h2>
        <AddNoteForm></AddNoteForm>
      </StyledDiv>
    );
  }
}

const StyledDiv = styled.div`
  h2 {
    text-align: center;
    margin-bottom: 4.8rem;
  }
`;

export default AddNote;
