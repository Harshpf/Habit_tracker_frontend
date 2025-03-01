import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/Dashboard.css'; // Import styles

const BASE_URL = 'http://localhost:8000/api';

const Dashboard = () => {
  const [habits, setHabits] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHabits = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/habits`, {
          withCredentials: true
        });
        setHabits(res.data);
      } catch (error) {
        console.error('Error fetching habits:', error);
      }
    };

    fetchHabits();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/habits/${id}`, {
        withCredentials: true
      });
      setHabits(habits.filter(habit => habit._id !== id));
    } catch (error) {
      console.error('Error deleting habit:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <div className="dashboard">
      <h1>Your Habits</h1>
      <button onClick={() => navigate('/habits/new')}>Add New Habit</button>
      
      <div className="habits-list">
        {habits.map(habit => (
          <div key={habit._id} className="habit-item">
            <h3>{habit.name}</h3>
            <p>{habit.description}</p>
            <button onClick={() => navigate(`/habits/edit/${habit._id}`)}>Edit</button>
            <button onClick={() => handleDelete(habit._id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
