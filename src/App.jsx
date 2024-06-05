import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import SignupPage from "./pages/Signup-page";
import LoginPage from "./pages/Login-page";
import HomePage from "./pages/Home-page";
import MyDiary from "./pages/MyDiary-page";
import "./App.css";
import LiveAssistant from "./pages/Live-assistant";
import PublicArea from "./pages/PublicArea";
import ProfilePage from "./pages/Profile-page";

function App() {
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
        <Route
          path="/liveassistant"
          element={token ? <LiveAssistant /> : <Navigate to="/auth/login" />}
        />
        <Route
          path="/publicarea"
          element={token ? <PublicArea /> : <Navigate to="/auth/login" />}
        />
        <Route
          path="/profilepage"
          element={token ? <ProfilePage /> : <Navigate to="/auth/login" />}
        />
        <Route
          path="/diary"
          element={token ? <MyDiary /> : <Navigate to="/auth/login" />}
        />
      </Routes>
    </Router>
  );
}

export default App;
