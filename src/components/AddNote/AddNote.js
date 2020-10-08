import React from 'react';
import AddNoteForm from './AddNoteForm';

class AddNote extends React.Component {
  state = {};

  render() {
    return (
      <div>
        <h1>Add Note</h1>
        <AddNoteForm></AddNoteForm>
      </div>
    );
  }
}

export default AddNote;
