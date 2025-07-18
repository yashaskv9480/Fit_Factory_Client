import { Slide } from "@mui/material";
import axios from "axios";
import { forwardRef } from "react";
const getCart = async (setProceed, setCart, authToken) => {
  if (setProceed) {
    const { data } = await axios.get(`${process.env.REACT_APP_GET_CART}`, {
      headers: {
        Authorization: authToken,
      },
    });
    setCart(data);
  }
};
const getWishList = async (setProceed, setWishlistData, authToken) => {
  if (setProceed) {
    const { data } = await axios.get(`${process.env.REACT_APP_GET_WISHLIST}`, {
      headers: {
        Authorization: authToken,
      },
    });
    setWishlistData(data);
  }
};

const handleClickOpen = (setOpenAlert) => {
  setOpenAlert(true);
};

const handleClose = (setOpenAlert) => {
  setOpenAlert(false);
};

const getAllProducts = async (setData) => {
  try {
    const { data } = await axios.get(process.env.REACT_APP_FETCH_PRODUCT);
    setData(data);
  } catch (error) {
    console.log(error);
  }
};

const getSingleProduct = async (setProduct, id, setLoading) => {
  const { data } = await axios.get(
    `${process.env.REACT_APP_FETCH_PRODUCT}/${id}`,
  );
  setProduct(data);
  setLoading(false);
};

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export {
  getCart,
  getWishList,
  handleClickOpen,
  handleClose,
  getAllProducts,
  getSingleProduct,
  Transition,
};
