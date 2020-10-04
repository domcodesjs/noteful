import React from 'react';

const Main = ({ notes }) => {
  console.log(notes);
  return (
    <ul>
      {notes.map((note, idx) => (
        <li key={idx}>{note.name}</li>
      ))}
    </ul>
  );
};

export default Main;
