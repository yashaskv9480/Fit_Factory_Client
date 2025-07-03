import {
  Box,
  Button,
  Card,
  CardActions,
  CardMedia,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";

import DeleteIcon from "@mui/icons-material/Delete";
import { Skeleton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../../Auth/useAuth/useAuth";
import Fit_Factory_api from "../../Fit_Factory_Api/Fit_Factory_api";

export const GymImages = () => {
  const [images, setImages] = useState([]);
  const [newimage, setNewImage] = useState({ preview: "", data: "" });
  const { checkLoggedOut } = useAuth();
  const [loading, setloading] = useState(true);
  const [open, setOpen] = useState(false);

  const { token } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    getGymImages();
  }, []);

  const getGymImages = async () => {
    setloading(true);
    try {
      const response = await Fit_Factory_api.get(`/client/getgymimages`, {
        headers: {
          Authorization: token,
        },
      });
      if (response.status === 200) {
        setImages(response.data);
        setloading(false);
      } else {
        toast.error("Something went wrong!! Please Contact admin");
        navigate("/dashboard");
      }
    } catch (error) {
      if (error.response.status === 401) {
        toast.error("Unauthorized User !!");
        navigate("/unauthorized");
      }
      console.log(error);
      toast.error("Something went wrong", { autoClose: 500, theme: "colored" });
      navigate("/dashboard");
    }
  };

  const handleFileChange = (e) => {
    const img = {
      preview: URL.createObjectURL(e.target.files[0]),
      data: e.target.files[0],
    };
    setNewImage(img);
  };

  const handleuploadimage = async () => {
    if (!newimage.data) {
      toast.error("No image selected", { autoClose: 2000, theme: "colored" });
      return;
    }
    setloading(true);
    let formData = new FormData();
    formData.append("image", newimage.data);
    try {
      const sendAuth = await Fit_Factory_api.post(
        "/client/addgymimage",
        {
          body: formData,
          headers: {
            Authorization: `${token}`,
          },
        },
      );

      if (sendAuth.status === 200) {
        setloading(false);
        getGymImages();
        toast.success("Uploaded Successfully", {
          autoClose: 500,
          theme: "colored",
        });
      } else {
        setloading(false);
        toast.error("Something went wrong, Please try again", {
          autoClose: 500,
          theme: "colored",
        });
      }
    } catch (error) {
      if (error.response.status === 401) {
        setloading(false);
        toast.error("Unauthorized User", { autoClose: 500 });
        await checkLoggedOut();
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

  const handleDeleteImage = async (imageName) => {
    try {
      setloading(true);
      const response = await Fit_Factory_api.delete(
        `/client/deletegymimages/${imageName}`,
        {
          headers: {
            Authorization: token,
          },
        },
      );
      if (response.status === 200) {
        setloading(false);
        setImages((prevImages) =>
          prevImages.filter((image) => image.image_name !== imageName),
        );
        toast.success("Image deleted successfully");
      } else {
        setloading(false);
        toast.error("Failed to delete image");
      }
    } catch (error) {
      setloading(false);
      console.error("Error deleting image:", error);
      toast.error("Failed to delete image", { autoClose: 2000 });
    }
  };

  return (
    <>
      <Box display="flex" justifyContent="center" mt={2} mb={4}>
        <Button variant="contained" color="primary" onClick={handleuploadimage}>
          Upload Gym Image
        </Button>
        <input
          accept="image/*"
          type="file"
          required
          id="gymimage"
          name="gymimage"
          onChange={handleFileChange}
        />
      </Box>
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
          <Skeleton variant="rectangular" height={200} width="200px" />
          <Skeleton variant="rectangular" height={200} width="200px" />
          <Skeleton variant="rectangular" height={200} width="200px" />
          <Skeleton variant="rectangular" height={200} width="200px" />
        </section>
      ) : images.length == 0 ? (
        <Typography sx={{ textAlign: "center" }}>
          No images have been uploaded
        </Typography>
      ) : (
        <Grid container spacing={2} m={2}>
          {images.map((image) => (
            <Grid item xs={12} sm={6} md={4} key={image.image_name}>
              <Card>
                <CardMedia
                  component="img"
                  height="200"
                  image={image.image_url}
                  alt={image.image_name}
                />
                <CardActions>
                  <IconButton
                    aria-label="delete"
                    onClick={() => setOpen(true)}
                    style={{ color: "red" }}
                  >
                    <DeleteIcon />
                  </IconButton>
                  <Dialog open={open} onClose={() => setOpen(false)}>
                    <DialogTitle>Delete Image</DialogTitle>
                    <DialogContent>
                      Are you sure you want to delete the image?
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={() => setOpen(false)}>Cancel</Button>
                      <Button
                        onClick={() => {
                          handleDeleteImage(image.image_name);
                          setOpen(false);
                        }}
                        style={{ color: "red" }}
                      >
                        Delete
                      </Button>
                    </DialogActions>
                  </Dialog>
                  <Typography variant="body2" color="textSecondary">
                    {image.image_name}
                  </Typography>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </>
  );
};

export default GymImages;
