import { useEffect, useState } from "react";
import {users} from "../../api/auth";

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
        <div>
            <table>
                <thead>
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
                                <td>user.email</td>
                                <td>user.role</td>
                            </tr>
                          
                        ))

                    }
                  
                </tbody>
            </table>
        </div>
    )
}

export default UserList;