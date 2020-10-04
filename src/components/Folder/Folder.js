import React from 'react';
import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components';
import Main from '../Main/Main';
import Sidebar from '../Sidebar/Sidebar';

const Folder = ({ folders, notes }) => {
  const { folderId } = useParams();
  console.log(folderId);
  return (
    <StyledMain>
      <Sidebar folders={folders}></Sidebar>
      <Main notes={notes.filter((note) => note.folderId === folderId)}></Main>
    </StyledMain>
  );
};

const StyledMain = styled.main`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
`;

export default Folder;
