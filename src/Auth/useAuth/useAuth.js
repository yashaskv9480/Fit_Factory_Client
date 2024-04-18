import React from 'react'
import Cookies from 'js-cookie'
import {jwtDecode} from 'jwt-decode'

export const useAuth = () => {
    const token = Cookies.get("Authorization")
    let isUser = false;
    let isClient = false;
    let isAdmin = false;

    if(token){
        const decoded = jwtDecode(token)
        const {name,role} = decoded;

        if(role == 'client'){
            isClient = true;
        }
        else if(role == 'admin'){
            isAdmin = true;
        }
        else if(role == 'user'){
            isUser = true;
        }
        return {name,isAdmin,isClient,isUser,token}
    }
    return null
}
