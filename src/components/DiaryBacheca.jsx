import { useState, useEffect } from "react";
import NoteCounter from "./NoteCounter";
import Diary from "./Diary";
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
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);
  const [showDiary, setShowDiary] = useState(false);

  useEffect(() => {
    fetchNotes(page);
  }, [page]);

  const fetchNotes = async (page) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found");
      }

      console.log("Fetching notes with token:", token);

      const response = await fetch(
        `${API_URL}/api/notes/private?page=${page}&limit=10`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch notes: ${response.statusText}`);
      }

      const data = await response.json();
      console.log("Fetched notes data:", data);
      setNotes((prevNotes) => [...data]);
      if (data.length < 10) {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const loadMoreNotes = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const toggleShowDiary = () => {
    setShowDiary(!showDiary);
  };

  const currentDate = new Date().toLocaleDateString();
  return (
    <div className="diary-bacheca">
      <div className="top-row">
        <div
          className={`how-it-works-container ${isExpanded ? "expanded" : ""}`}
          onClick={toggleExpand}
        >
          {isExpanded ? (
            <p>
              Welcome to your personal diary dashboard. Here you view your
              private notes, add new entries, and manage your diary. Click on a
              note to expand it and see more details or collapse it to see less.
              Use the "Load More" button to fetch additional notes.
            </p>
          ) : (
            <p>How it Works</p>
          )}
        </div>
        <NoteCounter count={notes.length} />
      </div>
      <div className="content-row">
        <div className="left-section">
          <div className="info-container">
            <div className="info-box">{currentDate}</div>
            <div className="info-box">Today's Mood: ""</div>
          </div>
          <div className="note-buttons">
            <button onClick={toggleShowDiary}>Write</button>
            <button>Dictate</button>
          </div>
          {showDiary && <Diary />}
        </div>
        <div className="right-section">
          {notes.map((note) => (
            <NoteCard key={note._id} note={note} />
          ))}
          {hasMore && (
            <button onClick={loadMoreNotes} className="load-more-button">
              Load More
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
const NoteCard = ({ note }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const toggleExpand = () => setIsExpanded(!isExpanded);

  const shortContent = note.content.substring(0, 50);
  const content = isExpanded ? note.content : `${shortContent}...`;
  const color = getRandomColor();

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
