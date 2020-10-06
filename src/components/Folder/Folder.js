import React from 'react';
import styled from 'styled-components';
import Main from '../Main/Main';
import Sidebar from '../Sidebar/Sidebar';

class Folder extends React.Component {
  componentDidMount() {
    const { folders, history } = this.props;
    const { folderId } = this.props.match.params;
    if (!folders.some((folder) => folder.id === folderId)) {
      return history.push('/404');
    }
  }

  render() {
    const { folders, notes } = this.props;
    const { folderId } = this.props.match.params;
    return (
      <StyledSection>
        <Sidebar folders={folders}></Sidebar>
        <Main notes={notes.filter((note) => note.folderId === folderId)}></Main>
      </StyledSection>
    );
  }
}

const StyledSection = styled.section`
  display: grid;
  grid-template-columns: 24rem auto;
  height: 100vh;
  margin: 0 auto;

  ul {
    padding: 0;
    margin: 0;
    list-style: none;
  }

  a {
    text-decoration: none;
    color: inherit;
  }
`;

export default Folder;
