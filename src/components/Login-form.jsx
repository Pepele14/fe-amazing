import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/theme.context";

// const API_URL = import.meta.env.VITE_API_URL;

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="login">
      <form onSubmit={submit} className="form-container">
        <h1>Login</h1>
        <input
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          value={email}
          autoComplete="email"
        />
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          value={password}
          autoComplete="current-password"
        />
        <input type="submit" />
        <div className="centered">
          <p>OR</p>
          <Link to="/auth/signup">Sign-up</Link>
        </div>
      </form>
    </div>
  );
}

export default Login;
