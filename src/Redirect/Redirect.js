import React,{useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import { Skeleton } from '@mui/material';
import { useAuth } from '../Auth/useAuth/useAuth';

export const Redirect = () => {
  const navigate = useNavigate();
  const {isAdmin,isCLient,isUser,name} = useAuth();

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
  },[])

  return 
}
