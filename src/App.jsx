import { useState } from "react";
import Signup from "Signup";
import Login from "Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          {/* <Route path="/" element={}/> */}
          {/* <Route path="auth/login" element={}/>
          <Route path="auth/signup" element={}/> */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
