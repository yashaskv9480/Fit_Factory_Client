import '../Login/login.css'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { Avatar, Button, Checkbox, CssBaseline, FormControlLabel, Grid, InputAdornment, TextField, Typography } from '@mui/material'
import { MdLockOutline } from 'react-icons/md'
import { Box, Container } from '@mui/system'
import { toast } from 'react-toastify'
import CopyRight from '../../Components/CopyRight/CopyRight'
import { RiEyeFill, RiEyeOffFill } from 'react-icons/ri';
import { AiOutlineGoogle } from 'react-icons/ai'
import Fit_Factory_api from '../../Fit_Factory_Api/Fit_Factory_api'
import {GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import {CircularProgress} from '@mui/material'
import Cookies from 'js-cookie'
import { useAuth } from '../useAuth/useAuth'




const Register = ({client}) => {
  const [loading,setloading] = useState(false)
  const {checkLoggedIn} = useAuth();
  const [credentials, setCredentials] = useState({ name: "", email: "", mobile: '', password: "" })
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
    setloading(true)
    e.preventDefault()
    try {
        const sendAuth = await Fit_Factory_api.post("/user/signup",
          {
            name: credentials.name,
            email: credentials.email,
            mobile: credentials.mobile,
            password: credentials.password,
          })
        console.log(sendAuth.status)
        if (sendAuth.status == 200) {
          toast.success("Registered Successfully", { autoClose: 500, theme: 'colored' })
          navigate('/login')
        }
        else {
          setloading(false)
          toast.error("Something went wrong, Please try again", { autoClose: 500, theme: 'colored' })
          navigate('/')
        }
    } catch (error) {
      if(error.response.status == 409){
        setloading(false)
        toast.error("User already exists please sign in!")
        navigate('/login')
      }
      else{
        setloading(false)
        toast.error(error.response.data.error[0].msg, { autoClose: 500, theme: 'colored' })
      }
     }

  }

  const handleclientnavigate = () => {
    navigate("/register/gymdetails", {state: credentials})
  }


  const handleGoogleSucess = async (res) => {
    setloading(true)
    const {credential, clientId } = res;
    try{
      const sendAuth = await Fit_Factory_api.post("/user/google/oauth", {
        credential,clientId
      })
      const receive = sendAuth.data;
      console.log(receive)
      if (sendAuth.status == 200){
        toast.success("Login succesful")
        Cookies.set("Authorization",receive.token,{expires: 1})
        await checkLoggedIn();
        navigate("/")
      }
    }
    catch(err){
      setloading(false)
      toast.error("Login Error! Please Contact the admin")
    }
  }

  const handleGoogleFailure =  (res) => {
      toast.error("Somthing went wrong.Please try again")
  }

  return (
    <>
      <Container component="main" maxWidth="xs" sx={{ marginBottom: 10 }}>
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
            {client? "Owner Details" : "User Signup"}
          </Typography>
          { !client &&
         <GoogleOAuthProvider clientId = {process.env.REACT_APP_GOOGLE_CLIENT_ID} >
            <GoogleLogin
                onSuccess={handleGoogleSucess}
                onError={handleGoogleFailure}
                size='large'
                theme='filled_blue'
                shape='circle'
                width="400"
                />
              </GoogleOAuthProvider>}
          <Box component="form" noValidate onSubmit={client ? handleclientnavigate : handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>

              <Grid item xs={12}>
                <TextField
                  autoComplete="given-name"
                  name="name"
                  value={credentials.name}
                  onChange={handleOnChange}
                  required
                  fullWidth
                  id="name"
                  label="Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  value={credentials.email}
                  onChange={handleOnChange}
                  autoComplete="email"

                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="mobile"
                  label="Contact Number"
                  name="mobile"
                  value={credentials.mobile}
                  onChange={handleOnChange}
                  inputMode='numeric'
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  id="password"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end" onClick={handleClickShowPassword} sx={{ cursor: 'pointer' }}>
                        {showPassword ? <RiEyeFill /> : <RiEyeOffFill />}
                      </InputAdornment>
                    )
                  }}
                  value={credentials.password}
                  onChange={handleOnChange}
                  autoComplete="new-password"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              {client? "Enter Gym Details" : "Sign Up"}
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                Already have an account?
                <Link to='/login' style={{ color: '#1976d2', marginLeft: 3 }}>
                  Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box> )}
        <CopyRight sx={{ mt: 5 }} />
      </Container>
    </>
  )
}

export default Register