import {
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  Grid,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  AiFillCloseCircle,
  AiFillDelete,
  AiOutlineFileDone,
} from "react-icons/ai";
import { RiLockPasswordLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import styles from "./Update.module.css";
import { toast } from "react-toastify";
import { RiEyeFill, RiEyeOffFill } from "react-icons/ri";
import { TiArrowBackOutline } from "react-icons/ti";

import { Transition } from "../../Constants/Constant";
import CopyRight from "../../Components/CopyRight/CopyRight";
import { useAuth } from "../../Auth/useAuth/useAuth";
import EditIcon from "@mui/icons-material/Edit";
import Cookies from "js-cookie";
import Fit_Factory_api from "../../Fit_Factory_Api/Fit_Factory_api";
import { Skeleton } from "@mui/material";

const ResetPassword = () => {
  const token = Cookies.get("Authorization");
  const [loading, setloading] = useState(true);
  const [passwordExists, setPasswordExists] = useState(false);
  const [password, setPassword] = useState({
    currentPassword: "",
    newPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  let navigate = useNavigate();

  useEffect(() => {
    getCurrentPassword();
  }, []);

  const getCurrentPassword = async () => {
    try {
      const getCurrentPasswordResponse = await Fit_Factory_api.get(
        `/user/getpassword`,
        {
          headers: {
            Authorization: token,
          },
        },
      );
      if (getCurrentPasswordResponse.status == 200) {
        setloading(false);
        setPasswordExists(true);
      } else if (getCurrentPasswordResponse.status == 202) {
        setloading(false);
        setPasswordExists(false);
      } else {
        toast.error("Error Contact admin");
      }
    } catch (err) {
      console.log(err);
      setloading(false);
      toast.error("Error Contact admin");
    }
  };

  const handleOauthResetPassword = async (e) => {
    e.preventDefault();
    try {
      if (!password.newPassword) {
        toast.error("Please Fill the all Fields", {
          autoClose: 500,
          theme: "colored",
        });
      } else if (password.newPassword.length < 5) {
        toast.error("Please enter password with more than 5 characters", {
          autoClose: 500,
          theme: "colored",
        });
      } else {
        setloading(true);

        const resetOauthPasswordREsponse = await Fit_Factory_api.put(
          `/user/resetoauthpassword`,
          {
            newPassword: password.newPassword,
          },
          {
            headers: {
              Authorization: token,
            },
          },
        );
        if (resetOauthPasswordREsponse.status == 200) {
          setloading(false);
          toast.success("Password set succesfully");
          navigate("/");
        }
      }
    } catch (error) {
      setloading(false);
      toast.error("Error in changing password. Please Contact admin!!", {
        autoClose: 500,
        theme: "colored",
      });
      console.log(error);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    try {
      if (!password.currentPassword && !password.newPassword) {
        toast.error("Please Fill the all Fields", {
          autoClose: 500,
          theme: "colored",
        });
        // } else if (password.currentPassword.length < ) {
        //   toast.error("Please enter valid password", {
        //     autoClose: 500,
        //     theme: "colored",
        //   });
      } else if (password.newPassword.length < 5) {
        toast.error("Please enter password with more than 5 characters", {
          autoClose: 500,
          theme: "colored",
        });
      } else {
        setloading(true);

        const resetPasswordResponse = await Fit_Factory_api.put(
          `/user/resetpassword`,
          {
            password: password.currentPassword,
            newPassword: password.newPassword,
          },
          {
            headers: {
              Authorization: token,
            },
          },
        );
        if (resetPasswordResponse.status == 200) {
          setloading(false);
          toast.success("Succesfully Changed the password", {
            autoClose: 500,
            theme: "colored",
          });
        }
      }
    } catch (error) {
      if (error.response.status == 500) {
        setloading(false);
        toast.error("Failed to change.Please contact the admin", {
          autoClose: 500,
          theme: "colored",
        });
      } else if (error.response.status == 405) {
        setloading(false);
        toast.error("Current Password is wrong!!", {
          autoClose: 500,
          theme: "colored",
        });
      }
      console.log(error);
    }
  };

  return (
    <>
      {loading ? (
        <section
          style={{
            display: "flex",
            flexWrap: "wrap",
            width: "100%",
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          <Skeleton variant="text" height={200} width="200px" />
          <Skeleton variant="text" height={200} width="200px" />
          <Skeleton variant="text" height={200} width="200px" />
          <Skeleton variant="text" height={200} width="200px" />
        </section>
      ) : (
        <Container
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            marginBottom: 10,
          }}
        >
          <form>
            {passwordExists == false && (
              <Typography
                variant="h6"
                sx={{ margin: "30px 0", fontWeight: "bold", color: "#1976d2" }}
              >
                Your Setting Password for the first time
              </Typography>
            )}
            <Grid container spacing={2}>
              {passwordExists && (
                <Grid item xs={12}>
                  <TextField
                    label="Current Password"
                    name="currentPassword"
                    type={showPassword ? "text" : "password"}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment
                          position="end"
                          onClick={handleClickShowPassword}
                          sx={{ cursor: "pointer" }}
                        >
                          {showPassword ? <RiEyeFill /> : <RiEyeOffFill />}
                        </InputAdornment>
                      ),
                    }}
                    value={password.currentPassword || ""}
                    onChange={(e) =>
                      setPassword({
                        ...password,
                        [e.target.name]: e.target.value,
                      })
                    }
                    variant="outlined"
                    fullWidth
                  />
                </Grid>
              )}
              <Grid item xs={12}>
                <TextField
                  label="New Password"
                  name="newPassword"
                  type={showNewPassword ? "text" : "password"}
                  id="password"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment
                        position="end"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        sx={{ cursor: "pointer" }}
                      >
                        {showNewPassword ? <RiEyeFill /> : <RiEyeOffFill />}
                      </InputAdornment>
                    ),
                  }}
                  value={password.newPassword || ""}
                  onChange={(e) =>
                    setPassword({
                      ...password,
                      [e.target.name]: e.target.value,
                    })
                  }
                  variant="outlined"
                  fullWidth
                />
              </Grid>
            </Grid>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                margin: "25px 0",
                width: "100%",
              }}
            >
              <Button
                variant="contained"
                color="primary"
                endIcon={<RiLockPasswordLine />}
                type="submit"
                onClick={
                  passwordExists
                    ? handleResetPassword
                    : handleOauthResetPassword
                }
              >
                Reset
              </Button>
            </Box>
          </form>
        </Container>
      )}
      <CopyRight sx={{ mt: 4, mb: 10 }} />
    </>
  );
};

export default ResetPassword;
