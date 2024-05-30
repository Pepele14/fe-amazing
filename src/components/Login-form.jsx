import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/theme.context";
import bgClouds from "../assets/bg-clouds.png";

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
    <div
      className="login"
      style={{
        backgroundImage: `url(${bgClouds})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <form
        onSubmit={submit}
        className="form-container"
        style={{ backgroundColor: `rgba(0, 0, 0, 0.3)`, color: `white` }}
      >
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
          <Link to="/auth/signup" style={{ color: `white` }}>
            Sign-up
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Login;
