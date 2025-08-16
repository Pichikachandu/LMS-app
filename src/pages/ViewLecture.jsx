import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { FaPlayCircle, FaBookmark, FaRegBookmark, FaRegClock } from 'react-icons/fa';
import { FaArrowLeftLong, FaRegStar, FaStar, FaRegThumbsUp } from "react-icons/fa6";
import { motion, AnimatePresence } from 'framer-motion';

function ViewLecture() {
  const { courseId } = useParams();
  const { courseData } = useSelector((state) => state.course);
  const {userData} = useSelector((state) => state.user)
  const selectedCourse = courseData?.find((course) => course._id === courseId);

  const [selectedLecture, setSelectedLecture] = useState(
    selectedCourse?.lectures?.[0] || null
  );
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [rating, setRating] = useState(4.8);
  const [ratingHover, setRatingHover] = useState(0);
  const navigate = useNavigate()
  const courseCreator = userData?._id === selectedCourse?.creator ? userData : null;


  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-50 p-6 flex flex-col md:flex-row gap-6 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute top-20 -left-20 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-1/3 right-0 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-0 left-1/3 w-72 h-72 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>
     
      {/* Left - Video & Course Info */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full md:w-2/3 bg-white/80 rounded-2xl shadow-lg p-6 border border-white/50 backdrop-blur-sm hover:shadow-xl transition-all duration-300"
      >
        {/* Course Details */}
        <div className="mb-6" >
           
          <div className="flex justify-between items-start">
            <h1 className="text-2xl font-bold flex items-center gap-4 text-gray-800">
              <motion.div 
                whileHover={{ x: -2 }}
                className="cursor-pointer"
              >
                <FaArrowLeftLong 
                  className='text-gray-600 hover:text-indigo-600 w-5 h-5 transition-all duration-200' 
                  onClick={()=>navigate("/")}
                />
              </motion.div>
              {selectedCourse?.title}
            </h1>
            <button 
              onClick={() => setIsBookmarked(!isBookmarked)}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
              aria-label={isBookmarked ? 'Remove from bookmarks' : 'Add to bookmarks'}
            >
              {isBookmarked ? 
                <FaBookmark className="text-indigo-600 w-5 h-5" /> : 
                <FaRegBookmark className="text-gray-400 w-5 h-5 hover:text-indigo-600" />
              }
            </button>
          </div>
          
          <div className="mt-3 flex gap-4 text-sm text-gray-500 font-medium">
            <span>Category: {selectedCourse?.category}</span>
            <span>Level: {selectedCourse?.level}</span>
          </div>
        </div>

        {/* Video Player */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="aspect-video bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl overflow-hidden mb-6 shadow-2xl border-2 border-white/20 relative group"
        >
          {selectedLecture?.videoUrl ? (
            <video
              src={selectedLecture.videoUrl}
              controls
              className="w-full h-full object-cover"
              crossOrigin="anonymous"
            />
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-gray-300 space-y-2">
                <svg className="w-10 h-10 mb-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"></path>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <span className="text-sm font-medium">Select a lecture to start watching</span>
              </div>
          )}
        </motion.div>

        {/* Selected Lecture Info */}
        <div className="mt-2">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="bg-gradient-to-r from-blue-50 to-indigo-50 p-5 rounded-xl border-l-4 border-indigo-500 shadow-sm hover:shadow-md transition-shadow duration-300"
          >
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-1">{selectedLecture?.lectureTitle}</h2>
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <span className="flex items-center gap-1">
                    <FaRegClock className="w-3.5 h-3.5" />
                    <span>12 min</span>
                  </span>
                  <span>•</span>
                  <span>Lecture {selectedCourse?.lectures?.findIndex(l => l._id === selectedLecture?._id) + 1} of {selectedCourse?.lectures?.length}</span>
                </div>
              </div>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span 
                    key={star}
                    className="cursor-pointer"
                    onMouseEnter={() => setRatingHover(star)}
                    onMouseLeave={() => setRatingHover(0)}
                    onClick={() => setRating(star)}
                  >
                    {star <= (ratingHover || rating) ? 
                      <FaStar className="w-4 h-4 text-yellow-400" /> : 
                      <FaRegStar className="w-4 h-4 text-gray-300" />
                    }
                  </span>
                ))}
                <span className="text-xs font-medium text-gray-500 ml-1">({rating})</span>
              </div>
            </div>
            
            <div className="mt-4 flex items-center gap-4">
              <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200">
                <FaRegThumbsUp className="w-4 h-4" />
                <span className="text-sm font-medium">Helpful</span>
              </button>
              <button className="text-sm text-gray-600 hover:text-indigo-600 transition-colors duration-200">
                Need help with this lecture?
              </button>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Right - All Lectures + Creator Info */}
      <motion.div 
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="w-full md:w-1/3 bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-white/50 h-fit hover:shadow-xl transition-shadow duration-300"
      >
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-xl font-bold text-gray-800">Course Content</h2>
          <span className="text-sm bg-blue-100 text-blue-800 px-2.5 py-1 rounded-full">
            {selectedCourse?.lectures?.length || 0} {selectedCourse?.lectures?.length === 1 ? 'Lecture' : 'Lectures'}
          </span>
        </div>
        <div className="flex flex-col gap-3 mb-6">
          {selectedCourse?.lectures?.length > 0 ? (
            selectedCourse.lectures.map((lecture, index) => (
              <motion.button
                key={index}
                onClick={() => setSelectedLecture(lecture)}
                whileHover={{ x: 4 }}
                className={`flex items-center justify-between p-4 rounded-xl transition-all w-full text-left ${
                  selectedLecture?._id === lecture._id
                    ? 'bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-indigo-500 text-indigo-700 shadow-md transform -translate-x-1'
                    : 'hover:bg-gray-50/80 border-l-4 border-transparent hover:border-gray-200 text-gray-700 hover:shadow-sm bg-white/50'
                }`}
              >
                <div>
                  <div className="text-left">
                    <h4 className="text-sm font-medium text-inherit">{lecture.lectureTitle}</h4>
                    <p className="text-xs text-gray-500 mt-0.5">12 min</p>
                  </div>
                  
                </div>
                <div className={`p-1.5 rounded-full transition-all ${
                  selectedLecture?._id === lecture._id 
                    ? 'bg-indigo-600 text-white scale-110' 
                    : 'bg-indigo-100 text-indigo-600'
                }`}>
                  <FaPlayCircle className="w-4 h-4" />
                </div>
              </motion.button>
            ))
          ) : (
            <p className="text-gray-500">No lectures available.</p>
          )}
        </div>

        {/* Creator Info */}
        {courseCreator && (
          <div className="mt-6 pt-5 border-t border-gray-100">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-base font-semibold text-gray-700">Instructor</h3>
              <span className="text-xs bg-indigo-100 text-indigo-800 px-2 py-1 rounded-full">Creator</span>
            </div>
            <div className="flex items-center gap-4">
              <img
                src={courseCreator.photoUrl || '/default-avatar.png'}
                alt="Instructor"
                className="w-14 h-14 rounded-full object-cover border"
              />
              <div>
                <h4 className="text-base font-medium text-gray-800">{courseCreator.name}</h4>
                <p className="text-sm text-gray-500 mt-1">
                  {courseCreator.description || 'No bio available.'}
                </p>
              </div>
            </div>
          </div>
        )}
      </motion.div>
    
    {/* Add global animations */}
    <style jsx global>{`
      @keyframes blob {
        0% { transform: translate(0px, 0px) scale(1); }
        33% { transform: translate(30px, -50px) scale(1.1); }
        66% { transform: translate(-20px, 20px) scale(0.9); }
        100% { transform: translate(0px, 0px) scale(1); }
      }
      .animate-blob {
        animation: blob 7s infinite;
      }
      .animation-delay-2000 {
        animation-delay: 2s;
      }
      .animation-delay-4000 {
        animation-delay: 4s;
      }
    `}</style>
  </div>
  );
}

export default ViewLecture;
