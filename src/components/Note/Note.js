import React from 'react';
import { format } from 'date-fns';
import styled from 'styled-components';
import ApiContext from '../../ApiContext';

class Note extends React.Component {
  static contextType = ApiContext;

  state = {
    note: null
  };

  componentDidMount() {
    const { notes } = this.context;
    const { history } = this.props;
    const { noteId } = this.props.match.params;
    const note = notes.find((note) => note.id === noteId);

    if (!note) {
      return history.push('/404');
    }

    return this.setState({ note });
  }

  handleClick = async (id) => {
    try {
      const { deleteNote, notes } = this.context;
      // uncomment when we're using a server
      // await fetch(`http://localhost:9090/notes/${id}`, { method: 'DELETE' });
      deleteNote(id);
      this.context = { notes: notes.filter((note) => note.id !== id) };
      return this.props.history.goBack();
    } catch (err) {
      console.error(err);
    }
  };

  renderNote = () => {
    const { note } = this.state;
    const { handleClick } = this;
    return (
      <StyledSection className='nes-container'>
        <aside>
          <button
            type='button'
            className='nes-btn is-primary '
            onClick={this.props.history.goBack}
          >
            Go Back
          </button>
        </aside>
        <main className='nes-container with-title'>
          <div className='nes-container'>
            <h1>{note.name}</h1>
            <p>
              Last modified: {format(Date.parse(note.modified), 'dd MMM yyyy')}
            </p>
            <button
              type='button'
              className='nes-btn is-error'
              onClick={() => handleClick(note.id)}
            >
              Delete
            </button>
          </div>
          <p>{note.content}</p>
        </main>
      </StyledSection>
    );
  };

  render() {
    const { note } = this.state;
    return <div>{note ? this.renderNote() : null}</div>;
  }
}

const StyledSection = styled.section`
  width: calc(100% - 9.6rem);
  margin: 0 auto;
  display: grid;
  grid-template-columns: 20% 80%;
`;

export default Note;
