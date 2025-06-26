import { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('/api/auth/login', { email, password });

      const fullUser = {
        ...res.data.user,   // should include name, email, role
        token: res.data.token,
      };

      setUser(fullUser);
      localStorage.setItem('user', JSON.stringify(fullUser));

      navigate('/'); // or dashboard, wherever you want to send them
    } catch (err) {
      console.error(err);
      alert('Login failed. Please check your credentials.');
    }
  };

  return (
    <form onSubmit={handleLogin} className="p-4 max-w-sm mx-auto">
      <h2 className="text-xl font-bold mb-4">Login</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        className="block w-full border p-2 mb-2"
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        className="block w-full border p-2 mb-4"
        required
      />
      <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded">
        Login
      </button>
    </form>
  );
};

export default LoginPage;
