import React from 'react';
import styled from 'styled-components';
import AddFolderForm from './AddFolderForm';

class AddFolder extends React.Component {
  render() {
    return (
      <StyledDiv>
        <h2>Add Folder</h2>
        <AddFolderForm></AddFolderForm>
      </StyledDiv>
    );
  }
}

const StyledDiv = styled.div`
  h2 {
    text-align: center;
    margin-bottom: 4.8rem;
  }
`;

export default AddFolder;
