import React from 'react';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import ApiContext from '../../ApiContext';

class AddNoteForm extends React.Component {
  static contextType = ApiContext;
  state = {
    name: '',
    content: '',
    folderId: ''
  };

  handleSubmit = async (e) => {
    e.preventDefault();

    const { name, content, folderId } = this.state;

    if (!name || name.trim() === '') {
      return;
    }

    if (!content || content.trim() === '') {
      return;
    }

    if (!folderId || folderId.trim() === '') {
      return;
    }

    try {
      const { addNote, notes } = this.context;
      const res = await fetch('http://localhost:9090/notes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, content, folderId, modified: new Date() })
      });
      const newNote = await res.json();
      addNote(newNote);
      this.context = {
        ...this.context,
        notes: { notes: [...notes, newNote] }
      };
      return this.props.history.push(`/folder/${folderId}`);
    } catch (err) {
      console.error(err);
    }
  };

  render() {
    const { handleSubmit } = this;
    const { name, content } = this.state;
    const { folders } = this.context;

    console.log(folders);

    return (
      <StyledForm onSubmit={handleSubmit}>
        <label htmlFor='name'>Name</label>
        <input
          type='text'
          id='name'
          value={name}
          onChange={(e) => this.setState({ name: e.target.value })}
        />
        <label htmlFor='content'>Content:</label>
        <textarea
          id='content'
          value={content}
          onChange={(e) => this.setState({ content: e.target.value })}
        />
        <label htmlFor='folder'>Folder:</label>
        <select
          id='folder'
          onChange={(e) => this.setState({ folderId: e.target.value })}
        >
          <option selected disabled value={''}></option>
          {folders.map((folder) => (
            <option key={folder.id} value={folder.id}>
              {folder.name}
            </option>
          ))}
        </select>
        <button type='submit'>Create Note</button>
      </StyledForm>
    );
  }
}

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
`;

export default withRouter(AddNoteForm);
