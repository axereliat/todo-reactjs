import { useSelector } from 'react-redux'
import { Route, Routes, Navigate } from 'react-router-dom'
import GuestLayout from './components/layout/GuestLayout.jsx'
import Login from './pages/Auth/Login.jsx'
import Layout from './components/layout/Layout.jsx'
import Register from './pages/Auth/Register.jsx'
import TodoList from './pages/Todos/TodoList'
import TodoEdit from './pages/Todos/TodoEdit.jsx'
import TodoCreate from './pages/Todos/TodoCreate.jsx'

function App () {
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn)

  if (!isLoggedIn) {
    return (
      <GuestLayout>
        <Routes>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route
            path="*"
            element={<Navigate to="/login" replace/>}
          />
        </Routes>
      </GuestLayout>
    )
  }

  return (
    <Layout>
      <Routes>
        <Route path="/todos/:id/edit" element={<TodoEdit/>}/>
        <Route path="/todos/create" element={<TodoCreate/>}/>
        <Route path="/todos" element={<TodoList/>}/>
        <Route path="/" element={<TodoList/>}/>
        <Route
          path="*"
          element={<Navigate to="/" replace/>}
        />
      </Routes>
    </Layout>
  )
}

export default App
