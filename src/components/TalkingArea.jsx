import React, { useState, useEffect } from "react";
import punycode from "punycode";

const API_URL = import.meta.env.VITE_API_URL;

const TalkingArea = () => {
  const [transcript, setTranscript] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [recognition, setRecognition] = useState(null);

  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognitionInstance = new SpeechRecognition();
      recognitionInstance.continuous = false;
      recognitionInstance.interimResults = false;
      recognitionInstance.lang = "en-US";

      recognitionInstance.onresult = async (event) => {
        const transcript = event.results[0][0].transcript;
        setTranscript(transcript);
        const responseFile = await getAIResponse(transcript);
        const audio = new Audio(`${API_URL}/${responseFile}`);
        audio.play();
      };

      recognitionInstance.onerror = (event) => {
        console.error("Speech recognition error:", event.error);
      };

      setRecognition(recognitionInstance);
    } else {
      console.error("SpeechRecognition is not supported in this browser.");
    }
  }, []);

  const getAIResponse = async (transcript) => {
    try {
      const response = await fetch(`${API_URL}/api/ai/ai-assistant`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query: transcript }),
      });

      if (!response.ok) {
        const errorMessage = `Network response was not ok: ${
          response.status
        } - ${await response.text()}`;
        throw new Error(errorMessage);
      }

      const data = await response.json();
      return data.answer;
    } catch (error) {
      console.error("Error getting AI response:", error);
      return null;
    }
  };

  const startListening = () => {
    // Check if recognition is not already running
    if (recognition && recognition.state !== "listening") {
      recognition.start();
      setIsListening(true);
    }
  };

  const stopListening = () => {
    if (recognition) {
      setIsListening(false);
      recognition.stop();
    }
  };

  return (
    <div
      className="talking-area"
      style={{
        borderRadius: "15px",
        boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
        padding: "20px",
        textAlign: "center",
      }}
    >
      <button
        onMouseDown={startListening}
        onMouseUp={stopListening}
        style={{
          padding: "10px 20px",
          borderRadius: "5px",
          background: "blue",
          color: "white",
          border: "none",
          cursor: "pointer",
        }}
      >
        Hold to Talk
      </button>
    </div>
  );
};

export default TalkingArea;
