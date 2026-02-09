import { useContext } from "react";
import { AuthContext } from "../context/auth-provider";
import { NavLink, useNavigate } from "react-router-dom";

const Dashboard = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    
    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
        
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <h2>Dashboard</h2>
                    <button onClick={handleLogout}>Logout</button>
                    <NavLink to='/register'>Register User</NavLink>
                    <NavLink to='/issue'>Create Issue</NavLink>
                    {user ? (
                        <div className="alert alert-info">
                            <h4>Welcome!</h4>
                            <p>Email: <strong>{user.email}</strong></p>
                            <NavLink to='/user-list'>User List</NavLink>
                        </div>
                    ) : (
                        <div className="alert alert-warning">
                            <p>No user information available. Please login.</p>
                        </div>
                        
                    )}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
