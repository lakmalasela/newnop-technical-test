# Issue Tracker Application

A full-stack issue tracking system with role-based access control, built with NestJS backend and React frontend.

## 🚀 Features

### Core Functionality
- **User Authentication**: Secure JWT-based login/registration system
- **Issue Management**: Create, track, and manage issues with status updates
- **Role-Based Access Control**: Admin and user roles with different permissions
- **Admin Dashboard**: Admin-only access to user management and system controls
- **Real-time Updates**: Live status tracking for issues

### Technical Features
- **RESTful API**: Well-documented backend endpoints
- **Responsive Design**: Mobile-friendly interface
- **Form Validation**: Client and server-side validation
- **Error Handling**: Comprehensive error management
- **Security**: Password hashing, JWT tokens, and input sanitization

## 🏗️ Architecture

### Backend (NestJS)
- **Framework**: NestJS with TypeScript
- **Database**: MySQL with TypeORM
- **Authentication**: JWT with Passport
- **Validation**: class-validator and class-transformer
- **Security**: bcrypt for password hashing

### Frontend (React)
- **Framework**: React 19.2.0 with Vite
- **Routing**: React Router DOM
- **Styling**: Bootstrap 5.3.8
- **Forms**: Formik with Yup validation
- **HTTP Client**: Axios
- **Icons**: Font Awesome
- **Notifications**: SweetAlert2

## 📁 Project Structure

```
Issue-tracker/
├── issue-tracker-backend/     # NestJS backend application
│   ├── src/
│   │   ├── auth/             # Authentication module
│   │   ├── users/            # User management
│   │   ├── issues/           # Issue tracking
│   │   └── common/           # Shared utilities
│   ├── .env.example          # Environment variables template
│   └── package.json
├── issue-tracker-client/     # React frontend application
│   └── react-frontend/
│       ├── src/
│       │   ├── api/          # API service layer
│       │   ├── components/   # Reusable components
│       │   ├── pages/        # Page components
│       │   ├── context/      # React context
│       │   └── common/       # Common utilities
│       └── package.json
├── BACKEND_DOCUMENTATION.md  # Detailed backend docs
├── FRONTEND_DOCUMENTATION.md # Detailed frontend docs
└── README.md                 # This file
```

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v18 or higher)
- MySQL database
- npm or yarn

### 1. Backend Setup

```bash
cd issue-tracker-backend

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your database credentials

# Run database migrations (auto-sync enabled)
npm run start:dev
```

### 2. Frontend Setup

```bash
cd issue-tracker-client/react-frontend

# Install dependencies
npm install

# Set up environment variables
echo "VITE_API_BASE_URL=http://localhost:3000" > .env

# Start development server
npm run dev
```

### 3. Database Setup

Create a MySQL database:
```sql
CREATE DATABASE issue_tracker;
```

The application will automatically create tables on first run.

## 🚀 Running the Application

### Development Mode

**Backend:**
```bash
cd issue-tracker-backend
npm run start:dev
```
Server runs on `http://localhost:3000`

**Frontend:**
```bash
cd issue-tracker-client/react-frontend
npm run dev
```
Application runs on `http://localhost:5173`

### Production Mode

**Backend:**
```bash
cd issue-tracker-backend
npm run build
npm run start:prod
```

**Frontend:**
```bash
cd issue-tracker-client/react-frontend
npm run build
npm run preview
```

## 📚 API Documentation

### Authentication Endpoints
- `POST /auth/register` - Register new user
- `POST /auth/login` - User login

### User Endpoint
- `GET /users` - Get all users (Admin only)


### Issue Endpoints
- `GET /issues` - Get all issues
- `GET /issues/:id` - Get issue by ID
- `POST /issues` - Create new issue
- `PUT /issues/:id` - Update issue

## 🔐 Authentication & Authorization

### User Roles
- **User**: Can view/create/update their own issues
- **Admin**: Full access to all resources and user management

### JWT Authentication
- Tokens are required for protected routes
- Include token in `Authorization: Bearer <token>` header
- Default token expiration: 24 hours

## 🎯 Key Features in Detail

### Issue Management
- **Create Issues**: Title, description, priority, and assignment
- **Status Tracking**: Open, In Progress, Resolved, Closed
- **Priority Levels**: Low, Medium, High
- **User Assignment**: Assign issues to specific users

### Admin Features
- **User Management**: View all system users
- **Full Issue Control**: Create, update, delete any issue
- **System Administration**: Complete access to all resources


### Backend Tests
```bash
cd issue-tracker-backend

# Run unit tests
npm run test

# Run test coverage
npm run test:cov

# Run E2E tests
npm run test:e2e
```

### Frontend Tests
```bash
cd issue-tracker-client/react-frontend

# Run linting
npm run lint
```

##  Configuration

### Environment Variables

**Backend (.env):**
```env
# Database
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=your_username
DB_PASSWORD=your_password
DB_NAME=issue_tracker

# Application
PORT=3000

# JWT
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRES_IN=24h
```

**Frontend (.env):**
```env
VITE_API_BASE_URL=http://localhost:3000
```

##  Documentation

- **[Backend Documentation](./BACKEND_DOCUMENTATION.md)** - Detailed API and setup guide
- **[Frontend Documentation](./FRONTEND_DOCUMENTATION.md)** - Component and feature guide

##  Troubleshooting

### Common Issues

**CORS Errors:**
- Ensure backend allows frontend origin
- Check API base URL configuration

**Database Connection:**
- Verify MySQL is running
- Check database credentials in .env
- Ensure database exists

**Authentication Issues:**
- Clear browser localStorage
- Check JWT token expiration
- Verify API headers

**Build Errors:**
- Delete node_modules and reinstall
- Clear npm cache: `npm cache clean --force`
- Check Node.js version compatibility
---

