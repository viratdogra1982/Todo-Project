# Todo App

## Author
Virat Dogra ([GitHub](https://github.com/viratdogra1982/))

## Description
A simple Todo application with user authentication, allowing users to create, read, update, and delete tasks.

## Features
- User registration and authentication (JWT-based)
- CRUD operations for todos
- Middleware for authentication
- MongoDB as the database

## Installation
1. Clone the repository:
   sh
   git clone https://github.com/viratdogra1982/todo-app.git
   
2. Install dependencies:
   sh
   cd todo-app
   npm install
   
3. Create a .env file and add the following:
   env
   PORT=5000
   MONGODB_URL=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   
4. Start the server:
   sh
   npm start
   

## API Endpoints
### Authentication
- POST /api/users/register - Register a new user
- POST /api/users/login - Login a user

### Todos
- POST /todos/create - Create a new todo
- GET /todos/all - Get all todos
- PUT /todos/update/:id - Update a todo
- DELETE /todos/delete/:id - Delete a todo

## Project Structure

├── controllers
│   ├── usercontroller.js
│   ├── todocontroller.js
├── middlewares
│   ├── auth.middlewares.js
├── models
│   ├── usermodel.js
│   ├── todomodel.js
├── routes
│   ├── userroutes.js
│   ├── todoroutes.js
├── .env
├── server.js
