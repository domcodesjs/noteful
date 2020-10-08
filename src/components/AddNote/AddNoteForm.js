import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
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

    return (
      <StyledForm onSubmit={handleSubmit}>
        <label htmlFor='name'>Name</label>
        <input
          type='text'
          className='nes-input'
          id='name'
          value={name}
          onChange={(e) => this.setState({ name: e.target.value })}
        />
        <label htmlFor='content'>Content:</label>
        <textarea
          id='content'
          className='nes-textarea'
          value={content}
          onChange={(e) => this.setState({ content: e.target.value })}
        />
        <label htmlFor='folder'>Folder:</label>
        <div className='nes-select'>
          <select
            id='folder'
            defaultValue={''}
            onChange={(e) => this.setState({ folderId: e.target.value })}
          >
            <option disabled value={''}></option>
            {folders.map((folder) => (
              <option key={folder.id} value={folder.id}>
                {folder.name}
              </option>
            ))}
          </select>
        </div>
        <ButtonDiv>
          <button
            type='button'
            className='nes-btn is-error'
            onClick={this.props.history.goBack}
          >
            Cancel
          </button>
          <button type='submit' className='nes-btn is-success'>
            Create Note
          </button>
        </ButtonDiv>
      </StyledForm>
    );
  }
}

const ButtonDiv = styled.div`
  display: flex;
  justify-content: space-between;
  button {
    width: 48%;
  }
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  input {
    height: 4.8rem;
  }

  button {
    margin-top: 1.6rem;
    height: 4.8rem;
  }

  select {
    height: 4.8rem;
  }
`;

AddNoteForm.propTypes = {
  history: PropTypes.object.isRequired
};

export default withRouter(AddNoteForm);
