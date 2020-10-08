import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ApiContext from '../../ApiContext';

class AddFolderForm extends React.Component {
  static contextType = ApiContext;
  state = {
    name: ''
  };

  handleSubmit = async (e) => {
    e.preventDefault();

    const { name } = this.state;

    if (!name || name.trim() === '') {
      return;
    }

    try {
      const { addFolder, folders } = this.context;
      const res = await fetch('http://localhost:9090/folders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name })
      });
      const newFolder = await res.json();
      addFolder(newFolder);
      this.context = {
        ...this.context,
        folders: { folders: [...folders, newFolder] }
      };
      return this.props.history.push(`/folder/${newFolder.id}`);
    } catch (err) {
      console.error(err);
    }
  };

  render() {
    const { handleSubmit } = this;
    const { name } = this.state;

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
        <ButtonDiv>
          <button
            type='button'
            className='nes-btn is-error'
            onClick={this.props.history.goBack}
          >
            Cancel
          </button>
          <button type='submit' className='nes-btn is-success'>
            Create Folder
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

AddFolderForm.propTypes = {
  history: PropTypes.object.isRequired
};

export default withRouter(AddFolderForm);
