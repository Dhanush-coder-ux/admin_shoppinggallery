import React, { useState } from 'react'
import axios from 'axios'
import { backend_url } from '../App';
import { toast } from 'react-toastify';


const Login = ({setToken}) => {

    const [email,setEmail]=useState('');
    const [password,setpassword]=useState('');
    const onSubmiteHandler= async (e)=>{
        try{
            e.preventDefault();
            const formData = new FormData();
            formData.append("email", email);
            formData.append("password", password);
            const response = await axios.post(`${backend_url}/admine`, formData, {
              headers: {
                  "Content-Type": "multipart/form-data",
              },
            
          });
          if (response.data?.access_token && response.data?.refresh_token) {
            
            localStorage.setItem("access_token", response.data.access_token);

      
            localStorage.setItem("refresh_token", response.data.refresh_token);

            setToken(response.data.access_token); 
            toast.success("Login successful", response.data);
        } else {
            toast.error(response.data.message)
        }
            console.log(response)
        }catch(error){
            toast.error(error.message)

        }

    }




  return (
    <div className=' min-h-screen flex items-center justify-center w-full'>
      <div className='bg-white shadow-md rounded-lg px-8  py-6 max-w-md'>
        <h1 className='text-2xl font-bold mb-5 text-[#83B505]'>Admine Panel</h1>
        <form onSubmit={onSubmiteHandler} >
            <div  className='mb-3 min-w-72'>
                <p className='text-sm font-medium text-[#83B505] mb-2'>Email Address</p>
                <input onChange={(e)=>setEmail(e.target.value)} value={email} className='rounded-md w-full px-3 py-2 border border-gray-300 outline-none ' type='email' placeholder='your@gmail.com' required />
            </div>
            <div className='mb-3 min-w-72'>
                <p  className='text-sm font-medium text-[#83B505] mb-2'>Password</p>
                <input onChange={(e)=>setpassword(e.target.value)} value={password} className='rounded-md w-full px-3 py-2 border border-gray-300 outline-none ' type='password' placeholder='Enter Your password' required />
            </div>
            <button className='mt-4 px-3 py-2 rounded-md text-white font-bold bg-[#83B505] w-full' type='submit'> Login</button>
        </form>
      </div>
    </div>
  )
}

export default Login
