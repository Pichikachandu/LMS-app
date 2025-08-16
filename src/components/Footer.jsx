import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiBook, FiGithub, FiTwitter, FiLinkedin, FiMail } from "react-icons/fi";

const Footer = () => {
  let navigate = useNavigate();
  return (
    <footer className="bg-white border-t border-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Logo + Description */}
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <div className='w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center shadow-md'>
              <FiBook className='w-4 h-4 text-white' />
            </div>
            <span className='text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent'>
              LearnHub
            </span>
          </div>
          <p className="text-gray-600 text-sm">
            Transform your learning journey with our comprehensive education platform. Access world-class courses and develop skills that matter.
          </p>
          <div className="flex space-x-4 pt-2">
            <a href="#" className="text-gray-400 hover:text-blue-600 transition-colors">
              <FiGithub className="w-5 h-5" />
            </a>
            <a href="#" className="text-gray-400 hover:text-blue-600 transition-colors">
              <FiTwitter className="w-5 h-5" />
            </a>
            <a href="#" className="text-gray-400 hover:text-blue-600 transition-colors">
              <FiLinkedin className="w-5 h-5" />
            </a>
            <a href="#" className="text-gray-400 hover:text-blue-600 transition-colors">
              <FiMail className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="space-y-4">
          <h3 className="text-gray-900 font-semibold text-lg">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <button 
                onClick={() => navigate("/")}
                className="text-gray-600 hover:text-blue-600 transition-colors text-sm"
              >
                Home
              </button>
            </li>
            <li>
              <button 
                onClick={() => navigate("/courses")}
                className="text-gray-600 hover:text-blue-600 transition-colors text-sm"
              >
                All Courses
              </button>
            </li>
            <li>
              <Link 
                to="/about"
                className="text-gray-600 hover:text-blue-600 transition-colors text-sm inline-block w-full text-left"
              >
                About Us
              </Link>
            </li>
            <li>
              <Link 
                to="/contact"
                className="text-gray-600 hover:text-blue-600 transition-colors text-sm inline-block w-full text-left"
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Resources */}
        <div className="space-y-4">
          <h3 className="text-gray-900 font-semibold text-lg">Resources</h3>
          <ul className="space-y-2">
            <li>
              <button className="text-gray-600 hover:text-blue-600 transition-colors text-sm">
                Blog
              </button>
            </li>
            <li>
              <button className="text-gray-600 hover:text-blue-600 transition-colors text-sm">
                Help Center
              </button>
            </li>
            <li>
              <button className="text-gray-600 hover:text-blue-600 transition-colors text-sm">
                Tutorials
              </button>
            </li>
            <li>
              <button className="text-gray-600 hover:text-blue-600 transition-colors text-sm">
                Webinars
              </button>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="space-y-4">
          <h3 className="text-gray-900 font-semibold text-lg">Contact Us</h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li className="flex items-start">
              <svg className="h-5 w-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span>contact@learnhub.com</span>
            </li>
            <li className="flex items-start">
              <svg className="h-5 w-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span>+1 (555) 123-4567</span>
            </li>
            <li className="flex items-start">
              <svg className="h-5 w-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span>123 Learning Street<br />San Francisco, CA 94103</span>
            </li>
          </ul>
        </div>
      </div>
      
      <div className="border-t border-gray-200 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
        <p className="text-sm text-gray-500">
          &copy; {new Date().getFullYear()} LearnHub. All rights reserved.
        </p>
        <div className="flex space-x-6 mt-4 md:mt-0">
          <a href="#" className="text-gray-400 hover:text-blue-600 text-sm">Privacy Policy</a>
          <a href="#" className="text-gray-400 hover:text-blue-600 text-sm">Terms of Service</a>
          <a href="#" className="text-gray-400 hover:text-blue-600 text-sm">Cookie Policy</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
