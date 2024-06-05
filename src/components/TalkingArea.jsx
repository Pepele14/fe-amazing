import { useState, useEffect, useRef } from "react"; //create a mutable ref object.
import "./TalkingArea.css";

const API_URL = import.meta.env.VITE_API_URL;

const SpeechToText = () => {
  const [recognizedText, setRecognizedText] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [transcripts, setTranscripts] = useState([]);
  const [showPopup, setShowPopup] = useState(true);
  const [notification, setNotification] = useState({ message: "", type: "" });
  const recognitionRef = useRef(null);

  useEffect(() => {
    if (window.webkitSpeechRecognition) {
      //checking if browser supports web speech api
      const recognition = new window.webkitSpeechRecognition(); // creating a new speech rec. instance
      recognition.continuous = true;
      recognition.lang = "en-US";

      recognition.onresult = (event) => {
        const transcript =
          event.results[event.results.length - 1][0].transcript; //Extracts the transcript from the event
        setRecognizedText((prevText) => prevText + " " + transcript);
        setTranscripts((prevTranscripts) => [...prevTranscripts, transcript]);
      };

      recognition.onerror = (event) => {
        console.error("Speech recognition error:", event.error);
      };

      recognitionRef.current = recognition; // Storing the recognition instance in the ref object
    } else {
      console.error("Speech recognition is not supported in this browser.");
    }
  }, []);

  const startRecognition = () => {
    recognitionRef.current.start();
    setIsListening(true);
    setShowPopup(false);
  };

  const stopRecognition = () => {
    recognitionRef.current.stop();
    setIsListening(false);
  };

  const showNotification = (message) => {
    setNotification(message);
    setTimeout(() => {
      setNotification({ message: "", type: "" });
    }, 3000);
  };

  const saveNote = async (isPrivate) => {
    const route = isPrivate
      ? `${API_URL}/api/notes/private`
      : `${API_URL}/api/notes/public`;

    const token = localStorage.getItem("token"); // Retrieve the token from local storage
    try {
      const response = await fetch(route, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ content: transcripts.join(" ") }),
      });
      if (!response.ok) {
        throw new Error("Failed to save note");
      }
      showNotification("Note saved successfully");
      setTranscripts([]);
      setRecognizedText("");
    } catch (error) {
      console.error(error);
      showNotification({ message: "Failed to save note", type: "error" });
    }
  };

  return (
    <div className="speech-to-text-container">
      <h1 style={{ textAlign: `center` }}>Dictation</h1>
      {showPopup && (
        <div className="popup">
          Click the "Start Talking" button to start dictation.
          <button onClick={() => setShowPopup(false)}>Close</button>
        </div>
      )}
      {notification.message && (
        <div className={`notification ${notification.type}`}>
          {notification.message}
        </div>
      )}
      <div className="transcript-container">
        {transcripts.map((transcript, index) => (
          <div key={index}>{transcript}</div>
        ))}
      </div>
      <div className="buttons-container">
        {!isListening ? (
          <button onClick={startRecognition}>Start Talking</button>
        ) : (
          <button onClick={stopRecognition}>Stop Talking</button>
        )}
        {!isListening && transcripts.length > 0 && (
          <div>
            <button onClick={() => saveNote(true)}>Save Private</button>
            <button onClick={() => saveNote(false)}>Save Public</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SpeechToText;
