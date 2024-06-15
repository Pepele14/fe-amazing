import { useState, useEffect, useRef } from "react";
import "./Public-area.css";

const API_URL = import.meta.env.VITE_API_URL;

const PublicArea = () => {
  const [publicNotes, setPublicNotes] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true); // state to potentially load more contents if any available
  const [userLikes, setUserLikes] = useState([]);
  const fetchedPages = useRef(new Set()); // Track fetched pages

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
      setPublicNotes((prevNotes) => [...prevNotes, ...data]);
      fetchedPages.current.add(page); // Mark the page as fetched
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
  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handleLike = async (noteId) => {
    console.log(`Liked note with ID: ${noteId}`);
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

      setPublicNotes((prevNotes) =>
        prevNotes.map((note) =>
          note._id === noteId ? { ...note, likeCount: data.likeCount } : note
        )
      );
      fetchUserLikes();
    } catch (error) {
      console.error("Error handling like:", error);
    }
  };

  return (
    <div className="public-area">
      <h2 style={{ marginBottom: "30px" }}>Public Diary Pages</h2>
      <div className="public-notes-container">
        {publicNotes.map((note) => (
          <div key={note._id} className="public-note">
            <div className="public-note-header">
              {`ID: ${note._id} - Published on: ${new Date(
                note.date
              ).toLocaleDateString()}`}
            </div>
            <div className="public-note-content">{note.content}</div>
            <div className="like-section">
              <button
                onClick={() => handleLike(note._id)}
                className="like-button"
                disabled={userLikes.includes(note._id)}
              >
                {userLikes.includes(note._id) ? "Unlike" : "Like"}
              </button>
              <div className="like-count">{note.likeCount} Likes</div>
            </div>
          </div>
        ))}
      </div>

      {hasMore ? (
        <button onClick={handleLoadMore} className="load-more-button">
          Load More
        </button>
      ) : (
        <div className="no-more-notes">No more pages to load</div>
      )}
    </div>
  );
};

export default PublicArea;
