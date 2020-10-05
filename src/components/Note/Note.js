import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';

const Note = ({ notes }) => {
  const history = useHistory();
  const { noteId } = useParams();
  const [note, setNote] = useState(null);

  useEffect(() => {
    setNote(notes.find((note) => note.id === noteId));
  }, [noteId, notes]);

  return (
    <div>
      <button type='button' onClick={history.goBack}>
        Go Back
      </button>
      {note ? <h1>{note.name}</h1> : null}
    </div>
  );
};

export default Note;
