import React from 'react'
import {NavLink} from 'react-router-dom'
import { assests } from '../assets/assets'

const SideBar = () => {
  return (
    <div className='w-[18%] min-h-screen border-r-1'>
        <div className='flex flex-col gap-4 pt-6 pl-[8%] text-[15px]'>
            <NavLink className='flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l shadow-xl' to='/add'>
            <img className='w-5 h-5' src={assests.add} alt="" />
            <p className='hidden md:block '>Add Items</p>

            </NavLink>
            <NavLink className='flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l shadow-xl' to='/list'>
            <img className='w-5 h-5' src={assests.order} alt="" />
            <p className='hidden md:block '>List Items</p>

            </NavLink>
            <NavLink className='flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l shadow-xl' to='/orders'>
            <img className='w-5 h-5' src={assests.order} alt="" />
            <p className='hidden md:block '>Orders</p>

            </NavLink>
        </div>
      
    </div>
  )
}

export default SideBar
