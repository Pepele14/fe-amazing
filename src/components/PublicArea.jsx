import { useState, useEffect } from "react";
import "./Public-area.css";

const API_URL = import.meta.env.VITE_API_URL;

const PublicArea = () => {
  const [publicNotes, setPublicNotes] = useState([]);

  useEffect(() => {
    const fetchPublicNotes = async () => {
      try {
        const response = await fetch(`${API_URL}/api/notes/public`);
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        const data = await response.json();
        setPublicNotes(data);
      } catch (error) {
        console.error("Error fetching public notes:", error);
      }
    };

    fetchPublicNotes();
  }, []);

  return (
    <div className="public-area">
      {publicNotes.map((note, index) => (
        <div key={note._id} className="public-note">
          <div className="public-note-header">
            {`ID: ${note._id} - Published on: ${new Date(
              note.date
            ).toLocaleDateString()}`}
          </div>
          <div className="public-note-content">{note.content}</div>
        </div>
      ))}
    </div>
  );
};

export default PublicArea;
