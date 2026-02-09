import { useContext } from "react";
import { AuthContext } from "../../context/auth-provider";
import Layout from "../../component/layout";

const Dashboard = () => {
    const { user } = useContext(AuthContext);

    return (
       
        <Layout>
            <div className="container">
                
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
            </Layout>
      
    );
};

export default Dashboard;
