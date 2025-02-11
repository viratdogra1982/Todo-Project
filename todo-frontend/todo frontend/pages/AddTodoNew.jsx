import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddTodo = () => {
  const [formData, setFormData] = useState({ title: "", description: "" });
 const token=localStorage.getItem("token");
  const navigate=useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/todos/create`, formData,{
            headers: { Authorization: `Bearer ${token}` }, 
      });
      console.log("Response:", response.data);
      navigate('/todos')
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Submit Form</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={(e)=>{
            setFormData({ ...formData, title: e.target.value });
          }}
          placeholder="Enter title"
          className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <textarea
          name="content"
          value={formData.description}
          onChange={(e)=>{
            setFormData({ ...formData, description: e.target.value });
          }}
          placeholder="Enter content"
          className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        ></textarea>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddTodo