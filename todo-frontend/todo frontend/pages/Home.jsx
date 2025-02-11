import React from "react";
import { useNavigate } from "react-router-dom";

const StartPage = () => {
  const navigate = useNavigate();

  return (
    <div 
      className="flex flex-col items-center justify-center h-screen bg-cover bg-center text-white px-4"
      style={{ 
        backgroundImage: "url('https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&w=1920&q=80')" 
      }}
    >
     
      <button 
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg text-lg shadow-md transition-all"
        onClick={() => navigate('/signup')}
      >
        Get Started
      </button>
    </div>
  );
};

export default StartPage;
