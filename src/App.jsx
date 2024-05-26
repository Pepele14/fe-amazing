import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
// import { useAuth } from "./context/theme.context";
import { useContext } from "react";
import { AuthContext } from "./context/theme.context";
import SignupPage from "./pages/Signup-page";
import LoginPage from "./pages/Login-page";
import HomePage from "./pages/Home-page";
import MoodSelector from "./components/MoodSelector";
import MyDiary from "./pages/MyDiary-page";
import "./App.css";
import LiveAssistant from "./components/LiveAssistant";

function App() {
  const { auth } = useContext(AuthContext);
  // console.log(auth.token);

  // const token = localStorage.getItem("authToken");
  // console.log(token, "fromlocal");

  // console.log("Auth Token:", auth.token);
  const handleMoodSelection = (mood) => {
    fetch("/api/moods", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ mood }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Mood stored:", data);
      })
      .catch((error) => {
        console.error("Error storing mood:", error);
      });
  };

  return (
    <Router>
      <Routes>
        <Route path="/auth/login" element={<LoginPage />} />
        <Route path="/auth/signup" element={<SignupPage />} />
        <Route
          path="/"
          element={auth.token ? <HomePage /> : <Navigate to="/auth/login" />}
        />
        <Route
          path="/mood-selector"
          element={<MoodSelector onSelectMood={handleMoodSelection} />}
        />
        <Route path="/liveassistant" component={LiveAssistant} />

        <Route path="/diary" element={<MyDiary />} />
      </Routes>
    </Router>
  );
}

export default App;
