import "../style/form.scss";
import { Link } from "react-router";
import { useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../hooks/useauth";

const Login = () => {
  const [userName, setuserName] = useState("");
  const [password, setPassword] = useState("");
  const { handleLogin } = useAuth();
  const navigate = useNavigate();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    handleLogin(userName, password)
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        alert(error.message || "Login failed");
      });
  };

  return (
    <main>
      <div className="form-container">
        <h1>Login Now Or Never</h1>
        <form onSubmit={handleSubmit}>
          <input
            onInput={(e) => setuserName(e.target.value)}
            type="text"
            name="userName"
            placeholder="userName"
          />
          <input
            onInput={(e) => setPassword(e.target.value)}
            type="password"
            name="password"
            placeholder="password"
          />

          <button type="submit">Login</button>
        </form>
        <p>
          Don't have an account?{" "}
          <Link to="/register" className="toggleauthform">
            Register here
          </Link>
        </p>
      </div>
    </main>
  );
};

export default Login;
