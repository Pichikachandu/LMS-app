import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { FaArrowLeft, FaEdit } from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { serverUrl } from '../../App';
import { ClipLoader } from 'react-spinners';
import { useDispatch, useSelector } from 'react-redux';
import { setLectureData } from '../../redux/lectureSlice';

function CreateLecture() {
    const navigate = useNavigate()
    const {courseId} = useParams()
    const [lectureTitle , setLectureTitle] = useState("")
    const [loading,setLoading] = useState(false)
    const dispatch = useDispatch()
    const {lectureData} = useSelector(state=>state.lecture)
    

    const createLectureHandler = async () => {
      setLoading(true)
      try {
        const result = await axios.post(serverUrl + `/api/course/createlecture/${courseId}` ,{lectureTitle} , {withCredentials:true})
        console.log(result.data)
      dispatch(setLectureData([...lectureData,result.data.lecture]))
        toast.success("Lecture Created")
        setLoading(false)
        setLectureTitle("")
      } catch (error) {
        console.log(error)
        toast.error(error.response.data.message)
        setLoading(false)
      }
    }

    useEffect(()=>{
      const getLecture = async () => {
        try {
          const result = await axios.get(serverUrl + `/api/course/getcourselecture/${courseId}`,{withCredentials:true})
        console.log(result.data)
        dispatch(setLectureData(result.data.lectures))
        

          
        } catch (error) {
           console.log(error)
        toast.error(error.response.data.message)
        
        }
        
      }
      getLecture()
    },[])

   
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 px-4 py-10">
      <div className="max-w-3xl mx-auto">
        {/* Header Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-8">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 h-2 w-full"></div>
          <div className="p-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => navigate(`/addcourses/${courseId}`)}
                  className="p-2 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                  aria-label="Back to course"
                >
                  <FaArrowLeft className="w-5 h-5 text-gray-600" />
                </button>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Manage Lectures</h1>
                  <p className="text-sm text-gray-500">Add and organize your course lectures</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-8">
          <div className="p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-1">Create New Lecture</h2>
            <p className="text-sm text-gray-500 mb-6">Enter the title for your new lecture</p>
            
            {/* Lecture Title Input */}
            <div className="mb-6">
              <input
                type="text"
                placeholder="e.g., Introduction to MERN Stack"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                onChange={(e) => setLectureTitle(e.target.value)}
                value={lectureTitle}
              />
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-end space-x-3 pt-2">
              <button 
                type="button"
                onClick={() => navigate(`/addcourses/${courseId}`)}
                className="px-5 py-2.5 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200 flex items-center gap-2"
              >
                <FaArrowLeft className="w-3 h-3" />
                Back to Course
              </button>
              <button 
                type="button"
                onClick={createLectureHandler}
                disabled={loading || !lectureTitle}
                className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center min-w-[140px] transition-all duration-200"
              >
                {loading ? (
                  <ClipLoader size={18} color="#ffffff" className="mr-2" />
                ) : (
                  <span>+ Create Lecture</span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Lecture List */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-6">Lecture List</h2>
            {lectureData.length > 0 ? (
              <div className="space-y-3">
                {lectureData.map((lecture, index) => (
                  <div 
                    key={lecture._id} 
                    className="group bg-gray-50 hover:bg-blue-50 rounded-lg p-4 transition-colors duration-200 flex items-center justify-between"
                  >
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm font-medium mr-3">
                        {index + 1}
                      </div>
                      <span className="text-gray-700">{lecture.lectureTitle}</span>
                    </div>
                    <button 
                      onClick={() => navigate(`/editlecture/${courseId}/${lecture._id}`)}
                      className="p-2 text-gray-400 hover:text-blue-600 rounded-full hover:bg-blue-50 transition-colors duration-200"
                      aria-label={`Edit ${lecture.lectureTitle}`}
                    >
                      <FaEdit className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500">No lectures added yet. Create your first lecture above.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
    
  )
}

export default CreateLecture
