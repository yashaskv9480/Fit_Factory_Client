import './login.css'
import { Avatar, Button, Checkbox, CssBaseline, FormControlLabel, Grid, InputAdornment, TextField, Typography } from '@mui/material'
import { Box, Container } from '@mui/system'
import React, { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
import { Link, redirect, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { MdLockOutline } from 'react-icons/md'
import { RiEyeFill, RiEyeOffFill } from 'react-icons/ri';
import Fit_Factory_api from '../../Fit_Factory_Api/Fit_Factory_api'
import CopyRight from '../../Components/CopyRight/CopyRight'
import {GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import {Skeleton} from '@mui/material'
import {CircularProgress} from '@mui/material'
import Cookies from 'js-cookie'
import { useAuth } from '../useAuth/useAuth'


const Login = () => {
  const [loading,setloading] = useState(false)
  const [credentials, setCredentials] = useState({ email: "", password: "" })
  const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const navigate = useNavigate()

  const handleOnChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }

  useEffect(() => {
    let auth = localStorage.getItem('Authorization');
    if (auth) {
      navigate("/")
    }
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setloading(true)
    try {
        const sendAuth = await Fit_Factory_api.post(`/user/login` ,{email: credentials.email, password: credentials.password });
        console.log(sendAuth)
        const receive = await sendAuth.data
        console.log(receive)
        if (sendAuth.status == 200) {
          toast.success("Login Successfully", { autoClose: 500, theme: 'colored' })
          Cookies.set("Authorization",receive.token,{expires: 1})
          navigate('/redirect')
        }
      }
    catch (error) {
      setloading(false)
        if(error.response.status == 404){
          toast.error("Wrong Email and Password! Please Contact Admin")
        }
        else{
          toast.error("Somthing went wrong! Please try again later")
        }
    }
  }

  const handleGoogleSucess = async (res) => {
    setloading(true)
    const {credential, clientId } = res;
    try{
      const sendAuth = await Fit_Factory_api.post("/user/google/oauth", {
        credential,clientId
      })
      const receive = sendAuth.data;
      if (sendAuth.status == 200){
        Cookies.set("Authorization",receive.token,{expires: 1})
        navigate("/redirect")
      }
    }
    catch(err){
      setloading(false)
      toast.error("Login Error! Please Contact the admin")
    }
  }

  const handleGoogleFailure =  (res) => {
      setloading(false)
      toast.error("Somthing went wrong.Please try again")
  }



  return (
    <div>
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      {loading ? (
                    <section style={{ display: 'flex', flexWrap: "wrap", width: "100%", justifyContent: "space-around", alignItems: 'center' }}>
                    <CircularProgress/>
                    </section>
                ) : (
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
         <Avatar sx={{ m: 1, bgcolor: '#1976d2' }}>
          <MdLockOutline />
        </Avatar>
        <Typography component="h1" variant="h5" sx={{mb: 2}}>
          Sign in
        </Typography>
        <GoogleOAuthProvider clientId = {process.env.REACT_APP_GOOGLE_CLIENT_ID} >
            <GoogleLogin
                onSuccess={handleGoogleSucess}
                onError={handleGoogleFailure}
                size='large'
                theme='filled_blue'
                shape='circle'
                width="400"
                />
              </GoogleOAuthProvider> 
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>

          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            value={credentials.email}
            name='email'
            onChange={handleOnChange}
            autoComplete="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            value={credentials.password}
            name='password'
            onChange={handleOnChange}
            label="Password"
            type={showPassword ? "text" : "password"}
            id="password"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end" onClick={handleClickShowPassword} sx={{cursor:'pointer'}}>
                  {showPassword ? <RiEyeFill /> : <RiEyeOffFill />}
                </InputAdornment>
              )
            }}
            autoComplete="current-password"

          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link to="/forgotpassword" variant="body2" style={{ color: '#1976d2' }}>
                Forgot password?
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box> )}
    </Container>
    <CopyRight sx = {{mt: 8}}/>          
    </div>
  )
}

export default Login