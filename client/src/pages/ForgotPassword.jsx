import { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const ForgotPassword = () => {
  const [username, setUsername] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/auth/forgot-password', { username });
      toast.success('Reset link sent! Check console.');
    } catch (err) {
      toast.error(err.response?.data?.error || 'Error sending reset link');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4 text-center text-blue-600">Forgot Password</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Enter your username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full border p-2 rounded"
          required
        />
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
          Send Reset Link
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;