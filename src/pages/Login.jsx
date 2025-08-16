import React, { useState } from 'react'
import axios from 'axios'
import { serverUrl } from '../App'
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { MdRemoveRedEye } from "react-icons/md";
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { ClipLoader } from 'react-spinners'
import { useDispatch } from 'react-redux'
import { setUserData } from '../redux/userSlice'

function Login() {
    const [email,setEmail]= useState("")
    const [password,setPassword]= useState("")
    const navigate = useNavigate()
    let [show,setShow] = useState(false)
     const [loading,setLoading]= useState(false)
     let dispatch = useDispatch()
    const handleLogin = async () => {
        setLoading(true)
        try {
            const result = await axios.post(serverUrl + "/api/auth/login" , {email , password} ,{withCredentials:true})
            dispatch(setUserData(result.data))
            navigate("/")
            setLoading(false)
            toast.success("Login Successfully")
        } catch (error) {
            console.log(error)
            setLoading(false)
            toast.error(error.response.data.message)
        }
        
    }
  return (
    <div className='bg-gradient-to-br from-blue-50 to-indigo-50 w-[100vw] min-h-[100vh] flex items-center justify-center p-4'>
            <form className='w-full max-w-4xl bg-white shadow-xl rounded-2xl overflow-hidden flex flex-col md:flex-row' onSubmit={(e)=>e.preventDefault()}>
                <div className='md:w-1/2 w-full p-8 flex flex-col items-center justify-center gap-6'>
                    <div className='text-center'>
                        <h1 className='text-3xl font-bold text-gray-800 mb-2'>Welcome to LearnHub</h1>
                        <p className='text-gray-600'>Your gateway to knowledge and skills development</p>
                    </div>
                     <div className='flex flex-col gap-1 w-[85%] items-start justify-center px-3'>
                        <label htmlFor="email" className='font-semibold'>
                            Email
                        </label>
                        <input id='email' type="text" className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors' placeholder='Enter your email' onChange={(e)=>setEmail(e.target.value)} value={email} />
                    </div>
                     <div className='flex flex-col gap-1 w-[85%] items-start justify-center px-3 relative'>
                        <label htmlFor="password" className='font-semibold'>
                            Password
                        </label>
                        <div className='relative w-full'>
                            <input 
                                id='password' 
                                type={show ? "text" : "password"} 
                                className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-10'
                                placeholder='Enter your password' 
                                onChange={(e)=>setPassword(e.target.value)} 
                                value={password} 
                            />
                            <button 
                                type='button' 
                                className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700'
                                onClick={()=>setShow(prev => !prev)}
                            >
                                {show ? <MdRemoveRedEye size={20} /> : <MdOutlineRemoveRedEye size={20} />}
                            </button>
                        </div>
                    </div>
                     
                    <button 
                        className='w-full py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-colors flex items-center justify-center'
                        disabled={loading}
                        onClick={handleLogin}
                    >
                        {loading ? <ClipLoader size={20} color='white' className='mr-2' /> : null}
                        {loading ? 'Logging in...' : 'Login'}
                    </button>
                    
                    <button 
                        type='button' 
                        className='text-sm text-blue-600 hover:text-blue-800 transition-colors'
                        onClick={()=>navigate("/forgotpassword")}
                    >
                        Forgot your password?
                    </button>

                    <div className='text-sm text-gray-600'>
                        Don't have an account?{' '}
                        <button 
                            type='button' 
                            className='text-blue-600 font-medium hover:text-blue-800 transition-colors'
                            onClick={()=>navigate("/signup")}
                        >
                            Sign up
                        </button>
                    </div>
    
                </div>
                <div className='md:w-1/2 bg-gradient-to-br from-blue-600 to-indigo-700 p-8 text-white flex flex-col items-center justify-center text-center hidden md:flex'>
                    <div className='max-w-xs'>
                        <h2 className='text-3xl font-bold mb-4'>LearnHub Academy</h2>
                        <p className='mb-6 text-blue-100'>Empowering your learning journey with expert-led courses and hands-on projects.</p>
                        <div className='space-y-4 text-left'>
                            <div className='flex items-start gap-3'>
                                <div className='mt-1 w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0'>
                                    <span className='text-white text-sm'>1</span>
                                </div>
                                <p>Access to high-quality courses</p>
                            </div>
                            <div className='flex items-start gap-3'>
                                <div className='mt-1 w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0'>
                                    <span className='text-white text-sm'>2</span>
                                </div>
                                <p>Learn at your own pace</p>
                            </div>
                            <div className='flex items-start gap-3'>
                                <div className='mt-1 w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0'>
                                    <span className='text-white text-sm'>3</span>
                                </div>
                                <p>Get certified upon completion</p>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
          
        </div>
      )
}

export default Login
