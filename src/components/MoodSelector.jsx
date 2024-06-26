import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import "./Mood-selector.css";
import happy from "../assets/happy.png";
import happyHover from "../assets/happyHover.png";
import sad from "../assets/sad.png";
import sadHover from "../assets/sadHover.png";
import angry from "../assets/angry.png";
import angryHover from "../assets/angryHover.png";
import confused from "../assets/confused.png";
import confusedHover from "../assets/confusedHover.png";
import thoughtful from "../assets/thoughtful.png";
import thoughtfulHover from "../assets/thoughtfulHover.png";
import other from "../assets/other.png";
import otherHover from "../assets/otherHover.png";
import SelectionOptions from "./Options";

const moods = [
  { icon: happy, hoverIcon: happyHover, text: "Happy" },
  { icon: sad, hoverIcon: sadHover, text: "Sad" },
  { icon: angry, hoverIcon: angryHover, text: "Angry" },
  { icon: confused, hoverIcon: confusedHover, text: "Confused" },
  { icon: thoughtful, hoverIcon: thoughtfulHover, text: "Thoughtful" },
  { icon: other, hoverIcon: otherHover, text: "Other" },
];

const API_URL = import.meta.env.VITE_API_URL;

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const WelcomeText = styled.h1`
  animation: ${fadeIn} 2s ease-in forwards;
  opacity: 0;
`;

const QuestionText = styled.h2`
  animation: ${fadeIn} 2s ease-in forwards;
  opacity: 0;
  animation-delay: 1s;
  animation-fill-mode: forwards;
`;

const MoodsDisplay = styled.h2`
  animation: ${fadeIn} 2s ease-in forwards;
  opacity: 0;
  animation-fill-mode: forwards;
`;

const MoodOption = styled.div`
  display: inline-block;
  text-align: center;
  margin: 0 10px;
  cursor: pointer;
  animation: ${fadeIn} 2s ease-in forwards;
  opacity: 0;
  animation-delay: 1s;
  animation-fill-mode: forwards;
`;

const MoodSelector = ({ onSelectMood }) => {
  const [showQuestion, setShowQuestion] = useState(false);
  const [showMoods, setShowMoods] = useState(false);
  const [hoveredMood, setHoveredMood] = useState(null);
  const [moodSelected, setMoodSelected] = useState(false);

  useEffect(() => {
    const questionTimer = setTimeout(() => {
      setShowQuestion(true);
    }, 100);

    const moodTimer = setTimeout(() => {
      setShowMoods(true);
    }, 1500);

    return () => {
      clearTimeout(questionTimer);
      clearTimeout(moodTimer);
    };
  }, []);

  const handleSelectMood = async (mood) => {
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(`${API_URL}/api/moods`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ mood }),
      });

      if (!response.ok) {
        throw new Error("Server responded with an error");
      }

      const data = await response.json();
      console.log("Mood stored:", data);
      setMoodSelected(true);
      onSelectMood(mood);
    } catch (error) {
      console.error("Error storing mood:", error);
    }
  };

  return (
    <div className="mood-selector">
      <WelcomeText>Welcome back!</WelcomeText>
      {showQuestion && !moodSelected && (
        <QuestionText>How do you feel?</QuestionText>
      )}
      {showMoods && !moodSelected && (
        <div className="mood-options">
          {moods.map((mood, index) => (
            <MoodOption
              key={index}
              className="mood-option"
              onClick={() => handleSelectMood(mood.text)}
              onMouseEnter={() => setHoveredMood(index)}
              onMouseLeave={() => setHoveredMood(null)}
            >
              <img
                src={hoveredMood === index ? mood.hoverIcon : mood.icon}
                alt={mood.text}
              />
              <div className="mood-text">{mood.text}</div>
            </MoodOption>
          ))}
        </div>
      )}
      {moodSelected && (
        <MoodsDisplay>
          I understand. Would it help you to write or talk?
          <SelectionOptions />
        </MoodsDisplay>
      )}
    </div>
  );
};

export default MoodSelector;
