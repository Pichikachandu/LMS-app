import axios from 'axios'
import React, { useState } from 'react'
import { FaArrowLeft } from "react-icons/fa"
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { serverUrl } from '../../App'
import { setLectureData } from '../../redux/lectureSlice'
import { toast } from 'react-toastify'
import { ClipLoader } from 'react-spinners'
function EditLecture() {
    const [loading,setLoading]= useState(false)
    const [loading1,setLoading1]= useState(false)
    const {courseId , lectureId} = useParams()
    const {lectureData} = useSelector(state=>state.lecture)
    const dispatch = useDispatch()
    const selectedLecture = lectureData.find(lecture => lecture._id === lectureId)
    const [videoUrl,setVideoUrl] = useState(null)
    const [lectureTitle,setLectureTitle] = useState(selectedLecture.lectureTitle)
    const [isPreviewFree,setIsPreviewFree] = useState(false)

    const formData = new FormData()
    formData.append("lectureTitle",lectureTitle)
    formData.append("videoUrl",videoUrl)
    formData.append("isPreviewFree",isPreviewFree)
    

    const editLecture = async () => {
      setLoading(true)
      try {
        const result = await axios.post(serverUrl + `/api/course/editlecture/${lectureId}` , formData , {withCredentials:true})
        console.log(result.data)
        dispatch(setLectureData([...lectureData,result.data]))
        toast.success("Lecture Updated")
        navigate("/courses")
        setLoading(false)
      } catch (error) {
        console.log(error)
        toast.error(error.response.data.message)
        setLoading(false)
      }
    }

    const removeLecture = async () => {
      setLoading1(true)
      try {
        const result = await axios.delete(serverUrl + `/api/course/removelecture/${lectureId}` , {withCredentials:true})
        console.log(result.data)
        toast.success("Lecture Removed")
       navigate(`/createlecture/${courseId}`)
        setLoading1(false)
      } catch (error) {
        console.log(error)
        toast.error("Lecture remove error")
        setLoading1(false)
      }
      
    }






    const navigate = useNavigate()
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 px-4 py-10">
      <div className="max-w-2xl mx-auto">
        {/* Header Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-8">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 h-2 w-full"></div>
          <div className="p-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => navigate(`/createlecture/${courseId}`)}
                  className="p-2 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                  aria-label="Back to lectures"
                >
                  <FaArrowLeft className="w-5 h-5 text-gray-600" />
                </button>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Edit Lecture</h1>
                  <p className="text-sm text-gray-500">Update your lecture details and video content</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6">
            {/* Danger Zone */}
            <div className="mb-8 p-4 bg-red-50 border border-red-100 rounded-lg">
              <h3 className="text-sm font-medium text-red-800 mb-2">Danger Zone</h3>
              <p className="text-xs text-red-600 mb-3">This action cannot be undone. This will permanently delete the lecture and its contents.</p>
              <button 
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-md transition-colors duration-200 flex items-center gap-2" 
                onClick={removeLecture}
                disabled={loading1}
              >
                {loading1 ? (
                  <ClipLoader size={16} color="#ffffff" />
                ) : (
                  <span>Remove Lecture</span>
                )}
              </button>
            </div>

            {/* Lecture Form */}
            <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); editLecture(); }}>
              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Lecture Title</label>
                <input
                  type="text"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                  placeholder="Enter lecture title"
                  value={lectureTitle}
                  onChange={(e) => setLectureTitle(e.target.value)}
                  required
                />
              </div>

              {/* Video Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Video</label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg">
                  <div className="space-y-1 text-center">
                    <svg
                      className="mx-auto h-12 w-12 text-gray-400"
                      stroke="currentColor"
                      fill="none"
                      viewBox="0 0 48 48"
                      aria-hidden="true"
                    >
                      <path
                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <div className="flex text-sm text-gray-600">
                      <label
                        htmlFor="video-upload"
                        className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
                      >
                        <span>Upload a video</span>
                        <input
                          id="video-upload"
                          name="video-upload"
                          type="file"
                          className="sr-only"
                          accept="video/*"
                          onChange={(e) => setVideoUrl(e.target.files[0])}
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-500">MP4, WebM up to 500MB</p>
                  </div>
                </div>
                {videoUrl && (
                  <p className="mt-2 text-sm text-green-600">
                    {videoUrl.name} selected
                  </p>
                )}
              </div>

              {/* Preview Toggle */}
              <div className="flex items-center">
                <div className="flex items-center h-5">
                  <input
                    id="preview-free"
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    checked={isPreviewFree}
                    onChange={() => setIsPreviewFree(prev => !prev)}
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="preview-free" className="font-medium text-gray-700">
                    Make this a free preview
                  </label>
                  <p className="text-gray-500">Students can watch this lecture without enrolling</p>
                </div>
              </div>

              {/* Loading State */}
              {loading && (
                <div className="p-3 bg-blue-50 text-blue-700 text-sm rounded-md flex items-center gap-2">
                  <ClipLoader size={16} color="#1e40af" />
                  <span>Uploading video... Please wait.</span>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex items-center justify-end space-x-3 pt-4 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => navigate(`/createlecture/${courseId}`)}
                  className="px-5 py-2.5 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading || !lectureTitle}
                  className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center min-w-[140px] transition-all duration-200"
                >
                  {loading ? (
                    <ClipLoader size={18} color="#ffffff" className="mr-2" />
                  ) : null}
                  Update Lecture
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditLecture
