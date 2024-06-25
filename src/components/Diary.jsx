import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Diary.css";

const API_URL = import.meta.env.VITE_API_URL;

const tagsList = [
  "relationship",
  "love",
  "loneliness",
  "friendship",
  "work",
  "health",
  "family",
  "happiness",
  "sadness",
  "anxiety",
  "motivation",
  "success",
  "failure",
  "personal growth",
  "education",
  "travel",
  "hobbies",
  "pets",
  "fitness",
  "diet",
];

const Diary = () => {
  const [diaryText, setDiaryText] = useState("");
  const [feedback, setFeedback] = useState("");
  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const [notification, setNotification] = useState("");
  const [feedbackButtonDisabled, setFeedbackButtonDisabled] = useState(false);
  const [selectedTags, setSelectedTags] = useState([]);

  const navigate = useNavigate();

  const showNotification = (message) => {
    setNotification(message);
    setTimeout(() => {
      setNotification("");
    }, 3000);
  };

  const handleSavePrivate = async () => {
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(`${API_URL}/api/notes/private`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ content: diaryText }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response.json();
      showNotification("Private note saved successfully!");
      setDiaryText("");
      setFeedback("");
      setIsButtonClicked(false);
      setSelectedTags([]);
    } catch (error) {
      showNotification("Failed to save private note.");
    }
  };

  const handleSavePublic = async () => {
    try {
      const response = await fetch(`${API_URL}/api/notes/public`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content: diaryText }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response.json();
      showNotification("Public note saved and published successfully!");
      setDiaryText("");
      setFeedback("");
      setIsButtonClicked(false);
      setSelectedTags([]);
      navigate("/publicarea");
    } catch (error) {
      showNotification("Failed to save public note.");
    }
  };

  const handleGetFeedback = async () => {
    const options = {
      method: "POST",
      url: "/api/get-feedback",
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        diaryText: diaryText,
      },
    };

    try {
      const response = await axios.request(options);
      setFeedback(response.data);
      setIsButtonClicked(true);
      setFeedbackButtonDisabled(true);
    } catch (error) {
      console.error("Error fetching feedback:", error);
    }
  };

  const handleTagSelect = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else if (selectedTags.length < 3) {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  return (
    <div className="diary-container">
      {notification && (
        <div className={`notification show`}>{notification}</div>
      )}
      <div className="tag-selection">
        {tagsList.map((tag) => (
          <button
            key={tag}
            type="button"
            onClick={() => handleTagSelect(tag)}
            className={selectedTags.includes(tag) ? "selected" : ""}
          >
            {tag}
          </button>
        ))}
      </div>
      <div className="diary-input-feedback">
        <textarea
          className="diary-textarea"
          value={diaryText}
          onChange={(e) => setDiaryText(e.target.value)}
          placeholder="Write your note here..."
        ></textarea>
        <div className="feedback-container">
          <p>{feedback}</p>
        </div>
      </div>
      <div className="diary-buttons">
        <button onClick={handleSavePrivate}>Save Private</button>
        <button onClick={handleSavePublic}>Save Public</button>
        <button onClick={handleGetFeedback} disabled={feedbackButtonDisabled}>
          Get Feedback
        </button>
      </div>
    </div>
  );
};

export default Diary;
