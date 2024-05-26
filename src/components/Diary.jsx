import "./diary.css";
import { useState } from "react";
import axios from "axios";

const Diary = () => {
  const [diaryText, setDiaryText] = useState("");
  const [feedback, setFeedback] = useState("");
  const [isButtonClicked, setIsButtonClicked] = useState(false);

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
    } catch (error) {
      console.error("Error fetching feedback:", error);
    }
  };

  return (
    <div className="diary-container">
      <div className="diary-left">
        <textarea
          className="diary-textarea"
          placeholder="Write your thoughts here..."
          value={diaryText}
          onChange={(e) => setDiaryText(e.target.value)}
        />
      </div>
      <div className="diary-right">
        {!isButtonClicked && (
          <button className="feedback-button" onClick={handleGetFeedback}>
            Get Feedback
          </button>
        )}
        {isButtonClicked && <div className="feedback">{feedback}</div>}
      </div>
    </div>
  );
};

export default Diary;
