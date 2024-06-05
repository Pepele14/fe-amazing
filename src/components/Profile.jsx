import React, { useState, useEffect } from "react";
import "./Profile.css";
import LogoutButton from "./Logout";

const API_URL = import.meta.env.VITE_API_URL;

const Profile = ({ onDelete }) => {
  const [user, setUser] = useState({ name: "", email: "" });
  const [profilePic, setProfilePic] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        console.log("token:", token);
        const response = await fetch(`${API_URL}/auth/verify`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }

        const data = await response.json();
        console.log("response", data);
        setUser({ name: data.name, email: data.email });
        console.log({ name: data.name, email: data.email });
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setProfilePic(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  return (
    <div className="profile-info-div">
      <div
        className="profile-pic-container"
        style={{ backgroundImage: profilePic ? `url(${profilePic})` : "none" }}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        {!profilePic && <span>Drop picture here</span>}
      </div>
      <div className="details-container">
        <p>
          <b>{user.name}</b>
        </p>
        <p>{user.email}</p>
      </div>
      <div className="button-container">
        <LogoutButton />
        <button onClick={onDelete} className="button">
          Delete Account
        </button>
      </div>
    </div>
  );
};

export default Profile;
