import React,{useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import { Skeleton } from '@mui/material';
import { useAuth } from '../Auth/useAuth/useAuth';
import Cookies from 'js-cookie';

export const Redirect = () => {
  const navigate = useNavigate();
  const {isAdmin,isCLient,isUser,name} = useAuth();
  console.log(isUser)

  useEffect (() => {
    if(isAdmin){
        navigate('/login')        
    } 
    else if(isCLient){
        navigate('/register/client')
    }
    else if(isUser){
        navigate('/')
        toast.success(`Welcome ${name}`)
    }
    else{
       toast.error("Somthing went wrong! Please Try Again")
       Cookies.remove("Authorization")
       navigate('/login')
    }
  },[])

  return 
}
