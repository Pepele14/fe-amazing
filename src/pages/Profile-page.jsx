import Header from "../components/Header";
import Footer from "../components/Footer";
import Profile from "../components/Profile";
import MoodDistributionChart from "../components/MoodDistributionChart";
import WeeklyMoodDistributionChart from "../components/WeeklyMoodDistributionChart";
import "./Profile-page.css";

function ProfilePage() {
  return (
    <div>
      <Header />
      <div className="profile-page">
        <div className="profile-container">
          <Profile />
          <MoodDistributionChart />
          <WeeklyMoodDistributionChart />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default ProfilePage;
