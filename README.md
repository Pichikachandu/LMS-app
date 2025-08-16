# LMS Backend

This is the backend service for the Learning Management System (LMS) built with Node.js, Express, and MongoDB.

## Features

- User authentication (JWT)
- Course management
- User management
- File uploads
- Email notifications
- RESTful API endpoints

## Prerequisites

- Node.js (v14 or higher)
- MongoDB Atlas account or local MongoDB instance
- npm or yarn

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Pichikachandu/LMS-app.git
   cd LMS-app
   git checkout backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory with the following variables:
   ```env
   NODE_ENV=development
   PORT=5000
   JWT_SECRET=your_jwt_secret
   MONGODB_URL=your_mongodb_connection_string
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_MAIL=your_email@gmail.com
   SMTP_PASSWORD=your_email_app_password
   FRONTEND_URL=http://localhost:3000
   ```

## Running the Server

### Development
```bash
npm run dev
```

### Production
```bash
npm start
```

## API Documentation

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user profile

### Courses
- `GET /api/courses` - Get all courses
- `POST /api/courses` - Create a new course
- `GET /api/courses/:id` - Get course by ID
- `PUT /api/courses/:id` - Update course
- `DELETE /api/courses/:id` - Delete course

### Users
- `GET /api/users` - Get all users (admin only)
- `GET /api/users/:id` - Get user by ID
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| PORT | Server port | 5000 |
| NODE_ENV | Environment | development |
| JWT_SECRET | JWT secret key | - |
| MONGODB_URL | MongoDB connection string | - |
| SMTP_HOST | SMTP server host | - |
| SMTP_PORT | SMTP server port | 587 |
| SMTP_MAIL | Email address for sending emails | - |
| SMTP_PASSWORD | Email password/App password | - |
| FRONTEND_URL | Frontend URL for CORS | http://localhost:3000 |

## Deployment

### Vercel
1. Push your code to the `backend` branch
2. Import the repository to Vercel
3. Set the root directory to `backend`
4. Add environment variables
5. Deploy

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
