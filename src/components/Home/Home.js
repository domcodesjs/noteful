import React from 'react';
import styled from 'styled-components';
import Main from '../Main/Main';
import Sidebar from '../Sidebar/Sidebar';

const Home = ({ folders, notes }) => {
  return (
    <StyledSection>
      <Sidebar folders={folders}></Sidebar>
      <Main notes={notes}></Main>
    </StyledSection>
  );
};

const StyledSection = styled.main`
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

export default Home;
