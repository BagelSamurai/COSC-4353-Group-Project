import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  /*const handleRegister = (e) => {
    e.preventDefault();
    if (email && password) {
      // Store email and password temporarily (replace this with an actual backend)
      localStorage.setItem("user", email);
      localStorage.setItem("password", password); // Store password temporarily (for development)
      navigate("/profile");
    } else {
      alert("Please fill in both email and password");
    }
  };*/
  const handleRegister = async (e) => {
    e.preventDefault();
    if (email && password) {
<<<<<<< Updated upstream
      const response = await fetch("http://localhost:5000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
=======
        const response = await fetch("http://localhost:5000/api/auth/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (response.ok) {
            navigate("/profile");
        } else {
            alert(data.message || "Registration failed");
        }
    } else {
        alert("Please fill in both email and password");
    }
};

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
      const response = await fetch('/api/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, password })
>>>>>>> Stashed changes
      });

      const data = await response.json();
      if (response.ok) {
          window.location.href = data.redirect;  // Redirects to profile page
      } else {
          setError(data.error || 'Registration failed');
      }
<<<<<<< Updated upstream
    } else {
      alert("Please fill in both email and password");
    }
  };
  
=======
  } catch (error) {
      setError('Server error. Please try again later.');
  }
};

>>>>>>> Stashed changes

  return (
    <div className="register-container">
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
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
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
