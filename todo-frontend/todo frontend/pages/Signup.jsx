import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const UserSignup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/users/register`,
        { name, email, password }
      );

      console.log("Signup Successful:", response.data);
      if (response.status === 201 || response.status === 200) {
        
        if (response.data.token) {
          localStorage.setItem("token", response.data.token);
        }
      navigate('/login')
      }
    } catch (err) {
      console.error("Signup Error:", err.response?.data || err.message);
      
      setName('');
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

        <h2 className="text-xl font-bold text-center mb-1">Sign up to manage your Todos</h2>
        <p className="text-sm text-gray-600 text-center mb-4">
          Create an account to add and track your todos efficiently.
        </p>

        <form onSubmit={submitHandler} className="space-y-4">
          <div>
            <label className="text-sm font-medium">Full Name</label>
            <input
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-gray-200 rounded-lg px-4 py-2 border w-full text-base mt-1"
              type="text"
              placeholder="Enter your name"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Email</label>
            <input
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-gray-200 rounded-lg px-4 py-2 border w-full text-base mt-1"
              type="email"
              placeholder="Enter your email"
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
              placeholder="Create a password"
            />
          </div>

          <button
            type="submit"
            className="bg-blue-500 text-white font-semibold rounded-lg px-4 py-2 w-full text-lg"
          >
            Create Account & See Todos
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-4">
          Already have an account?{' '}
          <button onClick={() => navigate('/login')} className="text-blue-600 font-medium">
            Log in
          </button>
        </p>
      </div>
    </div>
  );
};

export default UserSignup;
