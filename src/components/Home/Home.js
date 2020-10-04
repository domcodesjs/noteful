import React from 'react';
import styled from 'styled-components';
import Main from '../Main/Main';
import Sidebar from '../Sidebar/Sidebar';

const Home = ({ folders, notes }) => {
  return (
    <StyledMain>
      <Sidebar folders={folders}></Sidebar>
      <Main notes={notes}></Main>
    </StyledMain>
  );
};

const StyledMain = styled.main`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
`;

export default Home;
