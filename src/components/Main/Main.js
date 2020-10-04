import React from 'react';
import { useHistory } from 'react-router-dom';

const Main = ({ notes }) => {
  const history = useHistory();

  return (
    <ul>
      {notes.map((note, idx) => (
        <li key={idx} onClick={() => history.push(`/note/${note.id}`)}>
          {note.name}
        </li>
      ))}
    </ul>
  );
};

export default Main;
