import React from 'react'
import { Link } from 'react-router-dom'

const SignUp = () => {
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-4 ">Sign Up</h1>
      <form className="flex flex-col gap-3">
        <input type="text" placeholder='Username' id="username" className="bg-slate-100 p-3 pl-4 rounded-lg outline-none border-gray-200" required/>
        <input type="email" placeholder='Email' id="email" className="bg-slate-100 p-3 pl-4 rounded-lg outline-none" required/>
        <input type="password" placeholder='Password' id="password" className="bg-slate-100 p-3 rounded-lg outline-none pl-4" required/>
        <button className="bg-slate-800 text-white p-3 rounded-lg hover:opacity-95 disabled:opacity-80  ">Sign Up</button> 
      </form>
      <div className="flex gap-3 my-4">
          <p className="font-semibold">Have a Account ?</p>
          <Link to="/sign-in">
              <span className='text-blue-500 font-semibold'>Sign In</span>     
          </Link>
      </div>


    </div>
  )
}

export default SignUp