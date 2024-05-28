import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/theme.context";
import SignupPage from "./pages/Signup-page";
import LoginPage from "./pages/Login-page";
import HomePage from "./pages/Home-page";
import MyDiary from "./pages/MyDiary-page";
import "./App.css";
import LiveAssistant from "./pages/Live-assistant";
import PublicArea from "./pages/PublicArea";
import ProfilePage from "./pages/Profile-page";

function App() {
  const { auth } = useContext(AuthContext);
  const token = localStorage.getItem("token");

  return (
    <Router>
      <Routes>
        <Route path="/auth/login" element={<LoginPage />} />
        <Route path="/auth/signup" element={<SignupPage />} />
        <Route
          path="/"
          element={token ? <HomePage /> : <Navigate to="/auth/login" />}
        />
        {/* <Route
          path="/mood-selector"
          element={<MoodSelector onSelectMood={handleMoodSelection} />}
        /> */}

        <Route path="/liveassistant" element={<LiveAssistant />} />
        <Route path="/publicarea" element={<PublicArea />} />
        <Route path="/profilepage" element={<ProfilePage />} />
        <Route path="/diary" element={<MyDiary />} />
      </Routes>
    </Router>
  );
}

export default App;
