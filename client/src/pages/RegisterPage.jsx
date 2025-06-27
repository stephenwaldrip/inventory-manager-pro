import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, role: 'admin' }), // 🛠️ temp admin
      });

      const data = await res.json();
      if (res.ok) {
        localStorage.setItem('token', data.token);
        navigate('/');
      } else {
        alert(data.message || 'Registration failed');
      }
    } catch (err) {
      console.error('Error:', err);
      alert('Server error');
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Register Admin</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input type="text" name="name" placeholder="Name" onChange={handleChange} required className="input" />
        <input type="text" name="username" placeholder="Username" onChange={handleChange} required className="input" />
        <input type="email" name="email" placeholder="Email" onChange={handleChange} required className="input" />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} required className="input" />
        <button type="submit" className="btn">Register</button>
      </form>
    </div>
  );
};

export default RegisterPage;
