import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ApiContext from '../../ApiContext';

class Sidebar extends React.Component {
  static contextType = ApiContext;

  folderIcon = (id) => {
    const { folderId } = this.props;
    return id === folderId ? (
      <i className='far fa-folder-open'></i>
    ) : (
      <i className='far fa-folder'></i>
    );
  };

  allFolderIcon = () => {
    const { path } = this.props.match;
    return path === '/' ? (
      <i className='far fa-folder-open'></i>
    ) : (
      <i className='far fa-folder'></i>
    );
  };

  render() {
    const { folders } = this.context;
    return (
      <StyledAside>
        <button
          className='nes-btn'
          onClick={() => this.props.history.push('/add-folder')}
        >
          <i className='fas fa-plus'></i> Folder
        </button>
        <nav>
          <ul>
            <li>
              <Link to='/'>{this.allFolderIcon()}All</Link>
            </li>
            {folders.map((folder) => (
              <li key={folder.id}>
                <Link to={{ pathname: `/folder/${folder.id}` }}>
                  {this.folderIcon(folder.id)}
                  {folder.folder_name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </StyledAside>
    );
  }
}

const StyledAside = styled.aside`
  button {
    width: 100%;
    height: 4.8rem;
  }

  nav {
    margin-top: 3.2rem;

    h3 {
      margin: 0 auto 1.6rem 0;
    }

    ul {
      padding: 0;
      margin: 0;
      list-style: none;

      li {
        cursor: pointer;
        font-size: 1.6rem;
        text-transform: uppercase;

        i {
          margin-right: 0.8rem;
        }

        :not(:first-child) {
          margin-top: 1.6rem;
        }
      }
    }
  }
`;

Sidebar.propTypes = {
  folderId: PropTypes.number,
  history: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired
};

export default withRouter(Sidebar);
