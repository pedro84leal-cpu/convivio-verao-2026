import './App.css'
import {Routes, Route} from 'react-router-dom'
import Home from '../src/pages/home/home'
import Register from '../src/pages/registo/register'
import Login from '../src/pages/login/login'
import ProtectedRoute from '../src/components/protectedRoute'

function App() {

  return (
    <>
       <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  )
}

export default App
