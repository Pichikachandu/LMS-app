import React, { useState } from 'react'

import axios from 'axios'
import { serverUrl } from '../App'
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { MdRemoveRedEye } from "react-icons/md";
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setUserData } from '../redux/userSlice'
import { ClipLoader } from 'react-spinners'
import { toast } from 'react-toastify'

function SignUp() {
    const [name,setName]= useState("")
    const [email,setEmail]= useState("")
    const [password,setPassword]= useState("")
    const [role,setRole]= useState("student")
    const navigate = useNavigate()
    let [show,setShow] = useState(false)
    const [loading,setLoading]= useState(false)
    let dispatch = useDispatch()

    const handleSignUp = async () => {
        setLoading(true)
        try {
            const result = await axios.post(serverUrl + "/api/auth/signup" , {name , email , password , role} , {withCredentials:true} )
            dispatch(setUserData(result.data))

            navigate("/")
            toast.success("SignUp Successfully")
            setLoading(false)
        } 
        catch (error) {
            console.log(error)
            setLoading(false)
            toast.error(error.response.data.message)
        }
        
    }

  return (
    <div className='bg-gradient-to-br from-blue-50 to-indigo-50 w-[100vw] min-h-[100vh] flex items-center justify-center p-4'>
        <form className='w-full max-w-4xl bg-white shadow-xl rounded-2xl overflow-hidden flex flex-col md:flex-row' onSubmit={(e)=>e.preventDefault()}>
            <div className='md:w-1/2 w-full p-8 flex flex-col items-center justify-center gap-4'>
                <div className='text-center w-full'>
                    <h1 className='text-3xl font-bold text-gray-800 mb-2'>Join LearnHub</h1>
                    <p className='text-gray-600'>Start your learning journey today</p>
                </div>
                <div className='w-full max-w-xs space-y-4'>
                    <div className='space-y-1'>
                        <label htmlFor="name" className='block text-sm font-medium text-gray-700'>
                            Full Name
                        </label>
                        <input 
                            id='name' 
                            type="text" 
                            className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors'
                            placeholder='Enter your full name' 
                            onChange={(e)=>setName(e.target.value)} 
                            value={name} 
                        />
                    </div>
                    
                    <div className='space-y-1'>
                        <label htmlFor="email" className='block text-sm font-medium text-gray-700'>
                            Email Address
                        </label>
                        <input 
                            id='email' 
                            type="email" 
                            className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors'
                            placeholder='Enter your email' 
                            onChange={(e)=>setEmail(e.target.value)} 
                            value={email} 
                        />
                    </div>
                    
                    <div className='space-y-1'>
                        <label htmlFor="password" className='block text-sm font-medium text-gray-700'>
                            Password
                        </label>
                        <div className='relative'>
                            <input 
                                id='password' 
                                type={show ? "text" : "password"} 
                                className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-10'
                                placeholder='Create a password' 
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
                    <div className='space-y-2'>
                        <p className='text-sm font-medium text-gray-700'>I am signing up as:</p>
                        <div className='flex gap-4'>
                            <button
                                type='button'
                                className={`flex-1 py-2 px-4 rounded-lg border-2 transition-colors ${role === 'student' 
                                    ? 'border-blue-600 bg-blue-50 text-blue-700' 
                                    : 'border-gray-300 hover:border-gray-400'}`}
                                onClick={()=>setRole("student")}
                            >
                                Student
                            </button>
                            <button
                                type='button'
                                className={`flex-1 py-2 px-4 rounded-lg border-2 transition-colors ${role === 'educator' 
                                    ? 'border-blue-600 bg-blue-50 text-blue-700' 
                                    : 'border-gray-300 hover:border-gray-400'}`}
                                onClick={()=>setRole("educator")}
                            >
                                Educator
                            </button>
                        </div>
                    </div>
                    <button 
                        className='w-full py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-colors flex items-center justify-center mt-2'
                        disabled={loading}
                        onClick={handleSignUp}
                    >
                        {loading ? <ClipLoader size={20} color='white' className='mr-2' /> : null}
                        {loading ? 'Creating account...' : 'Create Account'}
                    </button>

                    <div className='text-sm text-gray-600 text-center'>
                        Already have an account?{' '}
                        <button 
                            type='button' 
                            className='text-blue-600 font-medium hover:text-blue-800 transition-colors'
                            onClick={()=>navigate("/login")}
                        >
                            Login
                        </button>
                    </div>
                </div>
            </div>
            <div className='md:w-1/2 bg-gradient-to-br from-blue-600 to-indigo-700 p-8 text-white flex flex-col items-center justify-center text-center hidden md:flex'>
                <div className='max-w-xs'>
                    <h2 className='text-3xl font-bold mb-4'>Why Join LearnHub?</h2>
                    <p className='mb-6 text-blue-100'>Access thousands of courses taught by industry experts and advance your career.</p>
                    <div className='space-y-4 text-left'>
                        <div className='flex items-start gap-3'>
                            <div className='mt-1 w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0'>
                                <svg className='w-3 h-3 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth='3' d='M5 13l4 4L19 7'></path></svg>
                            </div>
                            <p>Personalized learning paths</p>
                        </div>
                        <div className='flex items-start gap-3'>
                            <div className='mt-1 w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0'>
                                <svg className='w-3 h-3 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth='3' d='M5 13l4 4L19 7'></path></svg>
                            </div>
                            <p>Interactive coding exercises</p>
                        </div>
                        <div className='flex items-start gap-3'>
                            <div className='mt-1 w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0'>
                                <svg className='w-3 h-3 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth='3' d='M5 13l4 4L19 7'></path></svg>
                            </div>
                            <p>Earn certificates for your achievements</p>
                        </div>
                        <div className='flex items-start gap-3'>
                            <div className='mt-1 w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0'>
                                <svg className='w-3 h-3 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth='3' d='M5 13l4 4L19 7'></path></svg>
                            </div>
                            <p>Join a community of learners</p>
                        </div>
                    </div>
                </div>
            </div>
           
        </form>
     
    </div>
  )
}

export default SignUp
