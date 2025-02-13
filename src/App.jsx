import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";  
import VolunteerMatching from "./pages/VolunteerMatching";
import './App.css';

function App() {
  return (
    <Router>
      <h1>Welcome</h1>

      {/* Navigation Links */}
      <nav>
        <Link to="/login">Login</Link> | 
        <Link to="/register">Register</Link> | 
        <Link to="/profile">Profile</Link>
        <Link to="/volunteermatching">Volunteer Matching</Link>
      </nav>

      {/* Define Routes */}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} /> {/* Profile Route */}
        <Route path="/volunteermatching" element={<VolunteerMatching />} />
      </Routes>
    </Router>
  );
}

export default App;




/*import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App*/
