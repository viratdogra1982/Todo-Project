
import { BrowserRouter , Routes , Route } from 'react-router-dom'
import StartPage from '../pages/Home'
import UserSignup from '../pages/Signup'
import './App.css'
import UserLogin from '../pages/Login'
import TodosPage from '../pages/Todo'
import AddTodo from '../pages/AddTodoNew'

function App() {


  return (
  <BrowserRouter>
  <Routes>
  <Route path='/' element={<StartPage />} />
  <Route path='/signup' element={<UserSignup />} />
  <Route path='/login' element={<UserLogin/>} />
  <Route path='/todos' element={<TodosPage/>} />
  <Route path='/addtodo' element={<AddTodo/>}/>
  </Routes>
  </BrowserRouter>
  )
}

export default App
