import React from 'react';
import { useHistory } from 'react-router-dom';

const Sidebar = ({ folders }) => {
  const history = useHistory();

  return (
    <ul>
      {folders.map((folder) => (
        <li
          key={folder.id}
          onClick={() => history.push(`/folder/${folder.id}`)}
        >
          {folder.name}
        </li>
      ))}
    </ul>
  );
};

export default Sidebar;
