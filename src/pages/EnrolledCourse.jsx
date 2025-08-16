import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaPlay, FaBookOpen, FaSpinner } from 'react-icons/fa';

function EnrolledCourse() {
  const navigate = useNavigate();
  const { userData, loading } = useSelector((state) => state.user);
  const [isLoading, setIsLoading] = useState(true);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setCourses(userData?.enrolledCourses || []);
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [userData]);

  if (loading || isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50">
        <FaSpinner className="animate-spin text-indigo-600 text-4xl mb-4" />
        <p className="text-gray-600">Loading your courses...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full px-4 py-12 bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center mb-8">
          <button
            onClick={() => navigate("/")}
            className="flex items-center text-indigo-600 hover:text-indigo-800 transition-colors group"
          >
            <FaArrowLeft className="mr-2 transition-transform group-hover:-translate-x-1" />
            <span>Back to Dashboard</span>
          </button>
        </div>

        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
            My Learning Journey
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Continue your learning experience with these enrolled courses.
          </p>
        </div>

        {courses.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg p-8 max-w-2xl mx-auto text-center transform transition-all hover:shadow-xl">
            <div className="mx-auto w-24 h-24 bg-indigo-100 rounded-full flex items-center justify-center mb-6">
              <FaBookOpen className="text-indigo-600 text-3xl" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-3">No Courses Enrolled</h2>
            <p className="text-gray-600 mb-6">You haven't enrolled in any courses yet. Start your learning journey today!</p>
            <button
              onClick={() => navigate("/courses")}
              className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-medium rounded-lg hover:from-indigo-700 hover:to-blue-700 transition-colors shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
            >
              Explore Courses
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course, index) => (
              <div
                key={course._id}
                className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 hover:-translate-y-1"
              >
                <div className="relative">
                  <img
                    src={course.thumbnail || 'https://via.placeholder.com/400x225'}
                    alt={course.title}
                    className="w-full h-48 object-cover"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'https://via.placeholder.com/400x225';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 hover:opacity-100 transition-opacity flex items-end p-4">
                    <button 
                      onClick={() => navigate(`/viewlecture/${course._id}`)}
                      className="flex items-center justify-center w-12 h-12 rounded-full bg-white text-indigo-600 mx-auto mb-4 transform hover:scale-110 transition-transform"
                      aria-label="Continue course"
                    >
                      <FaPlay className="ml-1" />
                    </button>
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex justify-between items-start mb-3">
                    <span className="px-3 py-1 bg-indigo-100 text-indigo-800 text-xs font-medium rounded-full">
                      {course.category || 'General'}
                    </span>
                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                      {course.level || 'All Levels'}
                    </span>
                  </div>
                  <h2 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2 h-14">
                    {course.title}
                  </h2>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2 h-10">
                    {course.description || 'No description available'}
                  </p>
                  <button
                    onClick={() => navigate(`/viewlecture/${course._id}`)}
                    className="w-full py-2.5 bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-medium rounded-lg hover:from-indigo-700 hover:to-blue-700 transition-colors flex items-center justify-center gap-2 hover:shadow-md"
                  >
                    <FaPlay size={12} />
                    <span>Continue Learning</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default EnrolledCourse
