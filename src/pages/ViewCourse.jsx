import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { serverUrl } from '../App';
import { FaArrowLeftLong } from "react-icons/fa6";
import img from "../assets/empty.jpg"
import Card from "../components/Card.jsx"
import { setSelectedCourseData } from '../redux/courseSlice';
import { FaLock, FaPlayCircle } from "react-icons/fa";
import { toast } from 'react-toastify';
import { FaStar } from "react-icons/fa6";


function ViewCourse() {

      const { courseId } = useParams();
      const navigate = useNavigate()
    const {courseData} = useSelector(state=>state.course)
    const {userData} = useSelector(state=>state.user)
    const [creatorData , setCreatorData] = useState(null)
    const dispatch = useDispatch()
    const [selectedLecture, setSelectedLecture] = useState(null);
    const {lectureData} = useSelector(state=>state.lecture)
    const {selectedCourseData} = useSelector(state=>state.course)
  const [selectedCreatorCourse,setSelectedCreatorCourse] = useState([])
   const [isEnrolled, setIsEnrolled] = useState(false);
   const [rating, setRating] = useState(0);
   const [comment, setComment] = useState("");
   
   
  


  const handleReview = async () => {
    try {
      const result = await axios.post(serverUrl + "/api/review/givereview" , {rating , comment , courseId} , {withCredentials:true})
      toast.success("Review Added")
      console.log(result.data)
      setRating(0)
      setComment("")

    } catch (error) {
      console.log(error)
      toast.error(error.response.data.message)
    }
  }
  

  const calculateAverageRating = (reviews) => {
  if (!reviews || reviews.length === 0) return 0;

  const total = reviews.reduce((sum, review) => sum + review.rating, 0);
  return (total / reviews.length).toFixed(1); // rounded to 1 decimal
};

// Usage:
const avgRating = calculateAverageRating(selectedCourseData?.reviews);
console.log("Average Rating:", avgRating);

  

  const fetchCourseData = async () => {
    courseData.map((item) => {
      if (item._id === courseId) {
      dispatch(setSelectedCourseData(item))
        console.log(selectedCourseData)
      

        return null;
      }

    })

  }
    const checkEnrollment = () => {
  const verify = userData?.enrolledCourses?.some(c => {
    const enrolledId = typeof c === 'string' ? c : c._id;
    return enrolledId?.toString() === courseId?.toString();
  });

  console.log("Enrollment verified:", verify);
  if (verify) {
    setIsEnrolled(true);
  }
};
  useEffect(() => {
    fetchCourseData()
    checkEnrollment()
  }, [courseId,courseData,lectureData])


    // Fetch creator info once course data is available
  useEffect(() => {
    const getCreator = async () => {
      if (selectedCourseData?.creator) {
        try {
          const result = await axios.post(
            `${serverUrl}/api/course/getcreator`,
            { userId: selectedCourseData.creator },
            { withCredentials: true }
          );
          setCreatorData(result.data);
          console.log(result.data)
        } catch (error) {
          console.error("Error fetching creator:", error);
        }
      }
    };

    getCreator();

    
  }, [selectedCourseData]);


   


  useEffect(() => {
  if (creatorData?._id && courseData.length > 0) {
    const creatorCourses = courseData.filter(
      (course) =>
        course.creator === creatorData._id && course._id !== courseId // Exclude current course
    );
    setSelectedCreatorCourse(creatorCourses);
  
  }
}, [creatorData, courseData]);

 
const handleEnroll = async (courseId, userId) => {
  try {
    // For free courses, directly enroll the user
    const enrollRes = await axios.post(serverUrl + "/api/payment/enroll", {
      courseId,
      userId
    }, { withCredentials: true });
    
    if (enrollRes.data.success) {
      setIsEnrolled(true);
      toast.success("Successfully enrolled in the course!");
    } else {
      toast.error(enrollRes.data.message || "Failed to enroll in the course");
    }
  } catch (err) {
    toast.error("Something went wrong while enrolling.");
    console.error("Enroll Error:", err);
  }
};

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-4 md:p-6">
      <div className="max-w-6xl mx-auto bg-white/90 backdrop-blur-sm shadow-xl rounded-2xl p-6 space-y-8 relative border border-gray-100">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row gap-6">
          {/* Thumbnail */}
          <div className="w-full md:w-1/2">
            <FaArrowLeftLong className='text-[black] w-[22px] h-[22px] cursor-pointer' onClick={() => navigate("/")} />
            {selectedCourseData?.thumbnail ? (
              <img
                src={selectedCourseData?.thumbnail}
                alt="Course Thumbnail"
                className="rounded-xl w-full object-cover"
              />
            ) : (
              <img
                src={img}
                alt="Course Thumbnail"
                className="rounded-xl w-full object-cover"
              />
            )}
          </div>

          {/* Course Info */}
          <div className="flex-1 space-y-2 mt-[20px]">
            <h1 className="text-2xl font-bold">{selectedCourseData?.title}</h1>
            <p className="text-gray-600">{selectedCourseData?.subTitle}</p>

            {/* Rating & Price */}
            <div className="flex items-start flex-col justify-between">
              <div className="flex items-center gap-4">
                <div className="flex items-center bg-yellow-50 px-3 py-1 rounded-full">
                  <span className="text-yellow-500 font-bold text-lg">★</span>
                  <span className="ml-1 font-semibold text-yellow-700">{avgRating}</span>
                  <span className="ml-2 text-sm text-gray-500">(1,200 reviews)</span>
                </div>
                <div className="bg-green-50 px-3 py-1 rounded-full">
                  <span className="text-lg font-bold text-green-700">{selectedCourseData?.price}</span>
                  <span className="line-through text-sm text-gray-400 ml-1">₹599</span>
                </div>
              </div>
            </div>

            {/* Highlights */}
            <div className="bg-blue-50 p-4 rounded-xl mt-4 border border-blue-100">
              <h3 className="text-blue-800 font-semibold mb-2 flex items-center">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                What's included:
              </h3>
              <ul className="text-blue-900 space-y-2">
                <li className="flex items-center">
                  <span className="bg-blue-100 p-1 rounded-full mr-2">
                    <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </span>
                  10+ hours of video content
                </li>
                <li className="flex items-center">
                  <span className="bg-blue-100 p-1 rounded-full mr-2">
                    <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </span>
                  Lifetime access to materials
                </li>
                <li className="flex items-center">
                  <span className="bg-blue-100 p-1 rounded-full mr-2">
                    <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </span>
                  Certificate of completion
                </li>
              </ul>
            </div>

            {/* Enroll Button */}
            {!isEnrolled ? (
              <button
                className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-3 rounded-xl hover:shadow-lg hover:shadow-indigo-100 hover:-translate-y-0.5 transition-all duration-200 font-medium text-lg mt-4 w-full md:w-auto"
                onClick={() => handleEnroll(courseId, userData._id)}
              >
                Enroll Now
              </button>
            ) : (
              <button
                className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-8 py-3 rounded-xl hover:shadow-lg hover:shadow-green-100 hover:-translate-y-0.5 transition-all duration-200 font-medium text-lg mt-4 w-full md:w-auto"
                onClick={() => navigate(`/viewlecture/${courseId}`)}
              >
                Continue Learning
              </button>
            )}
          </div>
        </div>

        {/* What You'll Learn */}
        <div>
          <h2 className="text-xl font-semibold mb-2">What You'll Learn</h2>
          <ul className="list-disc pl-6 text-gray-700 space-y-1">
            <li>Learn {selectedCourseData?.category} from Beginning</li>
          </ul>
        </div>

        {/* Requirements */}
        <div>
          <h2 className="text-xl font-semibold mb-2">Requirements</h2>
          <p className="text-gray-700">Basic programming knowledge is helpful but not required.</p>
        </div>

        {/* Who This Course Is For */}
        <div>
          <h2 className="text-xl font-semibold mb-2">Who This Course is For</h2>
          <p className="text-gray-700">
            Beginners, aspiring developers, and professionals looking to upgrade skills.
          </p>
        </div>

        {/* Course Lecture Section */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left Side - Curriculum */}
          <div className="bg-white w-full lg:w-2/5 p-6 rounded-2xl shadow-md border border-gray-100">
            <h2 className="text-xl font-bold mb-1 text-gray-800">Course Curriculum</h2>
            <p className="text-sm text-gray-500 mb-4">{selectedCourseData?.lectures?.length} Lectures</p>

            <div className="flex flex-col gap-3">
              {selectedCourseData?.lectures?.map((lecture, index) => (
                <button
                  key={index}
                  disabled={!lecture.isPreviewFree}
                  onClick={() => {
                    if (lecture.isPreviewFree) {
                      setSelectedLecture(lecture);
                    }
                  }}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg border transition-all duration-200 text-left ${
                    lecture.isPreviewFree
                      ? "hover:bg-gray-100 cursor-pointer border-gray-300"
                      : "cursor-not-allowed opacity-60 border-gray-200"
                  } ${
                    selectedLecture?.lectureTitle === lecture.lectureTitle
                      ? "bg-gray-100 border-gray-400"
                      : ""
                  }`}
                >
                  <span className="text-lg text-gray-700">
                    {lecture.isPreviewFree ? <FaPlayCircle /> : <FaLock />}
                  </span>
                  <span className="text-sm font-medium text-gray-800">
                    {lecture.lectureTitle}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Right Side - Video + Info */}
          <div className="bg-white w-full lg:w-3/5 p-6 rounded-2xl shadow-md border border-gray-100">
            <div className="aspect-video w-full rounded-lg overflow-hidden mb-4 bg-black flex items-center justify-center">
              {selectedLecture?.videoUrl ? (
                <video
                  src={selectedLecture.videoUrl}
                  controls
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-white text-sm">Select a preview lecture to watch</span>
              )}
            </div>

            <h3 className="text-lg font-semibold text-gray-900 mb-1">
              {selectedLecture?.lectureTitle || "Lecture Title"}
            </h3>
            <p className="text-gray-600 text-sm">
              {selectedCourseData?.title}
            </p>
          </div>
        </div>

        {/* Review Section */}
        <div className="mt-8 border-t border-gray-100 pt-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Share Your Experience</h2>
          <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">Rate this course</h3>
            <div className="flex items-center gap-2 mb-4">
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => setRating(star)}
                    className={`text-2xl transition-transform hover:scale-110 focus:outline-none ${
                      star <= rating ? "text-yellow-400" : "text-gray-300"
                    }`}
                  >
                    {star <= rating ? '★' : '☆'}
                  </button>
                ))}
              </div>
              <span className="ml-2 text-sm text-gray-500">
                {rating > 0 ? `${rating} ${rating === 1 ? 'star' : 'stars'}` : 'Rate this course'}
              </span>
            </div>
            <div className="space-y-3">
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Share your experience with this course..."
                className="w-full border border-gray-200 rounded-xl p-4 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                rows="4"
              />
              <button
                className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-xl hover:shadow-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={handleReview}
                disabled={!rating || !comment.trim()}
              >
                Submit Review
              </button>
            </div>
          </div>
        </div>

        {/* Instructor Info */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mt-8">
          <h3 className="text-xl font-bold text-gray-800 mb-4">About the Instructor</h3>
          <div className="flex items-start gap-4">
            {creatorData?.photoUrl ? (
              <img
                src={creatorData?.photoUrl}
                alt="Instructor"
                className="w-16 h-16 rounded-full object-cover"
              />
            ) : (
              <img
                src={img}
                alt="Instructor"
                className="w-16 h-16 rounded-full object-cover"
              />
            )}
            <div>
              <h3 className="text-lg font-bold text-gray-800">{creatorData?.name}</h3>
              <p className="text-gray-600 mt-1">{creatorData?.description}</p>
              <p className="text-blue-600 text-sm mt-1">{creatorData?.email}</p>
              <div className="flex items-center gap-2 mt-2">
                <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">Instructor</span>
                <span className="text-gray-500 text-sm">• 5+ courses</span>
              </div>
            </div>
          </div>

          {/* Instructor's Other Courses */}
          <div className="mt-10">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">
              More from {creatorData?.name?.split(' ')[0] || 'this instructor'}
            </h3>
            <div className='w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
              {selectedCreatorCourse?.map((item, index) => (
                <Card 
                  key={index} 
                  thumbnail={item.thumbnail} 
                  title={item.title} 
                  id={item._id} 
                  price={item.price} 
                  category={item.category}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewCourse;
