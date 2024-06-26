import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import bgSunset from "../assets/sunset_sky.png";
import "./Signup-form.css";

const API_URL = import.meta.env.VITE_API_URL;

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function submit(e) {
    e.preventDefault();

    try {
      await axios.post(`${API_URL}/auth/signup`, {
        name,
        email,
        password,
      });
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div
      className="signup"
      style={{ backgroundImage: `url(${bgSunset})`, backgroundSize: `cover` }}
    >
      <form action="POST">
        <div
          className="form-container"
          style={{ backgroundColor: `rgba(0, 0, 0, 0.3)` }}
        >
          <h1 style={{ color: `white` }}>Sign Up</h1>
          <input
            type="name"
            onChange={(e) => {
              setName(e.target.value);
            }}
            placeholder="Name"
          />
          <input
            type="email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            placeholder="Email"
            autoComplete="email"
          />
          <input
            type="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            placeholder="Password"
            autoComplete="new-password"
          />
          <input type="submit" onClick={submit} />
          <div className="centered">
            <p style={{ color: `white` }}>OR</p>
            <Link to="/auth/login" style={{ color: `white` }}>
              Login Page
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Signup;
