import React,{useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import { Skeleton } from '@mui/material';
import { useAuth } from '../Auth/useAuth/useAuth';
import Cookies from 'js-cookie';

export const Redirect = () => {
  const navigate = useNavigate();
  const {isAdmin,isCLient,isUser,getuserytype} = useAuth();
  const {name} = getuserytype();
  console.log(isAdmin,isCLient,isUser)

  useEffect (() => {
    if(isAdmin){
        navigate('/forgotpassword')
        toast.success(`Welcome ${name}`)        
    } 
    else if(isCLient){
        navigate('/dashboard')
        toast.success(`Welcome ${name}`)
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