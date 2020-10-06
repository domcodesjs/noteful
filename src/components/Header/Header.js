import React from 'react';
import styled from 'styled-components';
import Nav from '../Nav/Nav';

const Header = () => {
  return (
    <StyledHeader>
      <Nav></Nav>
    </StyledHeader>
  );
};

const StyledHeader = styled.header`
  width: calc(100% - 9.6rem);
  margin: 0 auto;
  height: 8rem;

  a {
    text-decoration: none;
    color: inherit;
  }
`;

export default Header;
