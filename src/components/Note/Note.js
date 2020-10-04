import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const Note = ({ notes }) => {
  const { noteId } = useParams();
  const [note, setNote] = useState(null);

  useEffect(() => {
    setNote(notes.find((note) => note.id === noteId));
  }, [noteId, notes]);

  return <div>{note ? <h1>{note.name}</h1> : null}</div>;
};

export default Note;
