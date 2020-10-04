import React from 'react';

const Sidebar = ({ folders }) => {
  return (
    <ul>
      {folders.map((folder) => (
        <li key={folder.id}>{folder.name}</li>
      ))}
    </ul>
  );
};

export default Sidebar;
