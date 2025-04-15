import * as React from "react";
import Box from "@mui/material/Box";
import {
  Card,
  CardActionArea,
  CardContent,
  CardActions,
  Rating,
} from "@mui/material";
import Typography from "@mui/material/Typography";
import styles from "./ProductCard.module.css";
import { useState } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Fit_Factory_api from "../../../Fit_Factory_Api/Fit_Factory_api";
import Loading from "../../loading/Loading";

export default function WishListCard({ gym, token }) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const [loading, setloading] = useState(false);

  const handlenavigate = () => {
    navigate(`/gyms/wishlist/${gym.gym_id}`);
  };

  const handleDeleteWishlist = async () => {
    try {
      setloading(true);
      const response = await Fit_Factory_api.delete(
        `/user/deletewishlist/${gym.gym_id}`,
        {
          headers: {
            Authorization: token,
          },
        },
      );
      if (response.status === 200) {
        setloading(false);
        toast.success("Removed successfully");
        navigate("/");
      } else {
        setloading(false);
        toast.error("Failed to remove");
      }
    } catch (error) {
      setloading(false);
      console.error("Error  :", error);
      toast.error("Failed to remove", { autoClose: 2000 });
    }
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <Card className={styles.main_card}>
          <CardActionArea
            className={styles.card_action}
            onClick={handlenavigate}
          >
            <CardContent>
              <Typography
                gutterBottom
                variant="h6"
                sx={{
                  textAlign: "center",
                  textTransform: "uppercase",
                  fontWeight: "bold",
                }}
              >
                {gym.gym_name}
              </Typography>
            </CardContent>
            <Box className={styles.cart_box}>
              <img
                alt={gym.gym_image}
                src={gym.gym_image}
                loading="lazy"
                className={styles.cart_img}
              />
            </Box>
          </CardActionArea>
          <Typography
            variant="body1"
            style={{
              textAlign: "center",
              wordBreak: "break-word",
              paddingRight: 10,
              margin: "10px 0",
              fontWeight: "bold",
            }}
          >
            {gym.location.toUpperCase()}
          </Typography>

          <CardActions className={styles.card_actions}>
            <Typography variant="h6" color="primary">
              ₹{gym.gym_price}
            </Typography>
          </CardActions>
          <IconButton
            aria-label="delete"
            onClick={() => setOpen(true)}
            style={{ color: "red" }}
          >
            <DeleteIcon />
          </IconButton>
          <Dialog open={open} onClose={() => setOpen(false)}>
            <DialogTitle>Remove from wishlist</DialogTitle>
            <DialogContent>Are you sure you want to remove?</DialogContent>
            <DialogActions>
              <Button onClick={() => setOpen(false)}>Cancel</Button>
              <Button
                onClick={() => {
                  handleDeleteWishlist();
                  setOpen(false);
                }}
                style={{ color: "red" }}
              >
                Delete
              </Button>
            </DialogActions>
          </Dialog>
        </Card>
      )}
    </>
  );
}
