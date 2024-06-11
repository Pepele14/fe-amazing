import React, { useState, useEffect } from "react";
import "./Diary-bacheca.css";

const API_URL = import.meta.env.VITE_API_URL;

const getRandomColor = () => {
  const colors = [
    "rgba(255, 99, 132, 0.2)",
    "rgba(54, 162, 235, 0.2)",
    "rgba(255, 206, 86, 0.2)",
    "rgba(75, 192, 192, 0.2)",
    "rgba(153, 102, 255, 0.2)",
    "rgba(255, 159, 64, 0.2)",
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};

const DiaryBacheca = () => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("No token found");
        }

        console.log("Fetching notes with token:", token);

        const response = await fetch(`${API_URL}/api/notes/private`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch notes: ${response.statusText}`);
        }

        const data = await response.json();
        console.log("Fetched notes data:", data);
        setNotes(data);
      } catch (error) {
        console.error("Error fetching notes:", error);
      }
    };

    fetchNotes();
  }, []);

  return (
    <div className="diary-bacheca">
      {notes.map((note) => (
        <NoteCard key={note._id} note={note} />
      ))}
    </div>
  );
};

const NoteCard = ({ note }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const toggleExpand = () => setIsExpanded(!isExpanded);

  const shortContent = note.content.substring(0, 50);
  const content = isExpanded ? note.content : `${shortContent}...`;
  const [color] = useState(getRandomColor());

  return (
    <div className="note-card" style={{ backgroundColor: color }}>
      <div className="note-date">
        {new Date(note.date).toLocaleDateString()}
      </div>
      <div className="note-content">{content}</div>
      <button onClick={toggleExpand} className="note-button">
        {isExpanded ? "Show Less" : "Show More"}
      </button>
    </div>
  );
};

export default DiaryBacheca;
