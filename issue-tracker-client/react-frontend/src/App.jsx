import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Login from './pages/login'
import Register from './pages/register'
import UserList from './pages/user-list'
import Dashboard from './pages/dashboard'
import Issue from './pages/issue'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import { AuthProvider } from './context/auth-provider'

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/dashboard' element={<Dashboard/>}/>
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/user-list' element={<UserList />} />
          <Route path='/issue' element={<Issue />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App
