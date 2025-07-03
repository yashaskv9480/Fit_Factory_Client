import {
  Avatar,
  Button,
  CircularProgress,
  CssBaseline,
  Grid,
  TextField,
  Typography
} from "@mui/material";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { Box, Container } from "@mui/system";
import React, { useEffect, useState } from "react";
import { MdLockOutline } from "react-icons/md";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import CopyRight from "../../Components/CopyRight/CopyRight";
import Fit_Factory_api from "../../Fit_Factory_Api/Fit_Factory_api";
import "../Login/login.css";

const GymDetails = () => {
  const location = useLocation();
  const data = location.state;
  const [image, setImage] = useState({ preview: "", data: "" });
  const { name, email, mobile, password } = data;
  const [credentials, setCredentials] = useState({
    gymname: "",
    gymimage: "",
    location: "",
    address: "",
    gym_price: "",
  });
  const [loading, setloading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const navigate = useNavigate();
  const handleOnChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (!data) {
      navigate("/register/client");
    }
  }, []);

  const handleSubmit = async (e) => {
    let formData = new FormData();

    console.log(formData);
    e.preventDefault();
    try {
      if (
        !credentials.gymname ||
        !credentials.location ||
        !credentials.address ||
        !credentials.gym_price ||
        !image.data
      ) {
        toast.error("All fields are required", {
          autoClose: 500,
          theme: "colored",
        });
      } else if (!/^\d+$/.test(credentials.gym_price)) {
        toast.error("Please enter a valid price", {
          autoClose: 500,
          theme: "colored",
        });
      } else if (
        credentials.gymname &&
        image.data &&
        credentials.location &&
        credentials.address &&
        credentials.gym_price
      ) {
        setloading(true);
        formData.append("image", image.data);
        formData.append("name", name);
        formData.append("email", email);
        formData.append("mobile", mobile);
        formData.append("password", password);
        formData.append("gym_name", credentials.gymname);
        formData.append("gymimage", credentials.gymimage);
        formData.append("location", credentials.location);
        formData.append("address", credentials.address);
        formData.append("gym_price", credentials.gym_price);
        const sendAuth = Fit_Factory_api.post('/client/signup',
          {
            body: formData,
          },
        );
        if (sendAuth.status == 200) {
          setloading(false);
          toast.success("Registered Successfully", {
            autoClose: 500,
            theme: "colored",
          });
          navigate("/client/login");
        } else if (sendAuth.status == 409) {
          setloading(false);
          toast.error("User already exists please sign in!", {
            autoClose: 500,
          });
          // navigate("/login");
        } else {
          setloading(false);
          toast.error("Something went wrong, Please try again", {
            autoClose: 500,
            theme: "colored",
          });
        }
      }
    } catch (error) {
      if (error.response.status == 409) {
        setloading(false);
        toast.error("User already exists please sign in!", { autoClose: 500 });
        navigate("/login");
      } else {
        setloading(false);
        toast.error(error.response.data.error[0].msg, {
          autoClose: 500,
          theme: "colored",
        });
      }
    }
  };

  const handleFileChange = (e) => {
    const img = {
      preview: URL.createObjectURL(e.target.files[0]),
      data: e.target.files[0],
    };
    setImage(img);
  };

  return (
    <>
      <Container component="main" maxWidth="xs" sx={{ marginBottom: 10 }}>
        <CssBaseline />
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
            <CircularProgress />
          </section>
        ) : (
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "#1976d2" }}>
              <MdLockOutline />
            </Avatar>
            <Typography component="h1" variant="h5">
              Gym Details
            </Typography>

            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    autoComplete="given-name"
                    name="gymname"
                    value={credentials.gymname}
                    onChange={handleOnChange}
                    required
                    fullWidth
                    id="gymname"
                    label="Gym Name"
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControl sx={{ width: 400 }}>
                    <InputLabel>Location</InputLabel>
                    <Select
                      name="location"
                      required
                      fullWidth
                      id="location"
                      label="Location"
                      value={credentials.location}
                      onChange={handleOnChange}
                    >
                      <MenuItem value={"bengaluru"}>Bengaluru</MenuItem>
                      <MenuItem value={"hyderabad"}>Hyderabad</MenuItem>
                      <MenuItem value={"mumbai"}>Mumbai</MenuItem>
                      <MenuItem value={"chennai"}>Chennai</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="address"
                    label="Complete Address"
                    multiline
                    name="address"
                    value={credentials.address}
                    rows={3}
                    onChange={handleOnChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="gym_price"
                    label="Price Per Day"
                    name="gym_price"
                    value={credentials.gym_price}
                    onChange={handleOnChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button variant="contained" component="label">
                    Upload Gym Image
                    <input
                      accept="image/*"
                      type="file"
                      required
                      id="gymimage"
                      name="gymimage"
                      onChange={handleFileChange}
                    />
                  </Button>
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  Already have an account?
                  <Link to="/login" style={{ color: "#1976d2", marginLeft: 3 }}>
                    Sign in
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        )}
        <CopyRight sx={{ mt: 5 }} />
      </Container>
    </>
  );
};

export default GymDetails;
