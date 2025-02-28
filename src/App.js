import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Login from './components/Login';
import Signup from './components/Signup';
import Dashboard from './components/Dashboard';
import HabitForm from './components/HabitForm';

// Axios configuration
axios.defaults.baseURL = 'YOUR_BACKEND_BASE_URL'; // Replace with your backend URL

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Dashboard isAuthenticated={isAuthenticated} />} />
        <Route path="/habits/new" element={<HabitForm />} />
        <Route path="/habits/edit/:id" element={<HabitForm />} />
      </Routes>
    </Router>
  );
}

export default App;