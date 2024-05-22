import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function submit(e) {
    e.preventDefault();

    try {
      await axios.post("http://localhost:3000/auth/signup", {
        name,
        email,
        password,
      });
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="signup">
      <h1>Sign Up!</h1>
      <form action="POST">
        <input
          type="name"
          onChange={(e) => {
            setName(e.target.value);
          }}
          placeholder="name"
        />
        <input
          type="email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          placeholder="email"
        />
        <input
          type="password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          placeholder="password"
        />
        <input type="submit" onClick={submit} />
      </form>
      <br />
      <p>OR</p>
      <br />
      <Link to="/auth/login">Login Page</Link>
    </div>
  );
}

export default Signup;
