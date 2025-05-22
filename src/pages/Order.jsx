 import React, { useEffect, useState } from 'react'
 import axios from 'axios'
 import {backend_url, currency} from  '../App'
import { toast } from 'react-toastify'
import { assests } from '../assets/assets'




 const Order = ({token}) => {

  const [orders,setOrders]=useState([])


  // update order status function ....
  const handleStatusChange = async (orderId, newStatus) => {
    try {
        const response = await axios.put(
            `${backend_url}/orders/update-status`,
            {
                order_id: orderId,
                new_status: newStatus,
            },
            {
                headers: {
                    "Authorization": `Bearer ${token}`,
                },
            }
        );
        if (response.status === 200) {
            toast.success(response.data.message);
            
            fetchAllOrders();
        }
    } catch (error) {
        toast.error(error.response?.data?.detail || error.message);
    }
};



  // order fetching function
  const fetchAllOrders = async ()=>{
    if(!token){
      return null
    }
    try {
      const response =await axios.post(`${backend_url}/orders/allorders`,{},
        {
          headers: {
              "Authorization": `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
          },
      }
      )
      if (response.status === 200) {
        setOrders(response.data.allOrders)
        console.log(response.data.allOrders)
    } else {
        toast.error(response.data.message)
    }
    
      
      
    } catch (error) {
      toast.error(error.message)
      
    }
  }

  useEffect(()=>{
    fetchAllOrders()
  },[token])
   return (
     <div>
      <h3>Order Page</h3>

      <div>
        {
          orders.map((allOrders,index)=>(
            <div className='grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-3 items-start border border-gray-200 p-5 md:p-8 my-3 md:my-4 text-xs  sm:text-sm text-gray-700' key={index}>
              <img className='w-12' src={assests.order} alt="" />
              <div>
                  
             
              <div>
               
                {allOrders.products.map((item,index)=>{
                  if(index === allOrders.products.length - 1){
                    return <p className='py-0.5' key={index}>{item.name} x {item.quantity} <span>{item.size}</span>,</p>
                  }else{
                    return <p className='py-0.5' key={index}>{item.name} x {item.quantity} <span>{item.size}</span>,</p>
                  }
                })}
              </div>
              <p className='mt-3 mb-2'> {allOrders.address[0] + " " + allOrders.address[1]}</p>
              <div>
                <p>{allOrders.address[3] + ","}</p>
                <p>{allOrders.address[4] + "," + allOrders.address[5] + "," + allOrders.address[7] + ","+ allOrders.address[6]}</p>
              </div>
              <p>{allOrders.address[8]}</p>
            </div>
            <div>
              <p className='text-sm sm:text-[15px]'>Items : {allOrders.products.length}</p>
              <p className='mt-3'>Method : {allOrders.paymentmethod}</p>
              <p>Payment : {allOrders.payment ?'Done':'Pending'}</p>
              <p>Date : {new Date(allOrders.date).toDateString()}</p>
            </div>
            <p className='text-sm sm:text-[15px]'>{currency}{allOrders.amount}</p>
            <select
            className='p-2 font-semibold'
            value={allOrders.status} 
            onChange={(e) => handleStatusChange(allOrders.id, e.target.value)}
             >
          <option value="Pending">Pending</option>
          <option value="Canceled">Canceled</option>
          <option value="Order Placed">Order Placed</option>
          <option value="Packing">Packing</option>
          <option value="Shipped">Shipped</option>
          <option value="Out for delivery">Out for delivery</option>
          <option value="Delivered">Delivered</option>
     

         </select>

            </div>
          ))
        }
      </div>
       
     </div>
   )
 }
 
 export default Order
 