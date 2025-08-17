import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'; 
import axios from 'axios';
import toast from 'react-hot-toast';

const Login = ({ onAuth }) => {
  const [form, setForm] = useState({ username: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', form);
      localStorage.setItem('token', res.data.token);
      toast.success('Logged in!');
      if (onAuth) onAuth(); 
      navigate('/');
    } catch (err) {
      toast.error(err.response?.data?.error || 'Login failed');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4 text-center text-blue-600">Login</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Login
        </button>
      </form>

      {/* Forgot Password Link */}
      <p className="text-sm text-center mt-4">
        <Link to="/forgot-password" className="text-blue-600 hover:underline">
          Forgot your password?
        </Link>
      </p>
    </div>
  );
};

export default Login;