# Issue Tracker Frontend Documentation

## Overview

This is a React-based frontend application for the issue tracking system. It provides a modern, responsive interface for user authentication, issue management, and admin functionality. The application uses Vite as the build tool and includes comprehensive form handling and routing.

## Tech Stack

- **Framework**: React 19.2.0
- **Build Tool**: Vite 7.2.4
- **Routing**: React Router DOM 7.12.0
- **HTTP Client**: Axios 1.13.2
- **Styling**: Bootstrap 5.3.8
- **Form Handling**: Formik 2.4.9 with Yup validation
- **Icons**: Font Awesome 7.1.0
- **Notifications**: SweetAlert2 11.26.18
- **Language**: JavaScript (ES6+)

## Project Structure

```
src/
├── main.jsx              # Application entry point
├── App.jsx               # Main application component
├── App.css               # Global styles
├── index.css             # Base styles
├── api/                  # API service layer
│   ├── auth.js           # Authentication API calls
│   └── issues.js         # Issues API calls
├── assets/               # Static assets
│   └── react.svg
├── common/               # Common components and utilities
│   ├── Header.jsx        # Navigation header
│   ├── PrivateRoute.jsx  # Route protection wrapper
│   ├── Sidebar.jsx       # Navigation sidebar
│   └── Spinner.jsx       # Loading spinner component
├── component/            # Reusable components
│   ├── IssueCard.jsx     # Issue display card
│   ├── IssueForm.jsx     # Issue creation/editing form
│   └── UserList.jsx      # User management component
├── context/              # React context
│   └── AuthContext.jsx   # Authentication state management
├── pages/                # Page components
│   ├── Dashboard.jsx     # Main dashboard
│   ├── Issues.jsx        # Issues listing and management
│   ├── Login.jsx         # User login page
│   ├── Profile.jsx       # User profile page
│   ├── Register.jsx      # User registration page
│   ├── Users.jsx         # User management (admin only)
│   └── NotFound.jsx      # 404 error page
├── img/                  # Image assets
├── routes/               # Route definitions
└── utils/                # Utility functions
```

## Environment Setup

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Environment Configuration

Create a `.env` file in the root directory:

```env
VITE_API_BASE_URL=http://localhost:3000
```

### API Configuration

The application connects to the backend API through the `api` directory. Update the base URL in your environment file to match your backend server.

## Installation & Running

### Install Dependencies
```bash
npm install
```

### Development Mode
```bash
npm run dev
```

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

### Linting
```bash
npm run lint
```

## Features

### Authentication
- User registration and login
- JWT token management
- Protected routes
- Automatic logout on token expiration
- Role-based access control

### Issue Management
- Create, read, update, and delete issues
- Issue status tracking (open, in_progress, resolved, closed)
- Priority levels (low, medium, high)
- Issue assignment to users
- Search and filter functionality

### User Management (Admin Only)
- View all users in the system
- User role management
- User profile access

### Responsive Design
- Mobile-friendly interface
- Bootstrap-based responsive grid
- Adaptive navigation

## Key Components

### AuthContext
Provides global authentication state management:
```javascript
const { user, login, logout, isAuthenticated } = useAuth();
```

### PrivateRoute
Wrapper component for protecting routes:
```javascript
<PrivateRoute>
  <ProtectedComponent />
</PrivateRoute>
```

### IssueForm
Comprehensive form for creating/editing issues with:
- Formik for form state management
- Yup validation schema
- Dynamic field validation
- File upload support (if implemented)

### API Services

#### auth.js
Handles authentication-related API calls:
- `login(credentials)`
- `register(userData)`
- `getProfile()`
- `logout()`

#### issues.js
Manages issue-related API calls:
- `getAllIssues()`
- `getIssueById(id)`
- `createIssue(issueData)`
- `updateIssue(id, issueData)`
- `deleteIssue(id)`

## Routing Structure

```javascript
/                    # Landing page (redirects to dashboard if authenticated)
/login              # User login
/register           # User registration
/dashboard          # Main dashboard (protected)
/issues             # Issues listing and management (protected)
/issues/new         # Create new issue (protected)
/issues/:id/edit    # Edit existing issue (protected)
/profile            # User profile (protected)
/users              # User management (admin only, protected)
/*                  # 404 Not Found
```

## State Management

### Authentication State
Managed through React Context (`AuthContext`):
- User information
- Authentication status
- JWT token storage
- Login/logout functions

### Component State
- Local state for form data
- Component-level state for UI interactions
- Props drilling for data flow

## Styling

### Bootstrap Integration
- Bootstrap 5.3.8 for responsive design
- Custom CSS overrides in `App.css`
- Component-specific styling
- Font Awesome icons

### CSS Architecture
- Global styles in `index.css`
- Application styles in `App.css`
- Component-specific inline styles when needed
- Responsive design principles

## Form Handling

### Formik Integration
- Declarative form management
- Validation with Yup schemas
- Error handling and display
- Form submission handling

### Validation Schemas
```javascript
const issueValidationSchema = Yup.object({
  title: Yup.string().required('Title is required'),
  description: Yup.string().required('Description is required'),
  priority: Yup.string().oneOf(['low', 'medium', 'high']),
  status: Yup.string().oneOf(['open', 'in_progress', 'resolved', 'closed'])
});
```

## Error Handling

### HTTP Errors
- Axios interceptors for global error handling
- SweetAlert2 for user-friendly error messages
- Consistent error response handling

### User Feedback
- Loading spinners for async operations
- Success notifications for completed actions
- Error alerts for failed operations

## Security Features

### Client-Side Security
- Route protection with authentication guards
- Role-based access control
- Input validation and sanitization
- XSS prevention through React's built-in protections

### Token Management
- Secure storage of JWT tokens
- Automatic token refresh (if implemented)
- Logout on token expiration

## Performance Optimization

### Code Splitting
- Lazy loading of components (if implemented)
- Route-based code splitting
- Optimized bundle size

### Best Practices
- Efficient re-rendering with React hooks
- Memoization for expensive computations
- Optimized API calls with proper caching

## Browser Compatibility

### Supported Browsers
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

### Features Used
- ES6+ JavaScript features
- Modern CSS with Flexbox/Grid
- Fetch API for HTTP requests

## Development Workflow

### Code Style
- ESLint configuration for code quality
- Consistent naming conventions
- Component-based architecture

### Testing (Recommended)
- Unit tests with Jest and React Testing Library
- Integration tests for API calls
- End-to-end tests with Cypress or Playwright


### Build Process
```bash
npm run build
```
Creates optimized production build in `dist/` folder.

### Environment Variables
Ensure proper environment configuration for production:
- API base URL
- Any third-party service keys

### Common Issues
1. **CORS errors**: Ensure backend allows frontend origin
2. **Authentication failures**: Check token storage and API headers
3. **Build errors**: Verify all dependencies are installed
4. **Routing issues**: Check BrowserRouter configuration

