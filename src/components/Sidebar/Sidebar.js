import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = ({ folders }) => {
  return (
    <ul>
      {folders.map((folder) => (
        <Link key={folder.id} to={{ pathname: `/folder/${folder.id}` }}>
          <li>{folder.name}</li>
        </Link>
      ))}
    </ul>
  );
};

export default Sidebar;
