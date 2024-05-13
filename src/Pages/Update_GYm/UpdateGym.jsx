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
import Avatar from "@mui/material/Avatar";
import Modal from "@mui/material/Modal";

const UpdateGym = () => {
  const [open, setOpen] = useState(false);
  const { isClient, isUser } = useAuth();
  const [userData, setUserData] = useState([]);
  const [openAlert, setOpenAlert] = useState(false);
  const token = Cookies.get("Authorization");
  const [loading, setloading] = useState(true);
  const [userDetails, setUserDetails] = useState({
    name: "",
    password: "",
    email: "",
    mobile: "",
  });
  const [gymDetails, setGymDetails] = useState({
    gym_name: "",
    location: "",
    address: "",
    timings: "",
    description: "",
    gym_price: "",
    image: "",
  });

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
    getGymData();
  }, []);

  const handleAvatarClick = () => {
    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
  };

  const getGymData = async () => {
    try {
      const gymDetailsResponse = await Fit_Factory_api.get(
        `/client/viewgymdetails`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      if (gymDetailsResponse.status == 200) {
        setloading(false);
        userDetails.name = gymDetailsResponse.data[0].user_name;
        userDetails.email = gymDetailsResponse.data[0].email;
        userDetails.mobile = gymDetailsResponse.data[0].mobile;
        gymDetails.gym_name = gymDetailsResponse.data[0].gym_name;
        gymDetails.image = gymDetailsResponse.data[0].gym_image;
        gymDetails.location = gymDetailsResponse.data[0].location;
        gymDetails.address = gymDetailsResponse.data[0].address;
        gymDetails.timings = gymDetailsResponse.data[0].timings;
        gymDetails.description = gymDetailsResponse.data[0].description;
        gymDetails.gym_price = gymDetailsResponse.data[0].gym_price;

        setUserData(gymDetailsResponse.data);
      }
    } catch (error) {
      setloading(false);
      toast.error("Something went wrong", { autoClose: 500, theme: "colored" });
    }
  };

  const handleOnchange = (e) => {
    setUserDetails({ ...userDetails, [e.target.name]: e.target.value });
  };

  const handleOnGgymchange = (e) => {
    setGymDetails({ ...gymDetails, [e.target.name]: e.target.value });
  };

  let phoneRegex = /^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[789]\d{9}$/;
  let emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const handleSubmit = async (e) => {
    setloading(true);
    e.preventDefault();
    try {
      if (!userDetails.name && !userDetails.email && !userDetails.mobile) {
        toast.error("Please Fill the all Fields", {
          autoClose: 500,
          theme: "colored",
        });
      } else if (!emailRegex.test(userDetails.email)) {
        toast.error("Please enter valid email", {
          autoClose: 500,
          theme: "colored",
        });
      } else if (!phoneRegex.test(userDetails.mobile)) {
        toast.error("Please enter a valid phone number", {
          autoClose: 500,
          theme: "colored",
        });
      } else {
        const updateUserResponse = await Fit_Factory_api.put(
          `/user/updateuserdetails`,
          {
            name: userDetails.name,
            email: userDetails.email,
            mobile: userDetails.mobile,
          },
          {
            headers: {
              Authorization: token,
            },
          }
        );
        if (updateUserResponse.status === 200) {
          setloading(false);
          toast.success("Updated Successfully", {
            autoClose: 500,
            theme: "colored",
          });
          getGymData();
        } else {
          setloading(false);
          toast.error("Something went wrong", {
            autoClose: 500,
            theme: "colored",
          });
        }
      }
    } catch (error) {
      setloading(false);
      console.log(error);
      toast.error(error.response.data, { autoClose: 500, theme: "colored" });
    }
  };

  const handleClientSubmit = async (e) => {
    e.preventDefault();
    toast.error("Feature Under Construction", {
      autoClose: 500,
      theme: "colored",
    });
  };

  const handleResetPasswordNavigation = () => {
    navigate("/resetpassword");
  };

  const deleteAccount = async () => {
    //     try {
    //         const deleteUser = await axios.delete(`${process.env.REACT_APP_DELETE_USER_DETAILS}/${userData._id}`, {
    //             headers: {
    //                 'Authorization': authToken
    //             }
    //         });
    //         toast.success("Account deleted successfully", { autoClose: 500, theme: 'colored' })
    //         localStorage.removeItem('Authorization');
    //         sessionStorage.removeItem('totalAmount');
    //         navigate("/login")
    //     } catch (error) {
    //         toast.error(error.response.data, { autoClose: 500, theme: 'colored' })

    //     }
    toast.error("Feature Under Construction");
  };

  return (
    <>
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
        {isClient && (
          <Button
            variant="contained"
            endIcon={<EditIcon />}
            onClick={() => navigate("/gymimages/update")}
          >
            Edit Gym Images
          </Button>
        )}
        <Typography
          variant="h6"
          sx={{ margin: "30px 0", fontWeight: "bold", color: "#1976d2" }}
        >
          Personal Information
        </Typography>
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
          <form noValidate autoComplete="off" className={styles.checkout_form}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Name"
                  name="name"
                  value={userDetails.name || ""}
                  onChange={handleOnchange}
                  variant="outlined"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Contact Number"
                  type="tel"
                  name="mobile"
                  value={userDetails.mobile || ""}
                  onChange={handleOnchange}
                  variant="outlined"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Email"
                  name="email"
                  value={userDetails.email || ""}
                  onChange={handleOnchange}
                  variant="outlined"
                  fullWidth
                />
              </Grid>
            </Grid>
            {isClient && (
              <>
                {" "}
                <Typography
                  variant="h6"
                  sx={{
                    margin: "30px 0",
                    fontWeight: "bold",
                    color: "#1976d2",
                    textAlign: "center",
                  }}
                >
                  Gym Information
                </Typography>
                <Grid container spacing={2} mt={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Gym Name"
                      name="gym_name"
                      value={gymDetails.gym_name || ""}
                      onChange={handleOnGgymchange}
                      variant="outlined"
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Location"
                      name="city"
                      value={gymDetails.location.toUpperCase() || ""}
                      onChange={handleOnGgymchange}
                      variant="outlined"
                      fullWidth
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      type="Timings"
                      label="Timings"
                      name="zipCode"
                      value={gymDetails.timings || ""}
                      onChange={handleOnGgymchange}
                      variant="outlined"
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <div onClick={handleAvatarClick}>
                      <Avatar
                        alt="Gym Image"
                        src={""}
                        sx={{ width: 50, height: 50 }}
                      />{" "}
                      <Button>Update Image : Feature Under Construction</Button>
                      <Typography variant="body1">
                        Image Name: {gymDetails.image}
                      </Typography>
                    </div>
                  </Grid>
                  <Modal open={open} onClose={handleCloseModal}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "100%",
                      }}
                    >
                      <img
                        src={""}
                        alt="Full Gym Image"
                        style={{ maxWidth: "75%", maxHeight: "75%" }}
                      />
                    </div>
                  </Modal>
                  <Grid />
                  <Grid item xs={12}>
                    <TextField
                      label="Address"
                      name="userState"
                      value={gymDetails.address || ""}
                      onChange={handleOnGgymchange}
                      variant="outlined"
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label="Description"
                      name="description"
                      value={gymDetails.description || ""}
                      multiline
                      rows={2}
                      onChange={handleOnGgymchange}
                      variant="outlined"
                      fullWidth
                    />
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={4}
                    sx={{ display: "flex", justifyContent: "center" }}
                  >
                    <TextField
                      label="Gym Price"
                      name="gym_price"
                      value={gymDetails.gym_price || ""}
                      onChange={handleOnGgymchange}
                      variant="outlined"
                      fullWidth
                    />
                  </Grid>
                </Grid>
              </>
            )}
            <Container
              sx={{
                display: "flex",
                justifyContent: "space-around",
                marginTop: 5,
              }}
            >
              <Button
                variant="contained"
                endIcon={<TiArrowBackOutline />}
                onClick={() => navigate(-1)}
              >
                Back
              </Button>
              <Button
                variant="contained"
                endIcon={<AiOutlineFileDone />}
                type="submit"
                onClick={isClient ? handleClientSubmit : handleSubmit}
              >
                Save
              </Button>
            </Container>
          </form>
        )}
        <Button
          variant="contained"
          endIcon={<RiLockPasswordLine />}
          type="submit"
          onClick={handleResetPasswordNavigation}
        >
          Reset Password
        </Button>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
            margin: "25px 0",
            width: "100%",
          }}
        >
          <Typography variant="h6">Delete Your Account?</Typography>
          <Button
            variant="contained"
            color="error"
            endIcon={<AiFillDelete />}
            onClick={() => setOpenAlert(true)}
          >
            Delete
          </Button>
        </Box>
        <Dialog
          open={openAlert}
          TransitionComponent={Transition}
          keepMounted
          onClose={() => setOpenAlert(false)}
          aria-describedby="alert-dialog-slide-description"
        >
          {/* <DialogTitle>{"Use Google's location service?"}</DialogTitle> */}
          <DialogContent sx={{ width: { xs: 280, md: 350, xl: 400 } }}>
            <DialogContentText
              style={{ textAlign: "center" }}
              id="alert-dialog-slide-description"
            >
              <Typography variant="body1">
                Your all data will be erased
              </Typography>
            </DialogContentText>
          </DialogContent>
          <DialogActions
            sx={{ display: "flex", justifyContent: "space-evenly" }}
          >
            <Button
              variant="contained"
              endIcon={<AiFillDelete />}
              color="error"
              onClick={deleteAccount}
            >
              Delete
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={() => setOpenAlert(false)}
              endIcon={<AiFillCloseCircle />}
            >
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
      <CopyRight sx={{ mt: 4, mb: 10 }} />
    </>
  );
};

export default UpdateGym;
