import { useContext } from "react";
import { AuthContext } from "../../context/auth-provider";
import IssueStatusCounts from "../../component/issue-status-counts";
import issueTrackerImage from '../../img/issue-tracker.jpg';
import NavBar from "../../component/nav-bar";

const Dashboard = () => {
    const { user } = useContext(AuthContext);

    return (
        <NavBar>
        <div className="container-fluid min-vh-100 p-0">
            <div className="row g-0 min-vh-100">
                {/* Cover Image Section */}
                <div className="col-lg-6 d-none d-lg-block">
                    <div 
                        className="h-100 d-flex align-items-center justify-content-center"
                        style={{
                            backgroundImage: `url(${issueTrackerImage})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            backgroundRepeat: 'no-repeat',
                            position: 'relative'
                        }}
                    >
                        <div 
                            className="position-absolute top-0 start-0 w-100 h-100"
                            style={{
                                background: 'linear-gradient(135deg, rgba(0,123,255,0.8) 0%, rgba(0,75,162,0.9) 100%)'
                            }}
                        ></div>
                        <div className="position-relative text-center text-white p-5">
                            <h1 className="display-4 fw-bold mb-3">Dashboard</h1>
                            <p className="lead mb-4">Monitor your project progress and track issues efficiently</p>
                            <div className="d-flex justify-content-center gap-4">
                                <div className="text-center">
                                    <h3 className="fw-bold">Track</h3>
                                    <p>Monitor issues</p>
                                </div>
                                <div className="text-center">
                                    <h3 className="fw-bold">Manage</h3>
                                    <p>Organize tasks</p>
                                </div>
                                <div className="text-center">
                                    <h3 className="fw-bold">Resolve</h3>
                                    <p>Complete projects</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                {/* Dashboard Content Section */}
                <div className="col-lg-6 d-flex align-items-start justify-content-center bg-light" style={{ paddingTop: '3rem' }}>
                    <div className="w-100" style={{ maxWidth: '600px', padding: '2rem' }}>
                        <div className="text-center mb-4">
                            <h2 className="fw-bold text-dark">Welcome Back!</h2>
                            <p className="text-muted">Here's your project overview</p>
                        </div>
                        
                        {user ? (
                            <>
                                <div className="card border-0 shadow-sm mb-4">
                                    <div className="card-body text-center">
                                        <div className="mb-3">
                                            <div className="rounded-circle bg-primary text-white d-inline-flex align-items-center justify-content-center" style={{ width: '60px', height: '60px' }}>
                                                <i className="bi bi-person-fill fs-3"></i>
                                            </div>
                                        </div>
                                        <h4 className="fw-bold text-dark mb-1">User Dashboard</h4>
                                        <p className="text-muted mb-0">
                                            <i className="bi bi-envelope-fill me-2"></i>
                                            {user.email}
                                        </p>
                                    </div>
                                </div>
                                
                                <div className="mb-4">
                                    <h3 className="fw-bold text-dark mb-3">Issue Statistics</h3>
                                    <IssueStatusCounts />
                                </div>
                            </>
                        ) : (
                            <div className="alert alert-warning border-0 shadow-sm">
                                <div className="d-flex align-items-center">
                                    <i className="bi bi-exclamation-triangle-fill me-3 fs-4"></i>
                                    <div>
                                        <h5 className="alert-heading mb-1">No User Information</h5>
                                        <p className="mb-0">Please login to view your dashboard.</p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
        </NavBar>
    );
};

export default Dashboard;
