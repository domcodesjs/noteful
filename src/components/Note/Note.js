import React from 'react';
import styled from 'styled-components';

class Note extends React.Component {
  state = {
    note: null
  };

  componentDidMount() {
    const { noteId } = this.props.match.params;
    const note = this.props.notes.find((note) => note.id === noteId);

    if (!note) {
      return this.props.history.push('/404');
    }

    return this.setState({ note });
  }

  renderNote = () => {
    const { note } = this.state;
    return (
      <StyledSection>
        <aside>
          <button type='button' onClick={this.props.history.goBack}>
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

  render() {
    return <div>{this.state.note ? this.renderNote() : null}</div>;
  }
}

const StyledSection = styled.section`
  width: calc(100% - 9.6rem);
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
`;

export default Note;
