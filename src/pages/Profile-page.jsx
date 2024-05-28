import Header from "../components/Header";
import Footer from "../components/Footer";
import Profile from "../components/Profile";
import MoodDistributionChart from "../components/MoodDistributionChart";
import WeeklyMoodDistributionChart from "../components/WeeklyMoodDistributionChart";

function ProfilePage() {
  return (
    <div>
      <Header />
      <Profile />
      <MoodDistributionChart />
      <WeeklyMoodDistributionChart />
      <Footer />
    </div>
  );
}

export default ProfilePage;
