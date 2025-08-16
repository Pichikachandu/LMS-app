import React from 'react';
import Nav from '../components/Nav';
import { SiViaplay } from "react-icons/si";
import Logos from '../components/Logos';
import Cardspage from '../components/Cardspage';
import ExploreCourses from '../components/ExploreCourses';
import About from '../components/About';
import ai from '../assets/ai.png';
import ai1 from '../assets/SearchAi.png';
import ReviewPage from '../components/ReviewPage';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  return (
    <div className='w-full overflow-hidden bg-white'>
      <div className='relative w-full'>
        <Nav />
        
        {/* Hero Section */}
        <div className='w-full pt-25 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 to-indigo-50'>
          <div className='max-w-7xl mx-auto'>
            <div className='text-center max-w-4xl mx-auto'>
              <div className='inline-flex items-center justify-center px-6 py-2 mb-6 bg-blue-100 rounded-full'>
                <span className='text-blue-700 font-medium text-sm uppercase tracking-wider'>Welcome to LearnHub</span>
              </div>
              
              <h1 className='text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight'>
                Transform Your <span className='text-blue-600'>Learning Journey</span>
              </h1>
              
              <p className='text-lg md:text-xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed'>
                Access world-class education from industry experts. Develop skills that matter and achieve your career goals with our comprehensive learning platform.
              </p>
              
              <div className='flex flex-col sm:flex-row gap-4 justify-center mb-16'>
                <button 
                  onClick={() => navigate("/allcourses")}
                  className='px-8 py-3.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-base font-medium transition-all duration-300 flex items-center gap-2 hover:shadow-lg hover:-translate-y-0.5 transform'
                >
                  <span>Browse Courses</span>
                  <SiViaplay className='w-4 h-4' />
                </button>
              </div>
              
              {/* Stats */}
              <div className='grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl mx-auto mt-12'>
                {[
                  { number: '1,000+', label: 'Active Learners' },
                  { number: '50+', label: 'Expert Instructors' },
                  { number: '24/7', label: 'Dedicated Support' }
                ].map((stat, index) => (
                  <div key={index} className='bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100'>
                    <div className='text-2xl font-bold text-blue-600 mb-1'>{stat.number}</div>
                    <div className='text-gray-600 text-sm font-medium'>{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* Wave Divider */}
        <div className='w-full overflow-hidden -mt-px'>
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className='w-full h-16 md:h-24 text-blue-50'>
            <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512,54.82,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" 
            opacity="0.25" fill="currentColor"></path>
            <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" 
            opacity="0.5" fill="currentColor"></path>
            <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" fill="currentColor"></path>
          </svg>
        </div>
      </div>
      <Logos/>
      <ExploreCourses/>
      <Cardspage/>
      <About/>
      <ReviewPage/>
      <Footer/>

      
      
      
    </div>

  ) 
}

export default Home
