import { useContext } from "react";
import { AuthContext } from "../../context/auth-provider";
import Layout from "../../component/layout";
import IssueStatusCounts from "../../component/issue-status-counts";

const Dashboard = () => {
    const { user } = useContext(AuthContext);

    return (
        <Layout>
            <div className="container">
                <div className="row mb-4">
                    <div className="col-md-12">
                        <h2>Dashboard</h2>
                    </div>
                </div>
                
                {user ? (
                    <>
                        <div className="row mb-4">
                            <div className="col-md-12">
                                <div className="alert alert-info">
                                    <h4>Welcome!</h4>
                                    <p>Email: <strong>{user.email}</strong></p>
                                </div>
                            </div>
                        </div>
                        
                        <div className="row mb-4">
                            <div className="col-md-12">
                                <h3>Issue Statistics</h3>
                            </div>
                        </div>
                        
                        <IssueStatusCounts />
                    </>
                ) : (
                    <div className="alert alert-warning mt-3">
                        <p>No user information available. Please login.</p>
                    </div>
                )}
            </div>
        </Layout>
    );
};

export default Dashboard;
