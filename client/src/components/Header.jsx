import React from 'react'
import { Link } from 'react-router-dom'
import {useSelector } from 'react-redux'

export default function Header() {
  const {currentUser} = useSelector(state=>state.user);
  //console.log(currentUser);
  return (
    <div className="bg-slate-300">
        <div className="flex justify-between items-center  max-w-6xl mx-auto p-3" >
            <Link to="/">
            <h1 className="font-bold font-sans text-xl">Yuta Ka</h1>
            </Link>
            <ul className="flex gap-4 text-base font-semibold " >
                <Link to="/">
                <li>Home</li>
                </Link>
                <Link to="/about">
                <li>About</li>
                </Link>
                <Link to="/profile">
                 {currentUser ? (
                   <img src={currentUser.ProfilePic} alt="profile" className='w-7 h-7 rounded-full object-cover' />
                 ):(<li>Sign In</li>)}
                </Link>
            </ul>
        </div>
    </div>
  )
}
