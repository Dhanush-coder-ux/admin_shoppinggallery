import React from 'react'
import { assests } from '../assets/assets'

const NavBar = ({setToken}) => {
  return (
    <div className=' flex items-center py-3 px-[5%] justify-between'>
        <img className="w-50  sm:w-55 md:w-60 lg:w-65" src={assests.logo} alt="Logo" />

        <button onClick={()=>setToken('')} className='bg-[#83B505] text-white text-b px-5 py-2 sm:py-2 rounded-full text-xs sm:text-sm'>Logout</button>
      
    </div>
  )
}

export default NavBar
