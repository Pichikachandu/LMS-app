# Learning Management System (LMS) - Frontend

A modern, responsive Learning Management System built with React.js, Redux, and Tailwind CSS. This platform provides an interactive learning experience with features like course management, video lectures, user authentication, and more.

## 🚀 Features

- **User Authentication**
  - Secure login/signup with JWT
  - Password reset functionality
  - Google OAuth integration
  - Role-based access control (Admin/Instructor/Student)

- **Course Management**
  - Browse and search courses
  - Course categories and filtering
  - Course enrollment and progress tracking
  - Lecture video player with progress tracking

- **Admin Dashboard**
  - User management
  - Course creation and management
  - Lecture management
  - Analytics and reporting

- **Interactive Learning**
  - Video player with playback controls
  - Course notes and bookmarks
  - Lecture comments and discussions
  - Progress tracking

## 🛠 Tech Stack

- **Frontend Framework**: React.js
- **State Management**: Redux Toolkit
- **Styling**: Tailwind CSS
- **Routing**: React Router
- **Form Handling**: React Hook Form
- **Icons**: React Icons
- **Animation**: Framer Motion
- **HTTP Client**: Axios
- **Build Tool**: Vite

## 📦 Prerequisites

- Node.js (v14 or later)
- npm or yarn
- Backend API server (see backend repository for setup)

## 🚀 Getting Started

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd LMS/frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn
   ```

3. Create a `.env` file in the root directory and add your environment variables:
   ```
   VITE_SERVER_URL=http://localhost:5000
   VITE_GOOGLE_CLIENT_ID=your-google-client-id
   ```

4. Start the development server
   ```bash
   npm run dev
   # or
   yarn dev
   ```

## 📦 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🌐 API Integration

The frontend communicates with a RESTful API. Ensure the backend server is running and properly configured with the following endpoints:

- Authentication: `/api/auth/*`
- User Management: `/api/users/*`
- Course Management: `/api/courses/*`
- Lecture Management: `/api/lectures/*`

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [React](https://reactjs.org/) - A JavaScript library for building user interfaces
- [Tailwind CSS](https://tailwindcss.com/) - A utility-first CSS framework
- [Vite](https://vitejs.dev/) - Next Generation Frontend Tooling
- [Framer Motion](https://www.framer.com/motion/) - Production-ready animation library for React
