import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({children})=>{
    const [user,setUser] = useState(null);

    useEffect(() => {
        // Rehydrate user state from localStorage on app initialization
        const token = localStorage.getItem('token');
        const userEmail = localStorage.getItem('userEmail');
        const userRole = localStorage.getItem('userRole');
        
        if (token && userEmail) {
            setUser({ email: userEmail, role: userRole || 'GUEST' });
        }
    }, []);

    return(
        <AuthContext.Provider value ={{user, setUser}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;