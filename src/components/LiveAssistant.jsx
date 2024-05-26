import { useState } from "react";
import VoiceInput from "./VoiceInput";
import { getAIResponse, playAudio } from "../utils/aiUtils";
import "./liveAssistant.css";

const LiveAssistant = () => {
  const [feedback, setFeedback] = useState("");

  const handleVoiceInput = async (text) => {
    const aiResponse = await getAIResponse(text);
    setFeedback(aiResponse);
    playAudio(aiResponse);
  };

  return (
    <div className="live-assistant-container">
      <VoiceInput onVoiceInput={handleVoiceInput} />
      <div className="feedback">{feedback && <p>{feedback}</p>}</div>
    </div>
  );
};

export default LiveAssistant;
