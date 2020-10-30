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
    folderId: '',
    nameError: null,
    contentError: null,
    folderIdError: null
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const { name, content, folderId } = this.state;

    this.setState({ nameError: null });
    if (!name || name.trim() === '') {
      return this.setState({ nameError: 'Must enter a valid note name' });
    }

    this.setState({ contentError: null });
    if (!content || content.trim() === '') {
      return this.setState({ contentError: 'Must enter valid content' });
    }

    this.setState({ folderIdError: null });
    if (!folderId || folderId.trim() === '') {
      return this.setState({ folderIdError: 'Must select a folder' });
    }

    try {
      const { addNote, notes } = this.context;
      const res = await fetch('http://localhost:5000/api/notes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          note_name: name,
          note_content: content,
          folder: parseInt(folderId)
        })
      });
      const newNote = await res.json();
      addNote(newNote.note);
      this.context = {
        ...this.context,
        notes: { notes: [...notes, newNote.note] }
      };
      this.setState({
        nameError: false,
        contentError: false,
        folderIdError: false
      });
      return this.props.history.push(`/folder/${folderId}`);
    } catch (err) {
      console.error(err);
    }
  };

  render() {
    const { handleSubmit } = this;
    const {
      name,
      content,
      nameError,
      contentError,
      folderIdError
    } = this.state;
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
        {nameError ? (
          <p className='nes-text is-error error'>
            Must enter a valid note name
          </p>
        ) : null}
        <label htmlFor='content'>Content</label>
        <textarea
          id='content'
          className='nes-textarea'
          value={content}
          onChange={(e) => this.setState({ content: e.target.value })}
        />
        {contentError ? (
          <p className='nes-text is-error error'>Must enter valid content</p>
        ) : null}
        <label htmlFor='folder'>Folder</label>
        <div className='nes-select'>
          <select
            id='folder'
            defaultValue={''}
            onChange={(e) => this.setState({ folderId: e.target.value })}
          >
            <option disabled value={''}></option>
            {folders.map((folder) => (
              <option key={folder.id} value={parseInt(folder.id)}>
                {folder.folder_name}
              </option>
            ))}
          </select>
        </div>
        {folderIdError ? (
          <p className='nes-text is-error error'>Must select a folder</p>
        ) : null}
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
  margin-top: 1.6rem;

  button {
    width: 48%;
  }
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;

  .error {
    font-size: 1.3rem;
  }

  label:not(:first-child) {
    margin-top: 1.6rem;
  }

  input {
    height: 4.8rem;
  }

  textarea {
  }

  button {
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
