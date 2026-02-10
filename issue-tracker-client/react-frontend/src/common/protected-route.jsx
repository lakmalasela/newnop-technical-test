import { useContext } from 'react';
import { AuthContext } from '../context/auth-provider';
import { Navigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const ProtectedRoute = ({ children, requiredRole = null }) => {
    const { user } = useContext(AuthContext);

    // Check if user is not logged in
    if (!user) {
        return <Navigate to="/login" replace />;
    }

    // Check if specific role is required
    if (requiredRole && user.role !== requiredRole) {
        Swal.fire({
            icon: 'error',
            title: 'Access Denied',
            text: `You need ${requiredRole} role to access this page.`,
            confirmButtonColor: '#dc3545'
        });
        return <Navigate to="/dashboard" replace />;
    }

    return children;
};

export default ProtectedRoute;
