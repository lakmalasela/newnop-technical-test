import { useEffect, useState } from "react";
import {users} from "../../api/auth";
import NavBar from "../../component/nav-bar";
import Pagination from "../../component/pagination";

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

    return(
        <NavBar>
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
                <Pagination 
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                    showing={userList.length}
                    total={totalUsers}
                    itemName="users"
                />
            </div>
        </NavBar>
    )
}

export default UserList;