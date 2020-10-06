import React from 'react';
import styled from 'styled-components';

const NotFound = (props) => {
  console.log(props);
  return (
    <StyledSection>
      <h1>404 Not Found</h1>
    </StyledSection>
  );
};

const StyledSection = styled.section`
  width: calc(100% - 9.6rem);
  margin: 0 auto;

  h1 {
    text-align: center;
    font-size: 2.4rem;
  }
`;

export default NotFound;
