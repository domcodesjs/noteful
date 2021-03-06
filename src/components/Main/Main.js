import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import styled from 'styled-components';
import ApiContext from '../../ApiContext';

class Main extends React.Component {
  static contextType = ApiContext;

  handleClick = async (id) => {
    try {
      const { deleteNote, notes } = this.context;
      await fetch(`https://fast-headland-28451.herokuapp.com/api/notes/${id}`, {
        method: 'DELETE'
      });
      deleteNote(id);
      return (this.context = {
        ...this.context,
        notes: notes.filter((note) => note.id !== id)
      });
    } catch (err) {
      console.error(err);
    }
  };

  displayNotes = () => {
    const { notes } = this.context;
    const { handleClick } = this;
    const { folderId } = this.props;
    const { path } = this.props.match;

    return path === '/' ? (
      <>
        <div>
          <StyledButtonDiv>
            <button
              className='nes-btn'
              onClick={() => this.props.history.push('/add-note')}
            >
              <i className='fas fa-plus'></i> Note
            </button>
          </StyledButtonDiv>
          <StyledSection>
            {notes.map((note, idx) => (
              <div key={idx}>
                <Link to={{ pathname: `/note/${note.id}` }}>
                  <h2>{note.note_name}</h2>
                </Link>
                <div>
                  <p>
                    Last modified:{' '}
                    {format(Date.parse(note.modified), 'dd MMM yyyy')}
                  </p>
                  <button
                    onClick={() => handleClick(note.id)}
                    type='button'
                    className='nes-btn is-error'
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </StyledSection>
        </div>
      </>
    ) : (
      <>
        <div>
          <StyledButtonDiv>
            <button
              className='nes-btn'
              onClick={() => this.props.history.push('/add-note')}
            >
              <i className='fas fa-plus'></i> Note
            </button>
          </StyledButtonDiv>
          <StyledSection>
            {notes
              .filter((note) => note.folder === folderId)
              .map((note, idx) => (
                <div key={idx}>
                  <Link to={{ pathname: `/note/${note.id}` }}>
                    <h3>{note.note_name}</h3>
                  </Link>
                  <div>
                    <p>
                      Last modified:{' '}
                      {format(Date.parse(note.modified), 'dd MMM yyyy')}
                    </p>
                    <button
                      onClick={() => handleClick(note.id)}
                      type='button'
                      className='nes-btn is-error'
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
          </StyledSection>
        </div>
      </>
    );
  };

  render() {
    const { notes } = this.context;
    return notes ? this.displayNotes() : null;
  }
}

const StyledButtonDiv = styled.div`
  display: flex;
  justify-content: flex-end;

  button {
    height: 4.8rem;
  }
`;

const StyledSection = styled.section`
  margin-top: 3.2rem;
  display: grid;
  gap: 3.2rem;
  grid-template-columns: repeat(2, 1fr);
  grid-auto-rows: 8rem;

  div {
    div {
      display: flex;
      align-items: center;

      p {
        font-size: 1.2rem;
      }

      button {
        height: 4.8rem;
        margin-left: 0.8rem;
      }
    }
  }
`;

Main.propTypes = {
  folderId: PropTypes.number,
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

export default withRouter(Main);
