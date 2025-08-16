import React, { useState } from 'react'
import { IoMdPerson } from "react-icons/io";
import { IoSearch } from "react-icons/io5";
import { RxHamburgerMenu, RxCross2 } from "react-icons/rx";
import { 
  FiUser, 
  FiBookOpen, 
  FiLayout, 
  FiLogIn, 
  FiLogOut,
  FiMenu,
  FiX
} from "react-icons/fi";

import { useNavigate, Link } from 'react-router-dom';
import { serverUrl } from '../App';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { setUserData } from '../redux/userSlice';

function Nav() {
  const [show, setShow] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  let [showPro,setShowPro] = useState(false)
  let navigate = useNavigate()
  let dispatch = useDispatch()
  let {userData} = useSelector(state=>state.user)

  const handleLogout = async () => {
    try {
      const result = await axios.get(serverUrl + "/api/auth/logout" , {withCredentials:true})
      console.log(result.data)
     await dispatch(setUserData(null))
      toast.success("LogOut Successfully")
    } catch (error) {
      console.log(error.response.data.message)
    }
  }

  return (
    <div className='relative'>
    <div className='w-full bg-white/90 backdrop-blur-md shadow-lg fixed top-0 left-0 z-50 border-b border-gray-100'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex justify-between items-center h-20'>
          {/* Logo and mobile menu button */}
          <div className='flex items-center space-x-1'>
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className='md:hidden p-2 rounded-lg text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50'
            >
              {isMobileMenuOpen ? (
                <FiX className='h-6 w-6' />
              ) : (
                <FiMenu className='h-6 w-6' />
              )}
            </button>
            <Link to="/" className='ml-2 flex items-center space-x-2 group'>
              <div className='w-9 h-9 rounded-lg bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow duration-300'>
                <svg className='w-5 h-5 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253' />
                </svg>
              </div>
              <span className='text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent'>
                LearnHub
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className='hidden md:flex items-center space-x-3'>
            <div className='relative group'>
              <button 
                onClick={() => navigate("/profile")}
                className='flex items-center justify-center gap-2 text-gray-600 hover:text-blue-600 rounded-xl px-4 py-2.5 text-base font-medium transition-all duration-300 hover:bg-blue-50 group-hover:scale-105'
              >
                <div className='p-1.5 rounded-lg bg-blue-50 group-hover:bg-blue-100 transition-colors'>
                  <FiUser className='w-5 h-5 text-blue-600' />
                </div>
                <span className='font-semibold'>My Profile</span>
                <span className='absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full'></span>
              </button>
            </div>
            
            <div className='relative group'>
              <button 
                onClick={() => navigate("/enrolledcourses")}
                className='flex items-center justify-center gap-2 text-gray-600 hover:text-blue-600 rounded-xl px-4 py-2.5 text-base font-medium transition-all duration-300 hover:bg-blue-50 group-hover:scale-105'
              >
                <div className='p-1.5 rounded-lg bg-blue-50 group-hover:bg-blue-100 transition-colors'>
                  <FiBookOpen className='w-5 h-5 text-blue-600' />
                </div>
                <span className='font-semibold'>My Courses</span>
                <span className='absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full'></span>
              </button>
            </div>
            
            {userData?.role === "educator" && (
              <div className='relative group'>
                <button
                  onClick={() => navigate("/dashboard")}
                  className='flex items-center justify-center gap-2 text-gray-600 hover:text-blue-600 rounded-xl px-4 py-2.5 text-base font-medium transition-all duration-300 hover:bg-blue-50 group-hover:scale-105'
                >
                  <div className='p-1.5 rounded-lg bg-blue-50 group-hover:bg-blue-100 transition-colors'>
                    <FiLayout className='w-5 h-5 text-blue-600' />
                  </div>
                  <span className='font-semibold'>Dashboard</span>
                  <span className='absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full'></span>
                </button>
              </div>
            )}
            
            <div className='h-8 w-px bg-gray-200 mx-1'></div>
            
            {!userData ? (
              <div className='relative group'>
                <button 
                  onClick={() => navigate("/login")}
                  className='relative overflow-hidden group-hover:shadow-lg bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-xl px-6 py-2.5 text-base font-medium transition-all duration-300 flex items-center gap-2 shadow-md hover:shadow-blue-500/20 group-hover:scale-105'
                >
                  <span className='relative z-10 flex items-center gap-2'>
                    <FiLogIn className='w-5 h-5' />
                    <span>Login</span>
                  </span>
                  <span className='absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300'></span>
                </button>
              </div>
            ) : (
              <div className='flex items-center space-x-3'>
                <div className='relative group'>
                  <div 
                    className='w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 text-white flex items-center justify-center text-lg font-semibold cursor-pointer shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 overflow-hidden'
                    onClick={() => setShowPro(prev => !prev)}
                  >
                    {userData.photoUrl ? (
                      <img 
                        src={userData.photoUrl} 
                        className='w-full h-full rounded-full object-cover' 
                        alt="Profile"
                      />
                    ) : (
                      <span className='relative z-10'>{userData?.name.slice(0,1).toUpperCase()}</span>
                    )}
                    <div className='absolute inset-0 bg-gradient-to-br from-blue-600 to-blue-700 opacity-0 group-hover:opacity-30 transition-opacity duration-300'></div>
                  </div>
                </div>
                
                <button 
                  onClick={handleLogout}
                  className='flex items-center justify-center gap-2 text-gray-600 hover:text-red-600 rounded-xl px-4 py-2.5 text-base font-medium transition-all duration-300 hover:bg-red-50 group'
                >
                  <div className='p-1.5 rounded-lg bg-red-50 group-hover:bg-red-100 transition-colors'>
                    <FiLogOut className='w-5 h-5 text-red-500' />
                  </div>
                  <span className='font-semibold'>Logout</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
    {/* Mobile Menu Overlay */}
    <div className={`fixed inset-0 z-40 transition-opacity duration-300 ease-in-out ${isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
      {/* Backdrop */}
      <div 
        className='absolute inset-0 bg-black/50 backdrop-blur-sm'
        onClick={() => setIsMobileMenuOpen(false)}
      ></div>
      
      {/* Mobile Menu Panel */}
      <div className={`absolute top-0 left-0 h-full w-80 bg-white shadow-xl transform transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className='p-4 border-b border-gray-100 flex justify-between items-center'>
          <Link 
            to="/" 
            className='flex items-center space-x-2 group py-2'
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <div className='w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center shadow-md'>
              <svg className='w-4 h-4 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253' />
              </svg>
            </div>
            <span className='text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent'>
              LearnHub
            </span>
          </Link>
          <button 
            onClick={() => setIsMobileMenuOpen(false)}
            className='p-2 rounded-full hover:bg-gray-100 text-gray-500 hover:text-gray-700 transition-colors'
          >
            <FiX className='w-5 h-5' />
          </button>
        </div>
        
        <div className='p-4 space-y-1'>
          {!userData ? (
            <button 
              onClick={() => {
                navigate("/login");
                setIsMobileMenuOpen(false);
              }}
              className='w-full flex items-center justify-between px-4 py-3 text-base font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg group transition-colors'
            >
              <div className='flex items-center'>
                <div className='p-1.5 rounded-lg bg-blue-50 group-hover:bg-blue-100 transition-colors mr-3'>
                  <FiLogIn className='w-5 h-5 text-blue-600' />
                </div>
                <span>Login / Register</span>
              </div>
              <span className='bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full'>New</span>
            </button>
          ) : (
            <>
              <div className='px-4 py-3 flex items-center space-x-3 border-b border-gray-100'>
                <div className='relative group'>
                  <div className='w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 text-white flex items-center justify-center text-lg font-semibold shadow-md'>
                    {userData.photoUrl ? (
                      <img 
                        src={userData.photoUrl} 
                        className='w-full h-full rounded-full object-cover' 
                        alt="Profile"
                      />
                    ) : (
                      userData?.name.slice(0,1).toUpperCase()
                    )}
                  </div>
                </div>
                <div>
                  <p className='font-medium text-gray-900'>{userData.name}</p>
                  <p className='text-sm text-gray-500'>{userData.email}</p>
                </div>
              </div>
              
              <button 
                onClick={() => {
                  navigate("/profile");
                  setIsMobileMenuOpen(false);
                }}
                className='w-full flex items-center px-4 py-3 text-base font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors'
              >
                <div className='p-1.5 rounded-lg bg-blue-50 group-hover:bg-blue-100 transition-colors mr-3'>
                  <FiUser className='w-5 h-5 text-blue-600' />
                </div>
                <span>My Profile</span>
              </button>
              
              <button 
                onClick={() => {
                  navigate("/enrolledcourses");
                  setIsMobileMenuOpen(false);
                }}
                className='w-full flex items-center px-4 py-3 text-base font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors'
              >
                <div className='p-1.5 rounded-lg bg-blue-50 group-hover:bg-blue-100 transition-colors mr-3'>
                  <FiBookOpen className='w-5 h-5 text-blue-600' />
                </div>
                <span>My Courses</span>
              </button>
              
              {userData?.role === "educator" && (
                <button
                  onClick={() => {
                    navigate("/dashboard");
                    setIsMobileMenuOpen(false);
                  }}
                  className='w-full flex items-center px-4 py-3 text-base font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors'
                >
                  <div className='p-1.5 rounded-lg bg-blue-50 group-hover:bg-blue-100 transition-colors mr-3'>
                    <FiLayout className='w-5 h-5 text-blue-600' />
                  </div>
                  <span>Instructor Dashboard</span>
                </button>
              )}
              
              <div className='border-t border-gray-100 my-2'></div>
              
              <button 
                onClick={() => {
                  handleLogout();
                  setIsMobileMenuOpen(false);
                }}
                className='w-full flex items-center px-4 py-3 text-base font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors mt-2'
              >
                <div className='p-1.5 rounded-lg bg-red-50 group-hover:bg-red-100 transition-colors mr-3'>
                  <FiLogOut className='w-5 h-5 text-red-500' />
                </div>
                <span>Sign Out</span>
              </button>
            </>
          )}
        </div>
      </div>
      </div>
    </div>
  )
}

export default Nav