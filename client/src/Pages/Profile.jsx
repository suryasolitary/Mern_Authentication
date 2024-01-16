import React from 'react'
import { useSelector } from 'react-redux'
import { useRef, useState } from 'react'


const Profile = () => {
  const FileRef = useRef()
  const [image, setimage] = useState(undefined)
  //console.log(image)
  const {currentUser} = useSelector((state) => state.user )
//console.log(currentUser)
  return (
    <div className='max-w-lg p-3 m-auto'>
      <h1 className=" my-4 text-3xl font-semibold text-center">Profile</h1>
      <form className='flex flex-col gap-4'  >
          <input type="file" onChange={(e)=>setimage(e.target.files[0])} ref={FileRef} hidden accept='images/*'/>
          <img src={currentUser.ProfilePic} onClick={()=>{FileRef.current.click()}} alt="profile" className=" w-24 h-24 self-center cursor-pointer select-none rounded-full object-cover" />
          <input type="text" id='username' placeholder='Username' defaultValue={currentUser.username} className='p-3 outline-blue-700 bg-slate-200 rounded-lg ' />
          <input type="email" id='email' placeholder='Email' defaultValue={currentUser.email} className='bg-slate-200 p-3 rounded-lg outline-blue-700' />
          <input text="password" password='password' placeholder='Password' className='p-3 bg-slate-200 rounded-lg outline-blue-700'  />
          <button className='bg-slate-700 text-white font-semibold rounded-lg p-3 text-4lg hover:opacity-95 disabled:opacity-80'>Update</button>
      </form>
      <div className='flex justify-between mt-4'> 
        <span className='text-red-500 font-semibold cursor-pointer '>Delete Account</span>
        <span className='text-red-500 font-semibold cursor-pointer'>Sign Out</span>
      </div>
    </div>
  )
}

export default Profile