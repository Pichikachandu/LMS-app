import Course from "../models/courseModel.js";
import User from "../models/userModel.js";

export const enrollInCourse = async (req, res) => {
  try {
    const { courseId, userId } = req.body;

    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ message: "Course not found" });

    // Allow courses with price >= 0
    if (course.price < 0) {
      return res.status(400).json({ 
        success: false,
        message: "Invalid course price" 
      });
    }

    // Update user and course enrollment
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });
    
    if (!user.enrolledCourses.includes(courseId)) {
      user.enrolledCourses.push(courseId);
      await user.save();
    }

    if (!course.enrolledStudents.includes(userId)) {
      course.enrolledStudents.push(userId);
      await course.save();
    }

    return res.status(200).json({ 
      success: true, 
      message: "Successfully enrolled in the course" 
    });
  } catch (err) {
    console.error('Error in enrollInCourse:', err);
    return res.status(500).json({ 
      success: false,
      message: `Enrollment failed: ${err.message}` 
    });
  }
};

// Export verifyPayment as an empty function to maintain compatibility with existing routes
export const verifyPayment = async (req, res) => {
  return res.status(400).json({ 
    success: false,
    message: "Payment processing is not available" 
  });
};
