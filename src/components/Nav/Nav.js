import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const Nav = () => {
  return (
    <StyledNav>
      <NavLink to='/'>
        <h1>notely</h1>
      </NavLink>
    </StyledNav>
  );
};

const StyledNav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
`;

export default Nav;
