import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const UserLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/users/login`, 
        { email, password }
      );

      if (response.status === 200) {
        const token = response.data.token;
        localStorage.setItem("token", token);
        navigate('/todos');
      }
    } catch (err) {
      console.log('Login failed');
      setEmail('');
      setPassword('');
    }
  };

  return (
    <div className="p-7 h-screen flex flex-col justify-center items-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">

        <div className="text-center mb-5">
          <h1 className="text-2xl font-bold text-gray-900">Todo App</h1>
        </div>

        <h2 className="text-xl font-bold text-center mb-1">Login to manage your Todos</h2>
        <p className="text-sm text-gray-600 text-center mb-4">
          Enter your credentials to access your todos.
        </p>

        <form onSubmit={submitHandler} className="space-y-4">
          <div>
            <label className="text-sm font-medium">Email</label>
            <input
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-gray-200 rounded-lg px-4 py-2 border w-full text-base mt-1"
              type="email"
              placeholder="email@example.com"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Password</label>
            <input
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-gray-200 rounded-lg px-4 py-2 border w-full text-base mt-1"
              type="password"
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            className="bg-blue-500 text-white font-semibold rounded-lg px-4 py-2 w-full text-lg"
          >
            Login
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-4">
          Don't have an account?{' '}
          <button onClick={() => navigate('/signup')} className="text-blue-600 font-medium">
            Sign up here
          </button>
        </p>
      </div>
    </div>
  );
};

export default UserLogin;
