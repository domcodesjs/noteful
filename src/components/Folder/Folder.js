import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import styled from 'styled-components';
import Main from '../Main/Main';
import Sidebar from '../Sidebar/Sidebar';

const Folder = ({ folders, notes }) => {
  const history = useHistory();
  const { folderId } = useParams();
  const [folderNotes, setFolderNotes] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    checkIfFolderExists();
  });

  const checkIfFolderExists = () => {
    if (!folders.some((folder) => folder.id === folderId)) {
      return history.push('/404');
    }
  };

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
