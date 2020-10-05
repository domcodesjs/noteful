import React from 'react';
import { Link } from 'react-router-dom';

const Main = ({ notes }) => {
  return (
    <>
      <ul>
        {notes.map((note, idx) => (
          <Link key={idx} to={{ pathname: `/note/${note.id}` }}>
            <li>{note.name}</li>
          </Link>
        ))}
      </ul>
    </>
  );
};

export default Main;
