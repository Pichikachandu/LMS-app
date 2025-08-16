import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { serverUrl } from '../App';
import { toast } from 'react-toastify';
import { ClipLoader } from 'react-spinners';
import { motion } from 'framer-motion';
import { FaArrowLeft } from 'react-icons/fa';

function ForgotPassword() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  // Handle email submission for OTP
  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      toast.error('Please enter your email address');
      return;
    }
    
    setLoading(true);
    try {
      const response = await axios.post(`${serverUrl}/api/auth/sendOtp`, { email });
      setMessage('OTP has been sent to your email');
      setStep(2);
      toast.success(response.data.message || 'OTP sent successfully');
    } catch (error) {
      console.error('Error sending OTP:', error);
      const errorMessage = error.response?.data?.message || 'Failed to send OTP';
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Handle OTP verification
  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    if (!otp || otp.length !== 4) {
      toast.error('Please enter a valid 4-digit OTP');
      return;
    }
    
    setLoading(true);
    try {
      const response = await axios.post(`${serverUrl}/api/auth/verifyOtp`, { 
        email, 
        otp 
      });
      
      if (response.data.message === 'OTP varified ') {
        setStep(3);
        toast.success('OTP verified successfully');
      } else {
        throw new Error('Verification failed');
      }
    } catch (error) {
      console.error('Error verifying OTP:', error);
      const errorMessage = error.response?.data?.message || 'Invalid OTP';
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Handle password reset
  const handlePasswordReset = async (e) => {
    e.preventDefault();
    if (newPassword.length < 6) {
      toast.error('Password must be at least 6 characters long');
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    
    setLoading(true);
    try {
      const response = await axios.post(`${serverUrl}/api/auth/resetPassword`, { 
        email, 
        password: newPassword
      });
      
      toast.success(response.data.message || 'Password reset successfully');
      navigate('/login');
    } catch (error) {
      console.error('Error resetting password:', error);
      const errorMessage = error.response?.data?.message || 'Failed to reset password';
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Render step 1: Email input
  const renderEmailStep = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Forgot Password?</h2>
        <p className="text-gray-600">
          Enter your email and we'll send you an OTP to reset your password
        </p>
      </div>
      
      <form onSubmit={handleEmailSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email Address
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
            placeholder="your@email.com"
            required
          />
        </div>
        
        <button
          type="submit"
          disabled={loading}
          className="w-full py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-colors flex items-center justify-center disabled:opacity-70"
        >
          {loading ? <ClipLoader size={20} color="#ffffff" className="mr-2" /> : 'Send OTP'}
        </button>
      </form>
      
      <div className="text-center text-sm">
        <button
          onClick={() => navigate('/login')}
          className="text-blue-600 font-medium hover:text-blue-800 transition-colors flex items-center justify-center mx-auto"
        >
          <FaArrowLeft className="mr-1" /> Back to Login
        </button>
      </div>
    </div>
  );

  // Render step 2: OTP verification
  const renderOtpStep = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Verify OTP</h2>
        <p className="text-gray-600">
          We've sent a 4-digit OTP to {email}
        </p>
      </div>
      
      <form onSubmit={handleOtpSubmit} className="space-y-4">
        <div>
          <label htmlFor="otp" className="block text-sm font-medium text-gray-700 mb-1">
            Enter OTP
          </label>
          <input
            id="otp"
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 4))}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors text-center text-xl tracking-widest"
            placeholder="0000"
            maxLength={4}
            required
          />
        </div>
        
        <button
          type="submit"
          disabled={loading}
          className="w-full py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-colors flex items-center justify-center disabled:opacity-70"
        >
          {loading ? <ClipLoader size={20} color="#ffffff" className="mr-2" /> : 'Verify OTP'}
        </button>
      </form>
      
      <div className="text-center text-sm">
        <button
          onClick={() => setStep(1)}
          className="text-blue-600 font-medium hover:text-blue-800 transition-colors flex items-center justify-center mx-auto"
        >
          <FaArrowLeft className="mr-1" /> Back to Email
        </button>
      </div>
    </div>
  );

  // Render step 3: New password
  const renderNewPasswordStep = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Create New Password</h2>
        <p className="text-gray-600">
          Enter and confirm your new password
        </p>
      </div>
      
      <form onSubmit={handlePasswordReset} className="space-y-4">
        <div>
          <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1">
            New Password
          </label>
          <input
            id="newPassword"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
            placeholder="Enter new password"
            minLength={6}
            required
          />
        </div>
        
        <div>
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
            Confirm Password
          </label>
          <input
            id="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
            placeholder="Confirm new password"
            minLength={6}
            required
          />
        </div>
        
        <button
          type="submit"
          disabled={loading}
          className="w-full py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-colors flex items-center justify-center disabled:opacity-70"
        >
          {loading ? <ClipLoader size={20} color="#ffffff" className="mr-2" /> : 'Reset Password'}
        </button>
      </form>
      
      <div className="text-center text-sm">
        <button
          onClick={() => setStep(2)}
          className="text-blue-600 font-medium hover:text-blue-800 transition-colors flex items-center justify-center mx-auto"
        >
          <FaArrowLeft className="mr-1" /> Back to OTP
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden"
      >
        <div className="p-8">
          {step === 1 && renderEmailStep()}
          {step === 2 && renderOtpStep()}
          {step === 3 && renderNewPasswordStep()}
          
          {message && (
            <div className="mt-4 p-3 bg-blue-50 text-blue-700 text-sm rounded-lg text-center">
              {message}
            </div>
          )}
        </div>
      </motion.div>
    </div>
  )
}

export default ForgotPassword
