//import { json, response, response } from 'express'
import  { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
//import { SignInStart,SignInSuccess,SignInFaliure } from '../redux/user/userSlice.js'
//import {useDispatch,useSelector} from 'react-redux'

export default function SignUp(){
  const [formData, setformData]=useState({})
  const [Loading, setLoading] = useState(false)
  const [Error,setError] = useState(false)
  //const { Loading, Error} = useSelector((state)=> state.user )
  const navigation = useNavigate()
  //const dispatch = useDispatch();
  const handleInput = (e)=>{
   setformData({...formData,[e.target.id]:e.target.value})
      //console.log(formData);
  }
  const handlesubmit = async(e)=>{
    e.preventDefault();
    try{
      setLoading(true)
      setError(false)
      const response = await fetch("/api/auth/signup",{
        method:"POST",
        headers:{'Content-Type':'application/json'},
        body: JSON.stringify(formData)
      })
      const data = await response.json()
      //console.log(data);
      setLoading(false)
      if(data.success === false){
          setError(true)
          return
      }
      navigation("/sign-in")
  }catch(err){
      setLoading(false)
      setError(true)
  }
  }
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-4 ">Sign Up</h1>
      <form  onSubmit={handlesubmit} className="flex flex-col gap-3">
        <input type="text" placeholder='Username' id="username" onChange={handleInput}   className="bg-slate-100 p-3 pl-4 rounded-lg outline-none border-gray-200" />
        <input type="email" placeholder='Email' id="email"  onChange={handleInput} className="bg-slate-100 p-3 pl-4 rounded-lg outline-none" />
        <input type="password" placeholder='Password' id="password"  onChange={handleInput} className="bg-slate-100 p-3 rounded-lg outline-none pl-4" />
        <button type="submit" disabled={Loading} className="bg-slate-800 text-white p-3 rounded-lg hover:opacity-95 disabled:opacity-80  ">{Loading?" Loading..." : "Sign Up"}</button>
      </form>
      <div className="flex gap-3 my-4">
          <p className="font-semibold">Have a Account ?</p>
          <Link to="/sign-in">
              <span className='text-blue-500 font-semibold'>Sign In</span>     
          </Link>
      </div>
      <p className="text-red-600 mt-3 font-semibold text-1.5xl" > {Error && `Something Went wrong...`}</p>
    </div>
  )
}

