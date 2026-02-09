import { useEffect, useState } from "react";
import {users} from "../../api/auth";
import Layout from "../../component/layout";

const UserList = ()=>{


     const [userList, setUserList] = useState([]); // rename state
    const[message,setMessage] = useState('');

    useEffect(()=>{
        loadUser();
    },[])

   const loadUser = async () => {
    try {
      const response = await users();
      setUserList(response.data );
    } catch (error) {
      setMessage(error.response?.data?.message || 'Failed to load users');
    }
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
                    <table className="table table-bordered table-hover">
                        <thead className="table-dark">
                            <tr>
                                <th>Id</th>
                                <th>Email</th>
                                <th>Role</th>
                            </tr>
                        </thead>

                        <tbody>
                            {
                                userList.map((user)=>(
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
            </div>
        </Layout>
    )
}

export default UserList;