import Footer from "../components/Footer";
import Header from "../components/Header";
import MoodSelector from "../components/MoodSelector";
import React, { useState } from "react";

const HomePage = () => {
  const handleMoodSelection = (mood) => {
    console.log("Mood selected:", mood);
  };
  return (
    <div>
      <Header />
      <MoodSelector onSelectMood={handleMoodSelection} />
      <Footer />
    </div>
  );
};

export default HomePage;
