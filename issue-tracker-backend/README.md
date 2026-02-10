# Issue Tracker Backend API

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

A comprehensive **NestJS-based backend API** built on **Express.js** for issue tracking with JWT authentication and role-based access control (RBAC).

##  Features

- **Express.js-powered REST API** using NestJS framework
- **JWT Authentication** with secure token-based auth
- **Role-Based Access Control** (User/Admin roles)
- **Issue Management** - Create, update, track, and resolve issues
- **User Management** with admin-only access controls
- **MySQL Database** with TypeORM integration
- **Input Validation** and error handling
- **CORS Support** for frontend integration

##  Tech Stack

- **Framework**: NestJS (built on Express.js)
- **Database**: MySQL with TypeORM
- **Authentication**: JWT with Passport
- **Password Hashing**: bcrypt
- **Validation**: class-validator and class-transformer
- **Configuration**: @nestjs/config
- **Language**: TypeScript

##  Project Structure

```
src/
├── app.module.ts          # Main application module
├── app.controller.ts      # Root controller
├── app.service.ts         # Root service
├── main.ts               # Express.js application entry point
├── auth/                 # Authentication module
│   ├── auth.controller.ts
│   ├── auth.module.ts
│   ├── auth.service.ts
│   ├── dto/
│   └── strategies/
├── users/                # User management module
│   ├── users.controller.ts
│   ├── users.module.ts
│   ├── users.service.ts
│   └── entities/
├── issues/               # Issue tracking module
│   ├── issues.controller.ts
│   ├── issues.module.ts
│   ├── issues.service.ts
│   ├── dto/
│   └── entities/
├── common/               # Common utilities
│   ├── guards/
│   └── response/
└── decorator/            # Custom decorators
```

##  Environment Setup

### Prerequisites
- Node.js (v18 or higher)
- MySQL database
- npm or yarn

### Environment Variables

Create a `.env` file in the root directory:

```env
# Database Configuration
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=your_username
DB_PASSWORD=your_password
DB_NAME=issue_tracker

# Application Configuration
PORT=3000

# JWT Configuration
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRES_IN=24h
```

### Database Setup

1. Create MySQL database:
```sql
CREATE DATABASE issue_tracker;
```

2. The application will automatically create tables using TypeORM synchronization.

##  Installation & Running

### Install Dependencies
```bash
npm install
```

### Development Mode
```bash
npm run start:dev
```

### Production Mode
```bash
npm run build
npm run start:prod
```

##  API Endpoints

### Authentication

#### POST /auth/register
Register a new user account.

**Request Body:**
```json
{
  "username": "string",
  "email": "string",
  "password": "string",
  "role": "user" | "admin"
}
```

#### POST /auth/login
Authenticate user and return JWT token.

**Request Body:**
```json
{
  "username": "string",
  "password": "string"
}
```

**Response:**
```json
{
  "access_token": "jwt_token_here",
  "user": {
    "id": "number",
    "username": "string",
    "email": "string",
    "role": "string"
  }
}
```

### Users

#### GET /users/profile
Get current user profile (authenticated user).

**Headers:** `Authorization: Bearer <token>`

#### GET /users
Get all users (Admin only).

**Headers:** `Authorization: Bearer <token>`

#### PUT /users/:id
Update user (Admin only or own profile).

#### DELETE /users/:id
Delete user (Admin only).

### Issues - Core Feature

#### POST /issues
**Create new issue** (authenticated users).

**Request Body:**
```json
{
  "title": "string",
  "description": "string",
  "priority": "low" | "medium" | "high"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Issue Created",
  "data": {
    "id": "number",
    "title": "string",
    "description": "string",
    "priority": "string",
    "status": "open",
    "createdBy": {
      "id": "number",
      "username": "string"
    },
    "createdAt": "datetime"
  }
}
```

#### GET /issues
Get all issues with pagination and search (authenticated users).

**Query Parameters:**
- `search` (optional): Search by title or description
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 10)

**Headers:** `Authorization: Bearer <token>`

#### GET /issues/:id
Get issue by ID.

#### PUT /issues/:id
Update issue (Admin or assigned user).

#### PATCH /issues/:id/status
Mark issue as resolved or closed.

**Request Body:**
```json
{
  "status": "resolved" | "closed"
}
```

#### DELETE /issues/:id
Delete issue (Admin only).

##  Authentication & Security

### JWT Authentication
- Users receive JWT tokens upon login
- Tokens must be included in `Authorization: Bearer <token>` header
- Tokens expire based on `JWT_EXPIRES_IN` configuration

### Role-Based Access Control (RBAC)
- **User**: Can view/create/update their own issues
- **Admin**: Full access to all resources including user management

### Security Features
- Password hashing with bcrypt
- JWT token authentication
- Role-based access control
- Input validation and sanitization
- CORS configuration for frontend integration

## 🧪 Testing

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

##  Data Models

### User Entity
```typescript
{
  id: number;
  username: string;
  email: string;
  password: string; // hashed
  role: 'user' | 'admin';
  createdAt: Date;
  updatedAt: Date;
}
```

### Issue Entity
```typescript
{
  id: number;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  status: 'open' | 'in_progress' | 'resolved' | 'closed';
  createdBy: User;
  assignedUser: User;
  createdAt: Date;
  updatedAt: Date;
}
```

## 🔧 Error Handling

The API returns standard HTTP status codes with consistent error responses:

- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Internal Server Error

**Error Response Format:**
```json
{
  "success": false,
  "message": "Error description",
  "data": null
}
```


### Production Considerations
- Use different `.env` files for development, staging, and production
- Configure database connections appropriately
- Set proper JWT secrets for each environment
- Disable database synchronization in production
- Implement proper logging and monitoring

##  CORS Configuration

The Express.js server is configured with CORS support for frontend integration:

```typescript
app.enableCors({
  origin: ['http://localhost:3000', 'http://localhost:3001', 'http://localhost:5173'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
});
```

### Code Style
- ESLint for linting
- Prettier for code formatting
- TypeScript for type safety

### Recommended Improvements
1. Add email verification for registration
2. Implement password reset functionality
3. Add rate limiting
4. Implement audit logging
5. Add API documentation with Swagger
6. Set up proper database migrations
7. Add comprehensive error logging
8. Implement caching for frequently accessed data


## 🔗 Additional Resources

- [NestJS Documentation](https://docs.nestjs.com)
- [Express.js Documentation](https://expressjs.com/)
- [TypeORM Documentation](https://typeorm.io/)
- [JWT Authentication Guide](https://jwt.io/)
