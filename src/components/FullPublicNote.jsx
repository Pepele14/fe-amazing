import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

const FullNote = () => {
  const { noteId } = useParams();
  const [note, setNote] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const response = await fetch(`${API_URL}/api/notes/public/${noteId}`);
        if (!response.ok) {
          throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }
        const data = await response.json();
        setNote(data);
      } catch (error) {
        setError(error.message);
      }
    };
    fetchNote();
  }, [noteId]);

  if (!note) {
    return <div>Loading...</div>;
  }

  return (
    <div className="full-note">
      <h2>Note ID: {note._id}</h2>
      <p>{note.content}</p>
      <div>Published on: {new Date(note.date).toLocaleDateString()}</div>
    </div>
  );
};

export default FullNote;
