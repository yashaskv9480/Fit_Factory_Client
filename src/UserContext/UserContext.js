import React, { useState, useEffect, createContext } from 'react';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';

import Login from '../Auth/Login/Login';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
	const [ isauthenticated, setIsauthenticated ] = useState(false);
	const [ isUser, setIsUser ] = useState(false);
	const [ isClient, setIsClient ] = useState(false);
	const [ isAdmin, setIsAdmin ] = useState(false);
    const [token,setToken] = useState("")


	    const checkLoggedIn = async () => {
            const token = Cookies.get('Authorization')
            console.log(Cookies.get('Authorization'))
            setToken(token)
                if(token){
        setIsauthenticated(true)
        const decoded = jwtDecode(token)
        const {name,role} = decoded;
        if(role == 'client'){
            setIsClient(true)
        }
        else if(role == 'admin'){
            setIsAdmin(true)
        }
        else if(role == 'user'){
            setIsUser(true)
        }       
        }
		};

        const checkLoggedOut = async () => {
            Cookies.remove("Authorization")
            setIsauthenticated(false);
            setIsClient(false)
            setIsUser(false)
            setIsAdmin(false)
            setToken("")
        }
        
        useEffect(() => {
            checkLoggedIn();
        }, []);

    const userContextValue = { isauthenticated, isUser, isClient, isAdmin,token, checkLoggedIn,checkLoggedOut};

	return (
		<UserContext.Provider value={userContextValue}>
			{ children }
		</UserContext.Provider>
	);
};


export default UserContext;