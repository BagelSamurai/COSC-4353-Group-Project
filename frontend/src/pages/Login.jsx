import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = ({ onAdminLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    console.log("Login button clicked"); // Debug log
    e.preventDefault();
    console.log("Form submitted with:", { email, password }); // Debug log
    
    if (email && password) {
      try {
        console.log("Sending login request..."); // Debug log
        const response = await fetch("http://localhost:5000/api/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        });
        console.log("Response received:", response.status); // Debug log
        const data = await response.json();
        console.log("Response data:", data); // Debug log

        if (response.ok) {
          localStorage.setItem("user", email);
          localStorage.setItem("role", data.role);

          if (data.role === "admin") {
            if (onAdminLogin) onAdminLogin();
            navigate("/admin");
          } else {
            navigate("/profile");
          }
        } else {
          alert(data.message);
        }
      } catch (error) {
        console.error("Login error:", error); // Debug log
        alert("An error occurred during login");
      }
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" onClick={() => console.log("Button clicked")}>Login</button>
      </form>
    </div>
  );
};

export default Login;
