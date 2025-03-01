import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "../styles/HabitForm.css";

const API_BASE_URL = "http://localhost:8000/api";

const HabitForm = () => {
  const [formData, setFormData] = useState({ name: "", description: "" });
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = !!id;

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login first to create or edit a habit.");
      navigate("/login");
      return;
    }

    if (isEdit) {
      const fetchHabit = async () => {
        try {
          const res = await axios.get(`${API_BASE_URL}/habits/${id}`, {
            withCredentials: true,
          });
          setFormData(res.data);
        } catch (error) {
          console.error(error);
        }
      };
      fetchHabit();
    }
  }, [id, isEdit, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      if (isEdit) {
        await axios.put(`${API_BASE_URL}/habits/${id}`, formData, {
          withCredentials: true,
        });
      } else {
        await axios.post(`${API_BASE_URL}/habits`, formData, {
          withCredentials: true,
        });
      }
      navigate('/');
    } catch (error) {
      navigate("/login");
      console.error(error);
    }
  };

  const handleDashboardNavigation = () => {
    navigate("/");
  };

  return (
    <div className="habit-form">
      <h2>{isEdit ? "Edit Habit" : "Create New Habit"}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Habit Name"
          required
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
        <textarea
          placeholder="Description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        />
        <button type="submit">Save</button>
      </form>
      <button onClick={handleDashboardNavigation}>Go to Dashboard</button>
    </div>
  );
};

export default HabitForm;
