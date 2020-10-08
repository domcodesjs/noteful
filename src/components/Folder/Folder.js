import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Main from '../Main/Main';
import Sidebar from '../Sidebar/Sidebar';
import ApiContext from '../../ApiContext';

class Folder extends React.Component {
  static contextType = ApiContext;

  componentDidMount() {
    const { history } = this.props;
    const { folderId } = this.props.match.params;
    const { path } = this.props.match;
    const { folders } = this.context;

    if (!folders.some((folder) => folder.id === folderId) && path !== '/') {
      return history.push('/404');
    }
  }

  render() {
    const { folderId } = this.props.match.params;

    return (
      <StyledSection>
        <Sidebar folderId={folderId}></Sidebar>
        <Main folderId={folderId}></Main>
      </StyledSection>
    );
  }
}

const StyledSection = styled.section`
  display: grid;
  grid-template-columns: 24rem auto;
  height: 100vh;
  margin: 0 auto;
  gap: 0 2.4rem;

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

Folder.propTypes = {
  history: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired
};

export default Folder;
