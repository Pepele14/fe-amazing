import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./Public-area.css";

const API_URL = import.meta.env.VITE_API_URL;

const PublicArea = () => {
  const [publicNotes, setPublicNotes] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [userLikes, setUserLikes] = useState([]);
  const fetchedPages = useRef(new Set());
  const navigate = useNavigate();

  useEffect(() => {
    if (!fetchedPages.current.has(page)) {
      fetchPublicNotes(page);
    }
  }, [page]);

  useEffect(() => {
    fetchUserLikes();
  }, []);

  const fetchPublicNotes = async (page) => {
    try {
      const response = await fetch(
        `${API_URL}/api/notes/public?page=${page}&limit=8`
      );
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      const data = await response.json();
      if (data.length < 8) {
        setHasMore(false);
      }

      const newNotes = data.filter(
        (note) =>
          !publicNotes.some((existingNote) => existingNote._id === note._id)
      );
      setPublicNotes((prevNotes) => [...newNotes]);
      fetchedPages.current.add(page);
    } catch (error) {
      console.error("Error fetching public notes:", error);
    }
  };

  const fetchUserLikes = async () => {
    try {
      const response = await fetch(`${API_URL}/api/notes/public/likes`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      const data = await response.json();
      setUserLikes(data.map((like) => like.noteId));
    } catch (error) {
      console.error("Error fetching user likes:", error);
    }
  };

  const handleLike = async (noteId) => {
    try {
      const response = await fetch(
        `${API_URL}/api/notes/public/${noteId}/like`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      const data = await response.json();

      // Update the like count and user likes immediately
      setPublicNotes((prevNotes) =>
        prevNotes.map((note) =>
          note._id === noteId
            ? {
                ...note,
                likeCount:
                  data.message === "Like added"
                    ? note.likeCount + 1
                    : note.likeCount - 1,
              }
            : note
        )
      );
      setUserLikes((prevLikes) => {
        if (data.message === "Like added") {
          return [...prevLikes, noteId];
        } else {
          return prevLikes.filter((id) => id !== noteId);
        }
      });
    } catch (error) {
      console.error("Error handling like:", error);
    }
  };

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handleReadMore = (noteId) => {
    navigate(`/notes/${noteId}`);
  };

  return (
    <div className="public-area">
      <h2 style={{ marginBottom: "30px" }}>Public Diary Pages</h2>
      <div
        style={{
          backgroundColor: "#112D4E",
          borderRadius: "13px",
          marginBottom: "30px",
          boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.8)",
          width: "100%",
          maxWidth: "1200px",
          textAlign: "center",
        }}
      >
        <p
          style={{
            fontSize: "20px",
          }}
        >
          Welcome to the community section of Amazing!
        </p>
        <p>
          Here, you can explore all the anonymously shared notes from our users.
          Feel free to engage with them by leaving thoughtful comments and
          offering supportive suggestions.
        </p>
      </div>
      <div
        style={{
          backgroundColor: "#fec101",
          borderRadius: "13px",
          marginBottom: "30px",
          boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.8)",
          width: "100%",
          maxWidth: "1200px",
          textAlign: "center",
        }}
      >
        <p
          style={{
            fontSize: "20px",
            color: "black",
          }}
        >
          We encourage everyone to maintain a respectful and encouraging
          atmosphere, fostering a network where users can support each other
          through their challenges and triumphs. Together, let's create a
          positive and uplifting community experience.
        </p>
      </div>
      <div className="public-notes-container">
        {publicNotes.map((note) => (
          <div key={note._id} className="public-note">
            <div className="public-note-header">
              {`ID: ${note._id} - Published on: ${new Date(
                note.date
              ).toLocaleDateString()}`}
            </div>
            <div className="public-note-content">
              {note.content.length > 41
                ? `${note.content.substring(0, 41)}...`
                : note.content}
            </div>
            <div className="like-section">
              <button
                onClick={() => handleLike(note._id)}
                className="like-button"
                disabled={userLikes.includes(note._id)}
              >
                {userLikes.includes(note._id) ? "Unseen" : "Seen"}
              </button>
              <button
                onClick={() => handleReadMore(note._id)}
                className="read-button"
              >
                Read
              </button>
              <div className="like-count"> Seen {note.likeCount} times</div>
            </div>
          </div>
        ))}
      </div>

      {hasMore ? (
        <button onClick={handleLoadMore} className="load-more-button">
          Load More
        </button>
      ) : (
        <div className="no-more-notes">No more notes to load</div>
      )}
    </div>
  );
};

export default PublicArea;
