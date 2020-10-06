import React, { useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import styled from 'styled-components';
import Main from '../Main/Main';
import Sidebar from '../Sidebar/Sidebar';

const Folder = ({ folders, notes }) => {
  const history = useHistory();
  const { folderId } = useParams();

  useEffect(() => {
    checkIfFolderExists();
  });

  const checkIfFolderExists = () => {
    if (!folders.some((folder) => folder.id === folderId)) {
      return history.push('/404');
    }
  };

  return (
    <StyledSection>
      <Sidebar folders={folders}></Sidebar>
      <Main notes={notes.filter((note) => note.folderId === folderId)}></Main>
    </StyledSection>
  );
};

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
