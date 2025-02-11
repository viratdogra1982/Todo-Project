import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; 
import axios from "axios";


const TodosPage = () => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");
  const navigate = useNavigate(); 

  useEffect(() => {
    if (!token) {
      navigate("/login"); 
      return;
    }

    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/todos/all`, {
        headers: { Authorization: `Bearer ${token}` }, 
      });

      setTodos(response.data);
    } catch (error) {
      console.error("Error fetching todos:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleComplete = async (id, completed) => {
    try {
      await axios.put(
        `${import.meta.env.VITE_BASE_URL}/todos/update/${id}`,
        { completed: !completed },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setTodos(
        todos.map((todo) => (todo._id === id ? { ...todo, completed: !completed } : todo))
      );
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_BASE_URL}/todos/delete/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setTodos(todos.filter((todo) => todo._id !== id));
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token"); 
    navigate("/login"); 
  };

  if (loading) return <p className="text-center mt-5 text-xl">Loading Todos...</p>;

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10 overflow-x-auto">
      <h1 className="text-4xl font-bold mb-6 text-center">Your Todos</h1>

      
      <div className="flex gap-4 mb-10">
        <button
          onClick={() => navigate("/addtodo")}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg"
        >
          Add Todo
        </button>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded-lg"
        >
          Logout
        </button>
      </div>

      <div className="w-full max-w-2xl bg-white shadow-md rounded-lg p-5 overflow-hidden">
        {todos.length === 0 ? (
          <p className="text-center text-gray-600">No todos found.</p>
        ) : (
          todos.map((todo) => (
            <div
              key={todo._id}
              className="flex flex-wrap justify-between items-center p-3 border-b"
            >
              <div className="flex-1 text-left">
                <h2
                  className={`text-xl font-bold break-words ${
                    todo.completed ? "line-through text-gray-400" : "text-black"
                  }`}
                >
                  {todo.title}
                </h2>
                <p className="text-sm text-gray-600 truncate">{todo.description}</p>
              </div>
              <div className="flex space-x-3">
                <button
                  onClick={() => handleToggleComplete(todo._id, todo.completed)}
                  className={`px-4 py-2 rounded-md text-white ${
                    todo.completed ? "bg-green-500" : "bg-yellow-500"
                  }`}
                >
                  {todo.completed ? "Undo" : "Complete"}
                </button>
                <button
                  onClick={() => handleDelete(todo._id)}
                  className="px-4 py-2 bg-red-500 text-white rounded-md"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TodosPage;

