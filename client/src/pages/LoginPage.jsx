// src/pages/LoginPage.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const endpoint = isRegister ? '/api/auth/register' : '/api/auth/login';
    const payload = isRegister ? { username, email, password } : { email, password };

    try {
      const response = await axios.post(endpoint, payload);
      const { token } = response.data;
      localStorage.setItem('token', token);
      alert(`${isRegister ? 'Registration' : 'Login'} successful`);
      navigate('/locations');
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || 'Server error');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full space-y-8 p-10 border rounded bg-white shadow">
        <h2 className="text-center text-2xl font-bold text-gray-900">
          {isRegister ? 'Register' : 'Login'} to Inventory Manager Pro
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {isRegister && (
            <div>
              <label className="block text-sm font-medium text-gray-700">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="mt-1 block w-full px-3 py-2 border rounded"
              />
            </div>
          )}
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border rounded"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
          >
            {isRegister ? 'Register' : 'Login'}
          </button>
        </form>
        <div className="text-center">
          <button
            onClick={() => setIsRegister(!isRegister)}
            className="text-blue-600 hover:underline mt-4"
          >
            {isRegister ? 'Already have an account? Log in' : 'Need an account? Register'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
