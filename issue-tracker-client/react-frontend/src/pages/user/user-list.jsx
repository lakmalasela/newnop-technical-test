import { useEffect, useState } from "react";
import {users} from "../../api/auth";
import NavBar from "../../component/nav-bar";
import Pagination from "../../component/pagination";
import issueTrackerImage from '../../img/issue-tracker.jpg';

const UserList = ()=>{

    const [userList, setUserList] = useState([]);
    const[message,setMessage] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalUsers, setTotalUsers] = useState(0);
    const limit = 10;

    useEffect(()=>{
        loadUser(currentPage);
    },[currentPage])

   const loadUser = async (page = 1) => {
    try {
      const response = await users('', page, limit);
      setUserList(response.data.data.data || []);
      setTotalPages(response.data.data.totalPages || 1);
      setTotalUsers(response.data.data.total || 0);
      setCurrentPage(response.data.data.page || 1);
    } catch (error) {
      setMessage(error.response?.data?.message || 'Failed to load users');
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

    return(
        <NavBar>
            <div className="container-fluid min-vh-100 p-0">
                <div className="row g-0 min-vh-100">
                    {/* Cover Image Section */}
                    <div className="col-lg-4 d-none d-lg-block">
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
                                <h1 className="display-4 fw-bold mb-3">User Management</h1>
                                <p className="lead mb-4">Manage and monitor all registered users in the system</p>
                                <div className="d-flex justify-content-center gap-4">
                                    <div className="text-center">
                                        <h3 className="fw-bold">View</h3>
                                        <p>See all users</p>
                                    </div>
                                    <div className="text-center">
                                        <h3 className="fw-bold">Manage</h3>
                                        <p>Control access</p>
                                    </div>
                                    <div className="text-center">
                                        <h3 className="fw-bold">Monitor</h3>
                                        <p>Track activity</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    {/* User List Section */}
                    <div className="col-lg-8 d-flex align-items-start justify-content-center bg-light" style={{ paddingTop: '3rem' }}>
                        <div className="w-100" style={{ maxWidth: '800px', padding: '2rem' }}>
                            <div className="text-center mb-4">
                                <h2 className="fw-bold text-dark">User Directory</h2>
                                <p className="text-muted">Manage system users and their permissions</p>
                            </div>

                            {message && (
                                <div className="alert alert-danger border-0 shadow-sm mb-4">
                                    <div className="d-flex align-items-center">
                                        <i className="bi bi-exclamation-triangle-fill me-2"></i>
                                        <span>{message}</span>
                                    </div>
                                </div>
                            )}

                            <div className="card border-0 shadow-sm">
                                <div className="card-body p-0">
                                    <div className="table-responsive">
                                        <table className="table table-hover mb-0">
                                            <thead className="table-light">
                                                <tr>
                                                    <th className="border-0">ID</th>
                                                    <th className="border-0">Email Address</th>
                                                    <th className="border-0">Role</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    Array.isArray(userList) && userList.map((user)=>(
                                                        <tr key={user.id}>
                                                            <td className="align-middle">
                                                                <span className="badge bg-secondary text-white">{user.id}</span>
                                                            </td>
                                                            <td className="align-middle">{user.email}</td>
                                                            <td className="align-middle">
                                                                <span className={`badge ${
                                                                    user.role === 'ADMIN' ? 'bg-danger' : 
                                                                        user.role === 'GUEST' ? 'bg-success' : 'bg-secondary'
                                                                }`}>
                                                                    <i className={`bi ${
                                                                        user.role === 'ADMIN' ? 'bi-shield-fill' : 
                                                                            user.role === 'GUEST' ? 'bi-person-fill' : 'bi-person-badge'
                                                                    } me-1`}></i>
                                                                    {user.role}
                                                                </span>
                                                            </td>
                                                        </tr>
                                                        
                                                    ))

                                                }
                                               
                                            </tbody>
                                        </table>
                                    </div>
                                </div>

                            {/* Pagination */}
                            <div className="d-flex justify-content-center mt-4">
                                <Pagination 
                                    currentPage={currentPage}
                                    totalPages={totalPages}
                                    onPageChange={handlePageChange}
                                    showing={userList.length}
                                    total={totalUsers}
                                    itemName="users"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </NavBar>
    )
}

export default UserList;