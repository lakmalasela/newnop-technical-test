# Issue Tracker Backend Documentation

## Overview

This is a NestJS-based backend API for an issue tracking system with JWT authentication and role-based access control (RBAC). The system supports user management, issue tracking, and admin-only access to user lists.

## Tech Stack

- **Framework**: NestJS
- **Database**: MySQL with TypeORM
- **Authentication**: JWT with Passport
- **Password Hashing**: bcrypt
- **Validation**: class-validator and class-transformer
- **Configuration**: @nestjs/config

## Project Structure

```
src/
├── app.module.ts          # Main application module
├── app.controller.ts      # Root controller
├── app.service.ts         # Root service
├── main.ts               # Application entry point
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
│   └── decorators/
└── decorator/            # Custom decorators
```

## Environment Setup

### Prerequisites
- Node.js (v18 or higher)
- MySQL database
- npm or yarn

### Environment Variables

Create a `.env` file in the root directory based on `.env.example`:

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

## Installation & Running

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


## API Endpoints

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

**Response:**
```json
[
  {
    "id": "number",
    "username": "string",
    "email": "string",
    "role": "string",
    "createdAt": "datetime",
    "updatedAt": "datetime"
  }
]
```

#### GET /users/:id
Get user by ID (Admin only).

#### PUT /users/:id
Update user (Admin only or own profile).

#### DELETE /users/:id
Delete user (Admin only).

### Issues

#### GET /issues
Get all issues (authenticated users).

#### GET /issues/:id
Get issue by ID.

#### POST /issues
Create new issue (authenticated users).

**Request Body:**
```json
{
  "title": "string",
  "description": "string",
  "priority": "low" | "medium" | "high",
  "status": "open" | "in_progress" | "resolved" | "closed",
  "assignedUserId": "number"
}
```

#### PUT /issues/:id
Update issue (Admin or assigned user).

#### DELETE /issues/:id
Delete issue (Admin only).

## Authentication & Authorization

### JWT Authentication
- Users receive JWT tokens upon login
- Tokens must be included in `Authorization: Bearer <token>` header
- Tokens expire based on `JWT_EXPIRES_IN` configuration

### Role-Based Access Control (RBAC)
- **User**: Can view/create/update their own issues
- **Admin**: Full access to all resources including user management

### Guards
- `JwtAuthGuard`: Protects routes requiring authentication
- `RolesGuard`: Enforces role-based access control
- `AdminGuard`: Restricts access to admin users only

## Data Models

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

## Error Handling

The API returns standard HTTP status codes with error messages:

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
  "statusCode": "number",
  "message": "string",
  "error": "string"
}
```

## Validation

Request validation is implemented using:
- `class-validator` for validation rules
- `class-transformer` for data transformation
- DTOs (Data Transfer Objects) for each endpoint

## Security Features

- Password hashing with bcrypt
- JWT token authentication
- Role-based access control
- Input validation and sanitization
- CORS configuration
- Rate limiting (recommended for production)

## Development Notes

### Code Style
- ESLint for linting
- Prettier for code formatting
- TypeScript for type safety

### Database Migrations
Currently using `synchronize: true` for auto-schema creation. For production:
1. Disable synchronization
2. Use TypeORM migrations
3. Version control schema changes

### Recommended Improvements
1. Add email verification for registration
2. Implement password reset functionality
3. Add rate limiting
4. Implement audit logging
5. Add API documentation with Swagger
6. Set up proper database migrations
7. Add comprehensive error logging
8. Implement caching for frequently accessed data

## Deployment

### Docker Deployment
Create a `Dockerfile`:
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "start:prod"]
```

### Environment-Specific Configs
- Use different `.env` files for development, staging, and production
- Configure database connections appropriately
- Set proper JWT secrets for each environment

## Contributing

1. Follow the existing code style
2. Write tests for new features
3. Update documentation for API changes
4. Use semantic versioning for releases
