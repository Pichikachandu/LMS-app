import React, { useEffect } from 'react'

import { FaEdit } from "react-icons/fa";

import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { serverUrl } from '../../App';
import { toast } from 'react-toastify';
import { setCreatorCourseData } from '../../redux/courseSlice';
import img1 from "../../assets/empty.jpg"
import { FaArrowLeftLong } from "react-icons/fa6";
function Courses() {

  let navigate = useNavigate()
  let dispatch = useDispatch()

  const { creatorCourseData } = useSelector(state => state.course)

  useEffect(() => {
    const getCreatorData = async () => {
      try {
        const result = await axios.get(serverUrl + "/api/course/getcreatorcourses", { withCredentials: true })

        await dispatch(setCreatorCourseData(result.data))


        console.log(result.data)

      } catch (error) {
        console.log(error)
        toast.error(error.response.data.message)
      }

    }
    getCreatorData()
  }, [])



  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto p-4 sm:p-6">
        {/* Header Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-8">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 h-2 w-full"></div>
          <div className="p-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => navigate("/dashboard")}
                  className="p-2 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                  aria-label="Back to dashboard"
                >
                  <FaArrowLeftLong className="w-5 h-5 text-gray-600" />
                </button>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">My Courses</h1>
                  <p className="text-sm text-gray-500">Manage and track your courses</p>
                </div>
              </div>

              <button 
                onClick={() => navigate("/createcourses")} 
                className="group relative inline-flex items-center justify-center px-5 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium rounded-lg shadow-md hover:shadow-lg transform transition-all duration-200 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Create New Course
              </button>
            </div>
          </div>
        </div>

        {/* For larger screens (table layout) */}
        <div className="hidden md:block bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Course</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {creatorCourseData?.map((course, index) => (
                  <tr key={index} className="hover:bg-gray-50 transition-colors duration-150">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-12 w-16 rounded-md overflow-hidden">
                          {course?.thumbnail ? (
                            <img className="h-full w-full object-cover" src={course.thumbnail} alt={course.title} />
                          ) : (
                            <img src={img1} alt="Course thumbnail" className="h-full w-full object-cover" />
                          )}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{course?.title}</div>
                          <div className="text-sm text-gray-500">{course?.category || 'No category'}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {course?.price ? `₹${course.price}` : 'Free'}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${course?.isPublished ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                        {course?.isPublished ? 'Published' : 'Draft'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => navigate(`/addcourses/${course?._id}`)}
                        className="text-blue-600 hover:text-blue-900 mr-4"
                        title="Edit course"
                      >
                        <FaEdit className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {creatorCourseData?.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500">No courses found. Create your first course to get started.</p>
              </div>
            )}
            {creatorCourseData?.length > 0 && (
              <p className="text-center text-sm text-gray-500 py-4">
                Showing {creatorCourseData?.length} {creatorCourseData?.length === 1 ? 'course' : 'courses'}
              </p>
            )}
          </div>
        </div>

        {/* Mobile View */}
        <div className="md:hidden space-y-4 mt-6">
          {creatorCourseData?.length === 0 ? (
            <div className="bg-white rounded-xl shadow-sm p-6 text-center">
              <p className="text-gray-500">No courses found. Create your first course to get started.</p>
            </div>
          ) : (
            creatorCourseData?.map((course, index) => (
              <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-4">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      {course?.thumbnail ? (
                        <img className="h-16 w-24 rounded-md object-cover" src={course.thumbnail} alt={course.title} />
                      ) : (
                        <img src={img1} alt="Course thumbnail" className="h-16 w-24 rounded-md object-cover" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-medium text-gray-900 truncate">{course?.title}</h3>
                      <p className="text-sm text-gray-500 mt-1">
                        {course?.price ? `₹${course.price}` : 'Free'}
                      </p>
                      <div className="mt-2">
                        <span className={`px-2.5 py-0.5 text-xs font-medium rounded-full ${
                          course?.isPublished ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {course?.isPublished ? 'Published' : 'Draft'}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => navigate(`/addcourses/${course?._id}`)}
                      className="text-gray-400 hover:text-gray-500"
                      title="Edit course"
                    >
                      <FaEdit className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
          
          {creatorCourseData?.length > 0 && (
            <p className="text-center text-sm text-gray-500 mt-4">
              Showing {creatorCourseData?.length} {creatorCourseData?.length === 1 ? 'course' : 'courses'}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Courses
