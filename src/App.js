import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Category from './pages/Category'
import Login from './pages/Login'
import Protected from './pages/Protected'
import Register from './pages/Register'
import Dashboard from './pages/user/Dashboard'
import Navbar from './components/Navbar'
import Account from "./pages/user/Account"
import Pagenotfound from "./pages/Pagenotfound"
import Home from './pages/Home'
import Details from './pages/Details'
import CreateAd from './pages/user/CreateAd'
import AdminOnly from './pages/AdminOnly'
import CheckOut from './pages/CheckOut'
import Geo from './pages/Geo'
import ForgetPassword from './pages/ForgetPassword'

export default function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          {/* <Route path='/' element={<Geo />} /> */}
          <Route path='/' element={<Home />} />
          <Route path='/category' element={<Category />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/details/:id' element={<Details />} />
          <Route path='/checkout' element={<Protected element={<CheckOut />} />} />
          {/* <Route path='/forget-password' element={<ForgetPassword />} /> */}
          <Route path='/dashboard' element={<AdminOnly element={<Dashboard />} />} />
          <Route path='/createad' element={<Protected element={<CreateAd />} />} />
          <Route path="/forget-password" element={<ForgetPassword />} />
          <Route path='/account' element={<Protected element={<Account />} />} />
          <Route path='*' element={<Pagenotfound />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}
