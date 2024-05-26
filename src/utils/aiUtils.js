import axios from "axios";

export const getAIResponse = async (inputText) => {
  const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
  try {
    const response = await axios.post(
      "https://chat-gpt26.p.rapidapi.com/",
      {
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: inputText }],
      },
      {
        headers: {
          "content-type": "application/json",
          "X-RapidAPI-Key": apiKey,
          "X-RapidAPI-Host": "chat-gpt26.p.rapidapi.com",
        },
      }
    );
    return response.data.choices[0].text.trim();
  } catch (error) {
    console.error("Error fetching AI response: ", error);
    return "Sorry, I could not understand that.";
  }
};

export const playAudio = async (text) => {
  const apiKey = import.meta.env.VITE_GOOGLE_CLOUD_API_KEY;
  const url = `https://texttospeech.googleapis.com/v1/text:synthesize?key=${apiKey}`;

  try {
    const response = await axios.post(
      url,
      {
        input: { text },
        voice: { languageCode: "en-US", ssmlGender: "NEUTRAL" },
        audioConfig: { audioEncoding: "MP3" },
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const audioContent = response.data.audioContent;
    const audio = new Audio(`data:audio/mp3;base64,${audioContent}`);
    audio.play();
  } catch (error) {
    console.error("Error playing audio: ", error);
  }
};
