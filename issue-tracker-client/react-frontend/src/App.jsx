import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import Register from './pages/user/register'
import UserList from './pages/user/user-list'
import Dashboard from './pages/dashboard/dashboard'
import Issue from './pages/issue/issue'
import IssueList from './pages/issue/issue-list'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import { AuthProvider } from './context/auth-provider'
import Login from './pages/auth/login'

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
          <Route path='/issue-list' element={<IssueList />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App
