import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./diary.css";
import NoteCalendar from "./NoteCalendar";

const API_URL = import.meta.env.VITE_API_URL;

const Diary = () => {
  const [diaryText, setDiaryText] = useState("");
  const [feedback, setFeedback] = useState("");
  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const [notification, setNotification] = useState("");
  const [feedbackButtonDisabled, setFeedbackButtonDisabled] = useState(false);
  const [notes, setNotes] = useState([]);

  const navigate = useNavigate();

  const showNotification = (message) => {
    setNotification(message);
    setTimeout(() => {
      setNotification("");
    }, 3000);
  };

  const handleSavePrivate = async () => {
    try {
      const response = await fetch(`${API_URL}/api/private`, {
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
      console.log("Private note saved:", data);
      showNotification("Private note saved successfully!");
      setDiaryText("");
      setFeedback("");
      setIsButtonClicked(false);
    } catch (error) {
      console.error("Error saving private note:", error);
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
      console.log("Public note saved:", data);
      showNotification("Public note saved and published successfully!");
      setDiaryText("");
      setFeedback("");
      setIsButtonClicked(false);
      navigate("/publicarea");
    } catch (error) {
      console.error("Error saving public note:", error);
      showNotification("Failed to save public note.");
    }
  };

  const handleGetFeedback = async () => {
    const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
    console.log("API Key:", apiKey);

    const options = {
      method: "POST",
      url: "https://chat-gpt26.p.rapidapi.com/",
      headers: {
        "content-type": "application/json",
        "X-RapidAPI-Key": apiKey,
        "X-RapidAPI-Host": "chat-gpt26.p.rapidapi.com",
      },
      data: {
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "user",
            content: diaryText,
          },
        ],
      },
    };

    try {
      const response = await axios.request(options);
      setFeedback(response.data.choices[0].message.content);
      setIsButtonClicked(true);
      setFeedbackButtonDisabled(true); // Disable the feedback button
    } catch (error) {
      console.error("Error fetching feedback:", error);
    }
  };

  const currentDate = new Date().toLocaleDateString();

  return (
    <div>
      {notification && (
        <div className={`notification show`}>{notification}</div>
      )}
      <div className="date-display">{currentDate}</div>
      <div className="diary-container">
        <div className="diary-left">
          <textarea
            className="diary-textarea"
            placeholder="Write your thoughts here..."
            value={diaryText}
            onChange={(e) => setDiaryText(e.target.value)}
          />
          <div className="diary-buttons">
            <button onClick={handleSavePrivate}>Save Private</button>
            <button onClick={handleSavePublic}>Save and Publish</button>
            {!isButtonClicked && (
              <button
                className="feedback-button"
                onClick={handleGetFeedback}
                disabled={feedbackButtonDisabled}
              >
                Get Feedback
              </button>
            )}
          </div>
        </div>
        <div className="diary-right">
          {isButtonClicked && <div className="feedback">{feedback}</div>}
        </div>
      </div>
    </div>
  );
};

export default Diary;
