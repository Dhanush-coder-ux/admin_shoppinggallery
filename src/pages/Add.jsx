import React, { useState } from 'react'
import { assests } from '../assets/assets'
import axios from 'axios'
import {backend_url} from  '../App'
import { toast } from 'react-toastify'

const Add = () => {
// image
  const [image1,setImage1]=useState(false);
  const [image2,setImage2]=useState(false);
  const [image3,setImage3]=useState(false);
  const [image4,setImage4]=useState(false);

  // product name
  const [name,setName]=useState('');
  const [description,SetDescription]=useState('');
  const [price,setPrice]=useState('');
  const [category,setCategory]=useState("Men");
  const [subcategory,SetSubCategory]=useState("Topwear");
  const [sizes,setSizes]=useState([])
  const [bestseller,SetBestSeller]=useState(false);


  const onSubmiteHandler =async (e)=>{
    e.preventDefault();
    
      const formData = new FormData()

      formData.append('name',name)
      formData.append('description',description)
      formData.append('price',price)
      formData.append('category',category)
      formData.append('subcategory',subcategory)
      formData.append('sizes',sizes.join(","))
      formData.append('bestseller',bestseller)
      if (image1) formData.append('image1', image1);
      if (image2) formData.append('image2', image2);
      if (image3) formData.append('image3', image3);
      if (image4) formData.append('image4', image4);
      
      try {
        let token = localStorage.getItem("access_token")

        if (!token) {
            toast.error("Session expired! Please log in.");
            return;
        }

        const response = await axios.post(`${backend_url}/add`, formData, {
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "multipart/form-data",
            },
        });

        if (response.status === 200) {
            toast.success(`Product ${name} added successfully!`);
            SetDescription('');
            setName('');
            setImage1(null);
            setImage2(null);
            setImage3(null);
            setImage4(null);
            setPrice('');

        } else {
            toast.error(response.data.detail);
        }
    } catch (error) {
        toast.error(error.response?.data?.message || "Something went wrong");
    }
};




  return (
    <form onSubmit={onSubmiteHandler} className='flex flex-col w-full items-start gap-3' >
      <div>
        <p className='mb-2'>Upload Image</p>
        <div className='flex gap-2'>
          <label htmlFor="image1">
            <img className='w-50' src={ !image1 ? assests.upload : URL.createObjectURL(image1)} alt="" />
            <input onChange={(e)=>setImage1(e.target.files[0])} type="file" id='image1' hidden/>
          </label>
          <label htmlFor="image2">
            <img className='w-50' src={!image2 ? assests.upload : URL.createObjectURL(image2)} alt="" />
            <input onChange={(e)=>setImage2(e.target.files[0])} type="file" id='image2' hidden/>
          </label>
          <label htmlFor="image3">
            <img className='w-50' src={! image3 ?  assests.upload : URL.createObjectURL(image3)} alt="" />
            <input onChange={(e)=>setImage3(e.target.files[0])} type="file" id='image3' hidden/>
          </label>
          <label htmlFor="image4">
            <img className='w-50' src={! image4 ?assests.upload :URL.createObjectURL(image4)} alt="" />
            <input onChange={(e)=>setImage4(e.target.files[0])} type="file" id='image4' hidden/>
          </label>
        </div>
      </div>

      <div className='w-full'>
        <p className='mb-2'>Product Name</p>

        <input onChange={(e)=>setName(e.target.value)} value={name} className='w-full max-w-[500px] px-3 py-2' type="text" placeholder='Type Here' required/>
      </div>
      <div className='w-full'>
        <p className='mb-2'>Product Description</p>

        <textarea onChange={(e)=>SetDescription(e.target.value)} value={description} className='w-full max-w-[500px] px-3 py-2' type="text" placeholder='Write Content  Here' required/>
      </div>
<div className='flex flex-col sm:flex-row gap-3  w-full sm:gap-8'>

      <div>
        <p className='mb-2'>Product Category</p>
        <select onChange={(e)=>setCategory(e.target.value)}  value={category} className='w-full px-3 py-2' >
          <option value="Men">Men</option>
          <option value="Women">Women</option>
          <option value="Kids">Kids</option>
        </select>
      </div>
      <div>
        <p className='mb-2'>Sub Category</p>
        <select onChange={(e)=>SetSubCategory(e.target.value)} value={subcategory} className='w-full px-3 py-2'>
          <option value="Topwear">Topwear</option>
          <option value="Bottomwear">Bottomwear</option>
          <option value="Winterwear">Winterwear</option>
        </select>
      </div>

      <div>
        <p className='mb-2'>Product Price</p>
        <input onChange={(e)=>setPrice(e.target.value)} value={price} className='w-full px-3 py-2 sm:w-[120px]' type="number"  />
      </div>
  </div>

        <div>
          <p className='mb-2'>Product Sizes</p>
          <div  className='flex gap-3'>
            <div onClick={()=>setSizes(prev => prev.includes('S') ? prev.filter(item => item !== 'S') : [...prev,"S"] )}>
              <p className={`${sizes.includes('S')? "bg-[#c5e574]" : 'bg-slate-200'} px-3 py-1 cursor-pointer `}>s</p>
            </div>
            <div onClick={()=>setSizes(prev => prev.includes('M') ? prev.filter(item => item !== 'M') : [...prev,"M"] )}>
              <p   className={`${sizes.includes('M')? "bg-[#c5e574]" : 'bg-slate-200'} px-3 py-1 cursor-pointer `}>M</p>
            </div>
            <div onClick={()=>setSizes(prev => prev.includes('L') ? prev.filter(item => item !== 'L') : [...prev,"L"] )}>
              <p   className={`${sizes.includes('L')? "bg-[#c5e574]" : 'bg-slate-200'} px-3 py-1 cursor-pointer `}>L</p>
            </div>
            <div onClick={()=>setSizes(prev => prev.includes('XL') ? prev.filter(item => item !== 'XL') : [...prev,"XL"] )}>
              <p  className={`${sizes.includes('XL')? "bg-[#c5e574]" : 'bg-slate-200'} px-3 py-1 cursor-pointer `}>XL</p>
            </div>
            <div onClick={()=>setSizes(prev => prev.includes('XXL') ? prev.filter(item => item !== 'XXL') : [...prev,"XXL"] )}>
              <p   className={`${sizes.includes('XXL')? "bg-[#c5e574]" : 'bg-slate-200'} px-3 py-1 cursor-pointer `}>XXL</p>
            </div>
          </div>
        </div>

        <div className='mt-3 flex gap-2'>
          <input type="checkbox" id='bestseller' onChange={()=>SetBestSeller(prev => !prev)} checked={bestseller} className='accent-[#83B505]' />
          <label className='cursor-pointer' htmlFor="bestseller">Add To Best Seller</label>
        </div>

        <button className='px-4 cursor-pointer py-2 text-white  bg-[#c5e574] ' type='submit'>ADD</button>

    </form>
  )
}

export default Add
