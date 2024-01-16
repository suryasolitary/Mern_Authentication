import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import  { SignInStart,SignInSuccess,SignInFaliure } from '../redux/user/userSlice'
import { useDispatch, useSelector } from 'react-redux';
import Auth from '../components/Auth';
 
const SignIn = () => {
  const [formData, setformData]=useState({})
  //const [Error,setError]=useState(false);
  //const [Loading,setLoading]=useState(false);
  const { Loading, Error} = useSelector((state)=> state.user )
  //console.log(Loading,Error)
  const navigation = useNavigate()
  const dispatch = useDispatch()
  const handleInput = (e)=>{
      setformData({...formData, [e.target.id] : e.target.value} )
      //console.log(formData);
  }
  const handleButton = async (e) =>{
    e.preventDefault()
    try{
      dispatch(SignInStart())
    const response = await fetch("/api/auth/signin",{
      method:"POST",
      headers:{'Content-Type':'application/json'},
      body: JSON.stringify(formData)
    })
    const data = await response.json()
    //console.log(data);
   
    if(data.success === false){
      dispatch(SignInFaliure(data.message))
      return
    }
     dispatch(SignInSuccess(data))
    navigation('/')
  }catch(err){
   console.error(err)
  }
  }

  return (
    <div className=' max-w-lg mx-auto p-3'>
      <h1 className='text-3xl font-semibold text-center my-4'>Sign In</h1>
      <form  onSubmit={handleButton} className='flex flex-col gap-5'>
        <input type="text" placeholder="Email" id="email" onChange={handleInput} className='p-3 rounded-lg bg-slate-200 outline-none border-blue-600' autoComplete='none'/>
        <input type="password" placeholder='Password' id="password" onChange={handleInput} className='p-3 bg-slate-200 outline-none rounded-lg' />
        <button disabled={Loading} className='bg-slate-800 text-white p-3 rounded-lg font-semibold hover:opacity-95 disabled:opacity-80 '>{Loading ? "Loading..." : "Sign In"}</button>
        <Auth />     
      </form>
      
      <div className='flex gap-2 p-4 font-semibold' >
        <p>Don't have a Account ? </p>
        <Link to='/sign-up'>
            <span className="text-blue-500 cursor-pointer">Sign Up</span>
        </Link>
      </div>
      <p className="text-red-600 mt-3 font-semibold text-1.5xl" > {Error ? Error || "Something went Wrong..." :""}</p>
    </div>
  )
}

export default SignIn