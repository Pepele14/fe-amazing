import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useAuth } from "./context/theme.context";
import { useContext } from "react";
import { AuthContext } from "./context/theme.context";
import SignupPage from "../pages/Signup-page";
import LoginPage from "../pages/Login-page";
import HomePage from "../pages/Home-page";

function App() {
  const { auth } = useContext(AuthContext);
  console.log(auth.token);

  const token = localStorage.getItem("authToken");
  console.log(token, "fromlocal");

  console.log("Auth Token:", auth.token); // Debugging line

  return (
    <Router>
      <Routes>
        <Route path="/auth/login" element={<LoginPage />} />
        <Route path="/auth/signup" element={<SignupPage />} />
        <Route
          path="/"
          element={auth.token ? <HomePage /> : <Navigate to="/auth/login" />}
        />
      </Routes>
    </Router>
  );
}

export default App;
