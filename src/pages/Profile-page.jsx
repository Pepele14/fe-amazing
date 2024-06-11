import Header from "../components/Header";
import Footer from "../components/Footer";
import Profile from "../components/Profile";
import MoodDistributionChart from "../components/MoodDistributionChart";
import WeeklyMoodDistributionChart from "../components/WeeklyMoodDistributionChart";
import "./Profile-page.css";
import { useState } from "react";

function ProfilePage() {
  const [refresh, setRefresh] = useState(false);

  const handleMoodSelection = (mood) => {
    console.log("Mood selected:", mood);
    setRefresh((prev) => !prev); // Toggle the refresh state to trigger re-fetch
  };
  return (
    <div>
      <Header />
      <div className="profile-page">
        <div className="profile-container">
          <Profile />
          <MoodDistributionChart refresh={refresh} />
          <WeeklyMoodDistributionChart />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default ProfilePage;
