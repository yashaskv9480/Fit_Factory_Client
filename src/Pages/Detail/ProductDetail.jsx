import "./Productsimilar.css";
import React, { useEffect, useState, useContext } from "react";
import { useParams, Link, Navigate, useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Container,
  Tooltip,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  Chip,
  Rating,
  ButtonGroup,
  Skeleton,
  IconButton,
} from "@mui/material";
import { MdAddShoppingCart } from "react-icons/md";
import {
  AiFillHeart,
  AiFillCloseCircle,
  AiOutlineLogin,
  AiOutlineShareAlt,
} from "react-icons/ai";
import Carousel from "react-material-ui-carousel";
import { TextField } from "@mui/material";
import { TbDiscount2 } from "react-icons/tb";
import axios from "axios";
import { toast } from "react-toastify";
import { ContextFunction } from "../../Context/Context";
import ProductReview from "../../Components/Review/ProductReview";
import ProductCard from "../../Components/Card/GymCard/GymCard";
import { Transition, getSingleProduct } from "../../Constants/Constant";
import CopyRight from "../../Components/CopyRight/CopyRight";
import { FaLessThanEqual } from "react-icons/fa";
import { Paper } from "@mui/material";
import Fit_Factory_api from "../../Fit_Factory_Api/Fit_Factory_api";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { StaticDateRangePicker } from "@mui/x-date-pickers-pro/StaticDateRangePicker";
import { pickersLayoutClasses } from "@mui/x-date-pickers/PickersLayout";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useAuth } from "../../Auth/useAuth/useAuth";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import DialogTitle from "@mui/material/DialogTitle";
import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";
import Cookies from "js-cookie";

const ProductDetail = () => {
  const { cart, setCart, wishlistData, setWishlistData } =
    useContext(ContextFunction);
  const { isauthenticated } = useAuth();
  const [openAlert, setOpenAlert] = useState(false);
  const { location, gym_id } = useParams();
  const [gymImages, setGymImages] = useState([]);
  const [gymDetails, setGymDetails] = useState();
  const [productQuantity, setProductQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [selecteddate, setSelectedDate] = useState([null, null]);
  const [formattedStartDate, setFormattedStartDate] = useState(null);
  const [formattedEndDate, setFormattedEndDate] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [bookingDates, setBookingDates] = useState([]);
  const [amount, setAmount] = useState();
  const navigate = useNavigate();
  const token = Cookies.get("Authorization");

  let authToken = localStorage.getItem("Authorization");
  let setProceed = authToken ? true : false;

  useEffect(() => {
    getGymDetails();
  }, []);

  useEffect(() => {
    if (gymDetails) {
      setAmount(bookingDates.length * gymDetails[0].gym_price);
    }
  }, [bookingDates, gymDetails]);

  const getGymDetails = async () => {
    try {
      const response = await Fit_Factory_api.get(
        `/user/getsinglegym/${gym_id}`
      );
      if (response.status == 200) {
        setLoading(false);
        setGymDetails(response.data.gymDetails);
        setGymImages(response.data.gymImages);
      }
    } catch (err) {
      console.log(err);
    }
  };

  // const addToWhishList = async (product) => {
  //     if (setProceed) {
  //         try {
  //             const { data } = await axios.post(`${process.env.REACT_APP_ADD_WISHLIST}`, { _id: product._id }, {
  //                 headers: {
  //                     'Authorization': authToken
  //                 }
  //             })
  //             setWishlistData(data)
  //             setWishlistData([...wishlistData, product])
  //             toast.success("Added To Wishlist", { autoClose: 500, theme: 'colored' })
  //         }
  //         catch (error) {
  //             toast.error(error.response.data.msg, { autoClose: 500, theme: 'colored' })
  //         }
  //     }
  //     else {
  //         setOpenAlert(true);
  //     }

  // };

  const handleShareButtonClick = () => {
    const currentUrl = window.location.href;
    navigator.clipboard
      .writeText(currentUrl)
      .then(() => {
        toast.success("URL succesfully copied.");
      })
      .catch((error) => {
        toast.success("Failed to copy the url..");
      });
  };

  // }
  // const getSimilarProducts = async () => {
  //     const { data } = await axios.post(`${process.env.REACT_APP_PRODUCT_TYPE}`, { userType: cat })
  //     setSimilarProduct(data)
  // }

  const handleButtonClickAndOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleBooking = async () => {
    setLoading(true);
    const data = {
      bookingDates,
      gym_id: gymDetails[0].gym_id,
      gym_price: gymDetails[0].gym_price,
    };
    try {
      const bookingResponse = await Fit_Factory_api.post(
        `/user/booking`,
        data,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      if (bookingResponse.status === 200) {
        setLoading(false);
        toast.success("Successfully booked. Happy Workout");
        navigate("/user/bookings");
      } else {
        toast.error("Booking failed");
      }
    } catch (err) {
      setLoading(false);
      if (err.response.status == 400) {
        toast.error(
          "You have already booked the particular gym for these Dates !!!"
        );
      } else {
        console.error(err);
        toast.error("Booking failed. Plaese Contact admin");
      }
    }
  };

  const handlePayment = async () => {
    try {
      const orderUrlResponse = await Fit_Factory_api.post(
        "/payment/orders",
        { amount: amount },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      if (orderUrlResponse.status == 200) {
        await initPayment(orderUrlResponse.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const initPayment = async ({ data }) => {
    console.log(data.amount);
    var options = {
      key: "rzp_test_DXNHJE7x48V7U2",
      amount: data.amount,
      currency: data.currency,
      name: "XYZ",
      description: "Test Transaction",
      image: gymImages[0].image_name,
      order_id: data.id,
      handler: async (response) => {
        try {
          const verifyUrlResponse = await Fit_Factory_api.post(
            "/payment/verify",
            response,
            {
              headers: {
                Authorization: token,
              },
            }
          );
          if (verifyUrlResponse.status == 200) {
            toast.success("Successfully booked. Happy Workout");
            navigate("/user/bookings");
          }
        } catch (err) {
          toast.failure("Booking Failed.Refund will intiated to the source");
          console.log(err);
        }
      },
      theme: {
        color: "#3399cc",
      },
    };
    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  };

  const handleClose = () => {
    setOpenDialog(false);
  };

  const handleDateAccept = async (selecteddate) => {
    const formattedStartDate = convertToDateOnly(selecteddate[0].$d);
    const formattedEndDate = selecteddate[1]
      ? convertToDateOnly(selecteddate[1].$d)
      : formattedStartDate;

    if (formattedEndDate == null) {
      setBookingDates(formattedStartDate);
    } else {
      setBookingDates(
        await extractDates(
          formattedStartDate,
          formattedEndDate ? formattedEndDate : null
        )
      );
    }
    setFormattedStartDate(formattedStartDate);
    setFormattedEndDate(formattedEndDate);
  };

  function convertToDateOnly(dateString) {
    const dateObject = new Date(dateString);
    const month = dateObject.toLocaleDateString("en-US", { month: "short" });
    const day = dateObject.getDate();
    const year = dateObject.getFullYear();

    return `${month} ${day} ${year}`;
  }

  const handleDateCancel = () => {
    setOpenDialog(false);
  };

  async function extractDates(startDateStr, endDateStr) {
    const startDate = new Date(startDateStr);
    const endDate = new Date(endDateStr);

    const dates = [];

    let currentDate = new Date(startDate);
    while (currentDate <= endDate) {
      const formattedDate = convertToDateOnly(currentDate);
      dates.push(formattedDate);
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return dates;
  }

  function Item({ item }) {
    return (
      <Paper>
        <img
          src={item.image_url}
          alt={item.image_name}
          height={"550px"}
          width={"75%"}
          style={{ display: "block", margin: "0 auto" }}
        />
      </Paper>
    );
  }

  return (
    <>
      <Container maxWidth="xl">
        <Dialog
          open={openAlert}
          TransitionComponent={Transition}
          keepMounted
          onClose={() => setOpenAlert(false)}
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogContent sx={{ width: { xs: 280, md: 350, xl: 400 } }}>
            <DialogContentText
              style={{ textAlign: "center" }}
              id="alert-dialog-slide-description"
            >
              Please Login To Proceed
            </DialogContentText>
          </DialogContent>
          <DialogActions
            sx={{ display: "flex", justifyContent: "space-evenly" }}
          >
            <Link to="/login">
              {" "}
              <Button
                variant="contained"
                endIcon={<AiOutlineLogin />}
                color="primary"
              >
                Login
              </Button>
            </Link>
            <Button
              variant="contained"
              color="error"
              onClick={() => setOpenAlert(false)}
              endIcon={<AiFillCloseCircle />}
            >
              Close
            </Button>
          </DialogActions>
        </Dialog>

        <main className="main-content">
          {loading ? (
            <Skeleton variant="rectangular" height={400} />
          ) : gymImages.length == 0 ? (
            <Typography sx={{ textAlign: "center" }}>
              No images have been uploaded by Owner
            </Typography>
          ) : (
            <Carousel>
              {gymImages.map((image) => (
                <Item key={image.image_name} item={image} />
              ))}
            </Carousel>
          )}
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
              <Skeleton variant="text" height={400} width={700} />
            </section>
          ) : (
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                border: "1px solid #ccc",
                padding: "20px",
                borderRadius: "8px",
                width: "100%",
                marginTop: "40px",
                marginBottom: "50px",
              }}
            >
              {/* Left side */}
              <Box sx={{ width: "48%", paddingRight: "20px" }}>
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: "bold",
                    color: "darkblue",
                    textTransform: "uppercase",
                    marginBottom: "10px",
                  }}
                  gutterBottom
                >
                  {gymDetails[0].gym_name}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ marginBottom: "10px" }}
                  gutterBottom
                >
                  {gymDetails[0].description != null &&
                    `Description: ${gymDetails[0].description}`}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ marginBottom: "10px" }}
                  gutterBottom
                >
                  {gymDetails[0].timings != null &&
                    `Timings: ${gymDetails[0].timings}`}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ marginBottom: "10px" }}
                  gutterBottom
                >
                  {gymDetails[0].address != null &&
                    `Address: ${gymDetails[0].address}`}
                </Typography>
                <Typography
                  variant="h4"
                  sx={{ marginBottom: "10px" }}
                  gutterBottom
                >
                  <CurrencyRupeeIcon />
                  {gymDetails[0].gym_price}
                </Typography>
              </Box>
              {isauthenticated && (
                <Box
                  sx={{
                    width: "25%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <React.Fragment>
                    <Button
                      variant="outlined"
                      onClick={handleButtonClickAndOpenDialog}
                      sx={{ marginBottom: "20px" }}
                    >
                      Select Dates
                    </Button>
                    <Dialog onClose={handleClose} open={openDialog}>
                      <DialogTitle>Select Dates</DialogTitle>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <StaticDateRangePicker
                          value={selecteddate}
                          disablePast="true"
                          displayStaticWrapperAs="mobile"
                          onChange={(newValue) => {
                            setSelectedDate(newValue);
                          }}
                          onAccept={handleDateAccept}
                          onClose={handleDateCancel}
                          renderInput={() => null}
                        />
                      </LocalizationProvider>
                    </Dialog>
                    <Typography
                      variant="body1"
                      gutterBottom
                      sx={{ marginBottom: "20px" }}
                    >
                      {formattedStartDate != null && formattedStartDate}{" "}
                      {formattedEndDate != null && `- ${formattedEndDate}`}
                    </Typography>
                    <Typography
                      variant="body1"
                      gutterBottom
                      sx={{ marginBottom: "20px" }}
                    >
                      {bookingDates.length !== 0 &&
                        `Total Price: ${amount} Rs `}
                    </Typography>
                  </React.Fragment>
                  <Button
                    variant="contained"
                    onClick={
                      bookingDates.length === 0
                        ? () => toast.error(" Please Choose the dates")
                        : handlePayment
                    }
                  >
                    {" "}
                    Book
                  </Button>
                </Box>
              )}
            </Box>
          )}
        </main>
        <Tooltip title="Add To Wishlist">
          <Button
            style={{ marginLeft: 10 }}
            size="small"
            variant="contained"
            className="all-btn"
          >
            {<AiFillHeart fontSize={21} />}
          </Button>
        </Tooltip>
        <Tooltip title="Share">
          <Button
            style={{ marginLeft: 10 }}
            variant="contained"
            className="all-btn"
            startIcon={<AiOutlineShareAlt />}
            onClick={handleShareButtonClick}
          >
            Share
          </Button>
        </Tooltip>
        <ProductReview gym_id={gym_id} token={token} />

        <Typography
          sx={{
            marginTop: 10,
            marginBottom: 5,
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          Similar Products
        </Typography>
        {/* <Box>
                    <Box className='similarProduct' sx={{ display: 'flex', overflowX: 'auto', marginBottom: 10 }}>
                        {
                            similarProduct.filter().map(prod => (
                                <Link to={`/Detail/type/${prod.type}/${prod._id}`} key={prod._id}>
                                    <ProductCard prod={prod} />
                                </Link>
                            ))
                        }
                    </Box>
                </Box> */}
      </Container>
      <CopyRight sx={{ mt: 8, mb: 10 }} />
    </>
  );
};

export default ProductDetail;
