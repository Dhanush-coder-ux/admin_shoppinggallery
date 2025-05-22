import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { backend_url, currency } from '../App';
import { toast } from 'react-toastify';

const List = ({token}) => {

  const [list ,setList]=useState([]);


  const fetchlist = async () =>{
    try {
      const response = await axios.get(`${backend_url}/list`)

      if (response.status === 200){
        setList(Array.isArray(response.data.products) ? response.data.products : []);
      
        console.log(response.data)
      }else{
        toast.error(response.data.message)
      }
      
    } catch (error) {
      console.log(error)
      toast.error(error.message)
      
    }
  
  }

  const removeProduct = async (productId) => {
    try {

  
      const response = await axios.delete(`${backend_url}/remove/${productId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (response.status === 200) {
        toast.success("Product deleted successfully!");
        fetchlist();


      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.detail || "Unauthorized request");
    }
  };
  

  useEffect(()=>{
    fetchlist()
    console.log(list)
  },[])
  return (
    <div>
      <p>All Product List</p>
      <div className='flex flex-col gap-2'>
        <div className='hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center p-1 px-2 border bg-gray-100 text-sm'>
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {
          list.map((item,index)=>(
            <div className='grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr]  items-center gap-2 px-2 py-1 border text-sm' key={index}>
              <img className="w-12" src={item.images[0]}  onError={(e) => console.log("Image Error:", e.target.src)} />
          


              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>{currency}{item.price}</p>
              <p onClick={()=>removeProduct(item.id)} className='text-right md:text-center cursor-pointer text-lg'>x</p>
            </div>
          ))
        }
      </div>
      
    </div>
  )
}

export default List
