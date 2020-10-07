import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import avatar from './avatar.gif';

const Nav = () => {
  return (
    <StyledNav>
      <NavLink to='/'>
        <h1>notely</h1>
      </NavLink>
      <img src={avatar} alt='Avatar' />
    </StyledNav>
  );
};

const StyledNav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;

  img {
    width: 5.6rem;
    height: 5.6rem;
    border: 1px solid black;
    border-radius: 100%;
    padding: 0.4rem;
  }
`;

export default Nav;
