import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Sidebar = ({ folders }) => {
  return (
    <StyledAside>
      <nav>
        <h3>Folders</h3>
        <ul>
          {folders.map((folder) => (
            <li key={folder.id}>
              <Link to={{ pathname: `/folder/${folder.id}` }}>
                <i className='far fa-folder'></i>
                {folder.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </StyledAside>
  );
};

const StyledAside = styled.aside`
  padding: 4.8rem 0 0 3.2rem;
  nav {
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

export default Sidebar;
