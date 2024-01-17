import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRef, useState,useEffect } from 'react'
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from 'firebase/storage'
import { app } from '../../firebase';
import  { updateUserSuccess,SignOut,updateUserFailure,DeleteUserStart,DeleteUserSuccess,DeleteUserFailure } from '../redux/user/userSlice'
//import { signUp } from '../../../Api/controllers/authController';


const Profile = () => {
  const dispatch = useDispatch();
  const FileRef = useRef()
  const [image, setimage] = useState(undefined)
  const [imagePersent, setimagePersent] = useState(0);
  const [imageError, setImageError] = useState(false)
  const [formData, setformData] = useState({})
  const [updateLoading, setupdateLoading] = useState(false)
  //console.log(formData)
  //console.log(imagePersent)
  //console.log(image)
  const {currentUser,Loading,Error} = useSelector((state) => state.user )
//console.log(currentUser)
useEffect(()=>{
  if(image){
    handleFileUpload(image)
  }
},[image])
  const handleFileUpload = async  (image)=>{
      const storage = getStorage(app);
      const fileName = new Date().getTime() + image.name;
      const StorageRef = ref(storage,fileName)
      const uploadTask = uploadBytesResumable(StorageRef,image)
      uploadTask.on(
        'state_changed',
        (snapshot)=>{
          const process = (snapshot.bytesTransferred / snapshot.totalBytes ) * 100 ;
          //console.log(`Upload is ` + process + `% done`);
            setimagePersent(Math.round(process));
           // console.log(setimagePersent(process))
        },
        (error)=>{
          setImageError(true)
        },
        ()=>{
          getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl)=>{
              setformData({...formData, ProfilePic:downloadUrl})
          })
        }
      )
  }

  const handleChange = (e)=>{
      setformData({...formData, [e.target.id] : e.target.value} )
  }
  //console.log(formData)

  const handleSubmit = async (e)=>{
    e.preventDefault()
    const response = await fetch(`/api/users/update/${currentUser._id}`,{
      method:"POST",
      headers:{"Content-Type" : 'application/json'},
      body:JSON.stringify(formData)
    })
    const data = await response.json();
    //console.log(data)
    if(data.success === false){
      dispatch(updateUserFailure(data))
    }
    dispatch(updateUserSuccess(data))
    setupdateLoading(true)
  }
const handleDelete = async ()=>{
  try{
    dispatch(DeleteUserStart())
   const response = await fetch(`/api/users/delete/${currentUser._id}`,{
    method:"DELETE"
   })
   const data = await response.json()
   console.log(data)
   if(data.success === false){
    dispatch(DeleteUserFailure(data))
   }
   dispatch(DeleteUserSuccess(data))
  }catch(err){
    dispatch(DeleteUserFailure(err))
  }
}
const handleSignout =async ()=>{
  try{
    await fetch("/api/auth/signout")
    dispatch(SignOut())
  }catch(err){
    console.log(err);
  }
}
  return (
    <div className='max-w-lg p-3 m-auto'>
      <h1 className=" my-4 text-3xl font-semibold text-center">Profile</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4' >
          <input type="file" onChange={(e)=>setimage(e.target.files[0])} ref={FileRef} hidden accept='images/*'/>
          <img src={currentUser.ProfilePic} onClick={()=>{FileRef.current.click()}} alt="profile" className=" w-24 h-24 self-center cursor-pointer select-none rounded-full object-cover" />
          <p className='text-sm self-center font-semibold'>
            {imageError ? (
              <span className='text-red-500'>Error Uploading Image</span>
            ): imagePersent > 0 && imagePersent < 100 ? (
              <span className='text-slate-700'>{`Uploading ${imagePersent} % `}</span>
            ): imagePersent === 100 ? (<span className='text-green-600'> Image Uploading Successfully </span>): ""
            }
          </p>
          <input type="text" id='username' placeholder='Username' defaultValue={currentUser.username} className='p-3 outline-blue-700 bg-slate-200 rounded-lg ' />
          <input type="email" onChange={handleChange}  id='email' placeholder='Email' defaultValue={currentUser.email} className='bg-slate-200 p-3 rounded-lg outline-blue-700' />
          <input text="password" onChange={handleChange} password='password' placeholder='Password' className='p-3 bg-slate-200 rounded-lg outline-blue-700'  />
          <button className='bg-slate-700 text-white font-semibold rounded-lg p-3 text-4lg hover:opacity-95 disabled:opacity-80'>Update</button>
      </form>
      <div className='flex justify-between mt-4'> 
        <span className='text-red-500 font-semibold cursor-pointer ' onClick={handleDelete}>Delete Account</span>
        <span onClick={handleSignout} className='text-red-500 font-semibold cursor-pointer'>Sign Out</span>
      </div>
      <p className='text-red-500 mt-5 font-semibold'>{Error && `Something Went Wrong...`}</p>
      <p className='text-green-600 mt-5 font-semibold'>{updateLoading  && `User Details Updated Successfully...` }</p>
    </div>
  )
}

export default Profile