const VoiceInput = ({ onVoiceInput }) => {
  const startRecognition = () => {
    const recognition = new (window.SpeechRecognition ||
      window.webkitSpeechRecognition)();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.start();

    recognition.onresult = (event) => {
      const speechResult = event.results[0][0].transcript;
      onVoiceInput(speechResult);
    };

    recognition.onspeechend = () => {
      recognition.stop();
    };

    recognition.onerror = (event) => {
      console.error("Error occurred in recognition: ", event.error);
    };
  };

  return (
    <div className="voice-input">
      <button onClick={startRecognition}>Start Voice Input</button>
    </div>
  );
};

export default VoiceInput;
