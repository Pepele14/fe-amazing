import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "./Header";
import "./FullPublicNote.css";

const API_URL = import.meta.env.VITE_API_URL;

const FullNote = () => {
  const { noteId } = useParams();
  const [note, setNote] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
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

    const fetchComments = async () => {
      try {
        const response = await fetch(
          `${API_URL}/api/notes/public/${noteId}/comments`
        );
        if (!response.ok) {
          throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }
        const data = await response.json();
        setComments(data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchNote();
    fetchComments();
  }, [noteId]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${API_URL}/api/notes/public/${noteId}/comments`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ content: newComment }),
        }
      );
      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }
      const data = await response.json();
      setComments((prevComments) => [...prevComments, data]);
      setNewComment("");
    } catch (error) {
      setError(error.message);
    }
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!note) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Header />

      <div className="full-note-container">
        <div className="full-note">
          <div className="full-note-header">
            <span>Note ID: {note._id}</span>
            <span>
              Published on: {new Date(note.date).toLocaleDateString()}
            </span>
          </div>
          <div className="full-note-content">
            <p>{note.content}</p>
          </div>
          <div>Seen: {note.likeCount}</div>
          <div>Interactions: {comments.length}</div>
          <div className="comments-section">
            <h3>Interactions</h3>
            {comments.map((comment) => (
              <div key={comment._id} className="comment">
                <div>{comment.userId.username}</div>
                <div>{new Date(comment.date).toLocaleDateString()}</div>
                <p>{comment.content}</p>
              </div>
            ))}
            <form className="comment-form" onSubmit={handleCommentSubmit}>
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                rows="4"
                placeholder="Add a comment..."
                required
              ></textarea>
              <button type="submit">Submit</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FullNote;
