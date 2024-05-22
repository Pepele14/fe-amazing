import { useState } from "react";
import SignupPage from "../pages/Signup-page";
import LoginPage from "../pages/Login-page";
import HomePage from "../pages/Home-page";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/theme.context";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/auth/login" element={<LoginPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/auth/signup" element={<SignupPage />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
