
import './index.css'
import NavBar from './components/NavBar'
import SideBar from './components/SideBar'
import { Route, Routes } from 'react-router-dom'
import Add from './pages/Add'
import List from './pages/List'
import Order from './pages/Order'
import { useEffect, useState } from 'react'
import Login from './components/Login'
import { ToastContainer } from 'react-toastify';

export const backend_url =import.meta.env.VITE_BACKEND_URL;
export const currency ='₹'


function App() {
  const [token,setToken]=useState(localStorage.getItem('access_token')?localStorage.getItem('access_token'):'');
  
  useEffect(()=>{
    localStorage.setItem('token',token)
  },[])

  return (
  
    <div className='bg-gray-50 min-h-screen'>
      <ToastContainer/>
      { token === ''
      ? <Login setToken={setToken}/> 
    :
    <>
    <NavBar setToken={setToken}/>
    <hr />
    <div className='flex w-full'>
      <SideBar/>

      <div className='w-[70%] mx-auto ml-[max(5vw,25px)] my-8 text-gray-500 text-base'>
      <Routes>
      <Route path='/add' element={<Add token={token}/>} />
      <Route path='/list' element={<List token={token}/>} />
      <Route path='/orders' element={<Order token={token}/>} />
    </Routes>
      </div>
    </div>

    </>
    }
   
    </div>
    
  
  
  )
}

export default App