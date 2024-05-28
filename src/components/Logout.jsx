import React from "react";
import { Navigate, useNavigate } from "react-router-dom";

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");

    navigate("/auth/login");
  };

  return (
    <button onClick={handleLogout} className="button">
      Logout
    </button>
  );
};

export default LogoutButton;
