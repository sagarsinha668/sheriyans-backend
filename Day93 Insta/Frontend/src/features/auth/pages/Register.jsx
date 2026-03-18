import React from "react";
import { useState } from "react";
import { Link } from "react-router";
import "../style/form.scss";
import axios from "axios";

const Register = () => {
  const [userName, setuserName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios
        .post(
          "http://localhost:3000/api/auth/register",
          { userName, password, email },
          { withCredentials: true },
        )
        .then((res) => {
          console.log(res.data);
        });
    } catch (error) {
      console.error("Error registering user:", error);
    }
  };

  return (
    <main>
      <div className="form-container">
        <h1>Register Now</h1>
        <form onSubmit={handleSubmit}>
          <input
            onInput={(e) => setuserName(e.target.value)}
            type="text"
            name="userName"
            placeholder="userName"
          />
          <input
            onInput={(e) => setEmail(e.target.value)}
            type="email"
            name="email"
            placeholder="email"
          />
          <input
            onInput={(e) => setPassword(e.target.value)}
            type="password"
            name="password"
            placeholder="password"
          />

          <button type="submit">Register</button>
        </form>
        <p>
          Already have an account?{" "}
          <Link to="/login" className="toggleauthform">
            Login here
          </Link>
        </p>
      </div>
    </main>
  );
};

export default Register;
