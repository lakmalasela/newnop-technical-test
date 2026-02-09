import { useEffect, useState } from "react";
import {users} from "../../api/auth";
import Layout from "../../component/layout";

const UserList = ()=>{


     const [userList, setUserList] = useState([]); // rename state
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
      console.log('API Response:', response.data); // Debug log
      console.log('Users array:', response.data.data.data); // Debug users array
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

  const renderPagination = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
    return pages;
  };

    return(
        <Layout>
            <div className="container mt-4">
                <h2 className="mb-4">User List</h2>
                {message && (
                    <div className="alert alert-danger">
                        {message}
                    </div>
                )}
                <div className="table-responsive">
                    <table className="table table-striped table-hover">
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Email</th>
                                <th>Role</th>
                            </tr>
                        </thead>

                        <tbody>
                            {
                                Array.isArray(userList) && userList.map((user)=>(
                                    <tr key={user.id}>
                                        <td>{user.id}</td>
                                        <td>{user.email}</td>
                                        <td>
                                            <span className={`badge ${
                                                user.role === 'ADMIN' ? 'bg-danger' : 
                                                user.role === 'GUEST' ? 'bg-success' : 'bg-secondary'
                                            }`}>
                                                {user.role}
                                            </span>
                                        </td>
                                    </tr>
                                   
                                ))

                            }
                           
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="d-flex justify-content-between align-items-center mt-4">
                    <div className="text-muted">
                        Showing {userList.length} of {totalUsers} users
                    </div>
                    <nav>
                        <ul className="pagination mb-0">
                            <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                                <button 
                                    className="page-link" 
                                    onClick={() => handlePageChange(currentPage - 1)}
                                    disabled={currentPage === 1}
                                >
                                    Previous
                                </button>
                            </li>
                            {renderPagination().map((page) => (
                                <li key={page} className={`page-item ${currentPage === page ? 'active' : ''}`}>
                                    <button 
                                        className="page-link" 
                                        onClick={() => handlePageChange(page)}
                                    >
                                        {page}
                                    </button>
                                </li>
                            ))}
                            <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                                <button 
                                    className="page-link" 
                                    onClick={() => handlePageChange(currentPage + 1)}
                                    disabled={currentPage === totalPages}
                                >
                                    Next
                                </button>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </Layout>
    )
}

export default UserList;