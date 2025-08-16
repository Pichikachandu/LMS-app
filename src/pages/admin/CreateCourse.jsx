import axios from "axios";
import React, { useState } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { serverUrl } from "../../App";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";
const CreateCourse = () => {
    let navigate = useNavigate()
    let [loading,setLoading]=useState(false)
    const [title,setTitle] = useState("")
    const [category,setCategory] = useState("")

    const CreateCourseHandler = async () => {
        setLoading(true)
        try {
            const result = await axios.post(serverUrl + "/api/course/create" , {title , category} , {withCredentials:true})
            console.log(result.data)
            toast.success("Course Created")
            navigate("/courses")
            setTitle("")
            setLoading(false)
        } catch (error) {
            console.log(error)
            setLoading(false)
            toast.error(error.response.data.message)
        }
        
    }

    return (
        
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 px-4 py-10">
            <div className="max-w-2xl w-full mx-auto">
                {/* Header Section */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-8">
                    <div className="bg-gradient-to-r from-blue-600 to-indigo-600 h-2 w-full"></div>
                    <div className="p-6">
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                            <div className="flex items-center gap-3">
                                <button 
                                    onClick={()=>navigate("/courses")}
                                    className="p-2 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                                    aria-label="Back to courses"
                                >
                                    <FaArrowLeftLong className="w-5 h-5 text-gray-600" />
                                </button>
                                <div>
                                    <h1 className="text-2xl font-bold text-gray-900">Create New Course</h1>
                                    <p className="text-sm text-gray-500">Fill in the course details below</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                {/* Form Card */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="p-6">

                <form className="space-y-5" onSubmit={(e)=>e.preventDefault()}>
                    {/* Course Title */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Course Title
                        </label>
                        <input
                            type="text"
                            placeholder="Enter course title"
                            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                            onChange={(e)=>setTitle(e.target.value)} 
                            value={title}
                        />
                    </div>

                    {/* Category */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Category
                        </label>
                        <div className="relative">
                            <select
                                className="w-full border border-gray-300 rounded-lg pl-4 pr-10 py-3 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 appearance-none"
                                onChange={(e)=>setCategory(e.target.value)}
                            >
                            <option value="">Select category</option>
                            <option value="App Development">App Development</option>
                             <option value="AI/ML">AI/ML</option>
                            <option value="AI Tools">AI Tools
                            </option>
                             <option value="Data Science">Data Science</option>
                            <option value="Data Analytics">Data Analytics</option>
                            <option value="Ethical Hacking">Ethical Hacking</option>
                            <option value="UI UX Designing">UI UX Designing</option>
                            <option value="Web Development">Web Development</option>
                            <option value="Others">Others</option>
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400">
                                <svg className="h-5 w-5 transition-transform duration-200" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 011.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    {/* Submit Button */}
                        <button
                            type="submit"
                            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-4 rounded-lg font-medium shadow-md hover:shadow-lg transform transition-all duration-200 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed"
                            disabled={loading || !title || !category}
                            onClick={CreateCourseHandler}
                        >
                            {loading ? (
                                <div className="flex items-center justify-center">
                                    <ClipLoader size={20} color="#ffffff" className="mr-2" />
                                    Creating...
                                </div>
                            ) : 'Create Course'}
                        </button>
                    </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateCourse;
