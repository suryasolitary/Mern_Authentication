import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { app } from '../../firebase';
import { useDispatch } from 'react-redux';
import { SignInSuccess } from '../redux/user/userSlice';

const Auth = () => {
const dispatch = useDispatch()
const handleGoolgeButton = async() =>{

    try{
        const Provider = new GoogleAuthProvider();
        const auth = getAuth(app)
        const result = await signInWithPopup(auth,Provider)
        console.log(result)
        const response = await fetch("/api/auth/google",{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({
                name:result.user.displayName,
                email:result.user.email,
                photo:result.user.photoURL

            })
        })
        
        const data = await response.json()
        console.log(data)
        dispatch(SignInSuccess(data))
      }catch(err){
       console.log("Could not login with Google : ",err)
      }
}
  
  return (
    <button type="button" onClick={handleGoolgeButton} className='bg-red-600 text-white p-3 rounded-lg font-semibold hover:opacity-95'>Continue with Google</button>
  )
}

export default Auth 