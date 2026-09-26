# Job Portal API

A backend REST API for a Job Portal system developed using Node.js, Express.js, MongoDB, and JWT authentication.

The system provides different functionalities for Job Seekers, Employers, and Admins. Job Seekers can browse and apply for jobs, Employers can create and manage jobs and applications, and Admins can manage users and jobs.

## Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT (JSON Web Token)
- bcrypt
- Cookie Parser
- dotenv
- Postman

## Features

### Job Seeker

- Register and login
- View and update profile
- Add skills, experience, and education
- Browse available jobs
- View job details
- Apply for jobs
- Prevent duplicate applications
- View submitted applications
- View application status
- Logout

### Employer

- Register and login
- Create job postings
- View own job postings
- Update own jobs
- Delete own jobs
- View applications received for jobs
- Update application status
- Logout

### Admin

- View all users
- View a user by ID
- Update user information
- Delete users
- View all jobs
- Delete jobs
- Admin-only access using role-based authorization

## User Roles

The system supports three roles:

1. `jobseeker`
2. `employer`
3. `admin`

Public registration is available for Job Seekers and Employers. Admin access is restricted to existing admin accounts.

## Project Structure

```text
job-portal-api/
│
├── controllers/
│   ├── adminController.js
│   ├── authController.js
│   ├── jobController.js
│   └── profileController.js
│
├── middleware/
│   ├── authMiddleware.js
│   └── roleMiddleware.js
│
├── models/
│   ├── Application.js
│   ├── Job.js
│   └── User.js
│
├── routes/
│   ├── adminRoutes.js
│   ├── authRoutes.js
│   ├── jobRoutes.js
│   └── profileRoutes.js
│
├── .gitignore
├── package.json
├── package-lock.json
├── README.md
└── server.js
