import React, { useEffect, useState } from 'react';
import Card from "../components/Card.jsx";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import Nav from '../components/Nav';
import { useSelector } from 'react-redux';
function AllCourses() {
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const navigate = useNavigate()
 const [category,setCategory] = useState([])
 const [filterCourses,setFilterCourses] = useState([])
  const {courseData} = useSelector(state=>state.course)

 
  
  const toggleCategory = (e) =>{
     if(category.includes(e.target.value)){
       setCategory(prev=> prev.filter(item => item !== e.target.value))
     }else{
      setCategory(prev => [...prev,e.target.value])
     }
  }

  const applyFilter = () =>{
    let courseCopy = courseData.slice();

    if(category.length > 0){
      courseCopy = courseCopy.filter(item => category.includes(item.category))
    }
   
    setFilterCourses(courseCopy)

  }

   useEffect(()=>{
setFilterCourses(courseData)
  },[courseData])

  useEffect(() => {
    applyFilter()
  }, [category])

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Nav />
      {/* Mobile Filter Button */}
      <button
        onClick={() => setIsSidebarVisible(!isSidebarVisible)}
        className="md:hidden fixed bottom-6 right-6 z-50 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-colors"
      >
        {isSidebarVisible ? 'Hide' : 'Show'} Filters
      </button>

      {/* Sidebar */}
      <aside className={`w-[260px] h-screen overflow-y-auto bg-gray-900 fixed top-0 left-0 p-6 py-[130px] border-r border-gray-700 shadow-lg transition-transform duration-300 z-10
        ${isSidebarVisible ? 'translate-x-0' : '-translate-x-full'}
        md:block md:translate-x-0`}>
        <h2 className="text-xl font-bold flex items-center gap-3 text-white mb-6">
          <FaArrowLeftLong className='text-white cursor-pointer hover:text-blue-400 transition-colors' onClick={() => navigate("/")}/>Filter by Category
        </h2>

        <form className="space-y-4 text-sm bg-gray-800 border border-gray-700 text-gray-200 p-5 rounded-xl shadow-sm" onSubmit={(e) => e.preventDefault()}>
          <label className="flex items-center gap-3 cursor-pointer hover:text-white transition-colors">
            <input type="checkbox" className="form-checkbox h-4 w-4 text-blue-600 rounded border-gray-600 bg-gray-700 focus:ring-blue-500" value={'App Development'} onChange={toggleCategory} />
            <span>App Development</span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer hover:text-white transition-colors">
            <input type="checkbox" className="form-checkbox h-4 w-4 text-blue-600 rounded border-gray-600 bg-gray-700 focus:ring-blue-500" value={'AI/ML'} onChange={toggleCategory} />
            <span>AI/ML</span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer hover:text-white transition-colors">
            <input type="checkbox" className="form-checkbox h-4 w-4 text-blue-600 rounded border-gray-600 bg-gray-700 focus:ring-blue-500" value={'AI Tools'} onChange={toggleCategory} />
            <span>AI Tools</span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer hover:text-white transition-colors">
            <input type="checkbox" className="form-checkbox h-4 w-4 text-blue-600 rounded border-gray-600 bg-gray-700 focus:ring-blue-500" value={'Data Science'} onChange={toggleCategory} />
            <span>Data Science</span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer hover:text-white transition-colors">
            <input type="checkbox" className="form-checkbox h-4 w-4 text-blue-600 rounded border-gray-600 bg-gray-700 focus:ring-blue-500" value={'Data Analytics'} onChange={toggleCategory} />
            <span>Data Analytics</span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer hover:text-white transition-colors">
            <input type="checkbox" className="form-checkbox h-4 w-4 text-blue-600 rounded border-gray-600 bg-gray-700 focus:ring-blue-500" value={'Ethical Hacking'} onChange={toggleCategory} />
            <span>Ethical Hacking</span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer hover:text-white transition-colors">
            <input type="checkbox" className="form-checkbox h-4 w-4 text-blue-600 rounded border-gray-600 bg-gray-700 focus:ring-blue-500" value={'UI UX Designing'} onChange={toggleCategory} />
            <span>UI UX Designing</span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer hover:text-white transition-colors">
            <input type="checkbox" className="form-checkbox h-4 w-4 text-blue-600 rounded border-gray-600 bg-gray-700 focus:ring-blue-500" value={'Web Development'} onChange={toggleCategory} />
            <span>Web Development</span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer hover:text-white transition-colors">
            <input type="checkbox" className="form-checkbox h-4 w-4 text-blue-600 rounded border-gray-600 bg-gray-700 focus:ring-blue-500" value={'Others'} onChange={toggleCategory} />
            <span>Others</span>
          </label>
        </form>
      </aside>

      {/* Main Courses Section */}
      <main className="flex-1 p-4 md:p-6 md:ml-[260px] mt-[80px] md:mt-0 bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">All Courses</h1>
            <span className="text-sm text-gray-500">
              {filterCourses.length} {filterCourses.length === 1 ? 'course' : 'courses'} found
            </span>
          </div>

          {/* Course Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filterCourses.length > 0 ? (
              filterCourses.map((course) => (
                <div key={course._id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden border border-gray-100">
                  <div className="relative">
                    <img 
                      src={course.thumbnail} 
                      alt={course.title}
                      className="w-full h-48 object-cover"
                    />
                    <span className="absolute top-2 right-2 bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
                      {course.category}
                    </span>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-lg text-gray-800 mb-2 line-clamp-2">
                      {course.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                      {course.description}
                    </p>
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-sm font-medium text-gray-700">
                          {course.instructor?.name?.charAt(0) || 'I'}
                        </div>
                        <span className="ml-2 text-sm text-gray-600">
                          {course.instructor?.name || 'Instructor'}
                        </span>
                      </div>
                      <span className="text-sm font-medium text-blue-600">
                        {course.price === 0 ? 'Free' : `$${course.price}`}
                      </span>
                    </div>
                    <div className="mt-3 pt-3 border-t border-gray-100 flex items-center justify-between">
                      <div className="flex items-center text-sm text-gray-500">
                        <span className="flex items-center">
                          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                          </svg>
                          {course.duration || '4 weeks'}
                        </span>
                        <span className="mx-2">•</span>
                        <span className="flex items-center">
                          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0116 8V7a1 1 0 10-2 0v1a3 3 0 00-3 3v2h-1v2h1v2h2v-1a1 1 0 10-2 0v1h-1v-2z" />
                          </svg>
                          {course.students || 0} students
                        </span>
                      </div>
                      <button 
                        onClick={() => navigate(`/viewcourse/${course._id}`)}
                        className="text-sm font-medium text-blue-600 hover:text-blue-700"
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-3 text-center py-16 bg-white rounded-xl shadow-sm border border-gray-100">
                <div className="text-5xl mb-4">🔍</div>
                <h3 className="text-lg font-medium text-gray-800 mb-2">No courses found</h3>
                <p className="text-gray-500 max-w-md mx-auto">
                  We couldn't find any courses matching your filters. Try adjusting your search criteria.
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default AllCourses;
