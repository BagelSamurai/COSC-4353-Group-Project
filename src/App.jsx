import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
//import Login from './pages/Login';
//import Register from './pages/Register';
import Events from './pages/Events';
import './App.css';

const Home = () => <h2>Home Page</h2>;
//const Login = () => <h2>Login Page</h2>;
//const Register = () => <h2>Register Page</h2>;
//const Profile = () => <h2>Profile Page</h2>;

const App = () => {
  return (
    <Router>
      <div>
        <h1>Volunteer Management System</h1>
        <nav>
          <Link to="/">Home</Link> | <Link to="/events">Events</Link>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
        
          <Route path="/events" element={<Events />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;













