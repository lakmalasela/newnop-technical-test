import { useContext } from "react";
import { AuthContext } from "../../context/auth-provider";
import { NavLink, useNavigate } from "react-router-dom";

const Dashboard = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    
    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
        
    }

    return (
        <div className="min-vh-100">
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary fixed-top">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">Dashboard</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/register">Register User</NavLink>
                            </li>
                            {user && (
                                <>
                                    <li className="nav-item">
                                        <NavLink className="nav-link" to="/user-list">User List</NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink className="nav-link" to="/issue">Create Issue</NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink className="nav-link" to="/issue-list">Issue List</NavLink>
                                    </li>
                                </>
                            )}
                            <li className="nav-item">
                                <button className="btn btn-outline-light btn-sm ms-2" onClick={handleLogout}>Log Out</button>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <div className="container" style={{paddingTop: '70px'}}>
                {user ? (
                    <div className="alert alert-info mt-3">
                        <h4>Welcome!</h4>
                        <p>Email: <strong>{user.email}</strong></p>
                    </div>
                ) : (
                    <div className="alert alert-warning mt-3">
                        <p>No user information available. Please login.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Dashboard;
