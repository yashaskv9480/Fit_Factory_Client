import './Productsimilar.css'
import React, { useEffect, useState, useContext } from 'react'
import { useParams, Link } from 'react-router-dom'
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
} from '@mui/material';
import { MdAddShoppingCart } from 'react-icons/md'
import { AiFillHeart, AiFillCloseCircle, AiOutlineLogin, AiOutlineShareAlt } from 'react-icons/ai'
import Carousel from 'react-material-ui-carousel';
import {TextField} from '@mui/material';
import { TbDiscount2 } from 'react-icons/tb'
import axios from 'axios';
import { toast } from 'react-toastify';
import { ContextFunction } from '../../Context/Context';
import ProductReview from '../../Components/Review/ProductReview';
import ProductCard from '../../Components/Card/GymCard/GymCard';
import { Transition, getSingleProduct } from '../../Constants/Constant';
import CopyRight from '../../Components/CopyRight/CopyRight';
import { FaLessThanEqual } from 'react-icons/fa';
import {Paper} from '@mui/material';
import Fit_Factory_api from '../../Fit_Factory_Api/Fit_Factory_api';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { StaticDateRangePicker } from '@mui/x-date-pickers-pro/StaticDateRangePicker';
import { pickersLayoutClasses } from '@mui/x-date-pickers/PickersLayout';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';





const ProductDetail = () => {
    const { cart, setCart, wishlistData, setWishlistData } = useContext(ContextFunction)
    const [openAlert, setOpenAlert] = useState(false);
    const { location, gym_id } = useParams()
    const [gymImages,setGymImages] = useState([])
    const [gymDetails,setGymDetails] = useState([])
    const [productQuantity, setProductQuantity] = useState(1)
    const [loading, setLoading] = useState(true);
    const [selecteddate,setSelectedDate] = useState(undefined)
    const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);



    let authToken = localStorage.getItem('Authorization')
    let setProceed = authToken ? true : false

    useEffect(() => {
        getGymDetails()
        window.scroll(0, 0)
    }, [])

    const getGymDetails = async () => {
        try{
             const response = await Fit_Factory_api.get(`/user/getsinglegym/${gym_id}`);
             console.log(response.data)
        if(response.status == 200){
            setLoading(false)
                setGymDetails(response.data.gymDetails)
                setGymImages(response.data.gymImages)
            }
        }
        catch(err){
            console.log(err)

        }
    }


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
    
    // const shareProduct = (product) => {

    //     const data = {
    //         text: product.name,
    //         title: "e-shopit",
    //         url: `https://e-shopit.vercel.app/Detail/type/${cat}/${id}`
    //     }
    //     if (navigator.canShare && navigator.canShare(data)) {
    //         navigator.share(data);
    //     }
    //     else {
    //         toast.error("browser not support", { autoClose: 500, theme: 'colored' })
    //     }

    // }
    // const getSimilarProducts = async () => {
    //     const { data } = await axios.post(`${process.env.REACT_APP_PRODUCT_TYPE}`, { userType: cat })
    //     setSimilarProduct(data)
    // }
    const handleDateChange = (event) => {
        console.log(event.target.value)
        setSelectedDate(event.target.value);
    };

    const handleBooking = () => {

    }

    const handleDateAccept = () => {
        setIsDatePickerOpen(false);
    };

    const handleDateCancel = () => {
        setIsDatePickerOpen(false);
    };
    const handleButtonClick = () => {
        setIsDatePickerOpen(true);
    };

    function Item({item})
{
    return (
        <Paper>
<img src={item.image_url} alt={item.image_name} height={"550px"} width={"90%"}/>
        </Paper>
    )
}
    return (
        <>
            <Container maxWidth='xl' >
                <Dialog
                    open={openAlert}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={() => setOpenAlert(false)}
                    aria-describedby="alert-dialog-slide-description"
                >
                    <DialogContent sx={{ width: { xs: 280, md: 350, xl: 400 } }}>
                        <DialogContentText style={{ textAlign: 'center' }} id="alert-dialog-slide-description">
                            Please Login To Proceed
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions sx={{ display: 'flex', justifyContent: 'space-evenly' }}>
                        <Link to="/login"> <Button variant='contained' endIcon={<AiOutlineLogin />} color='primary'>Login</Button></Link>
                        <Button variant='contained' color='error'
                            onClick={() => setOpenAlert(false)} endIcon={<AiFillCloseCircle />}>Close</Button>
                    </DialogActions>
                </Dialog>

                <main className='main-content'>
                    {loading ? (
                        <Skeleton variant='rectangular' height={400} />
                    ) : (
                        <Carousel>
                        {
                            gymImages.map( image => <Item key={image.image_name} item={image} /> )
                        }
                    </Carousel>
                    )}
                {loading ? (
                        <section style={{ display: 'flex', flexWrap: "wrap", width: "100%", justifyContent: "space-around", alignItems: 'center' }}>
                            <Skeleton variant='rectangular' height={200} width="200px" />
                            <Skeleton variant='text' height={400} width={700} />
                        </section>
                    ) : (
                        gymImages.length == 0 ? (
                            <Typography sx={{ textAlign: 'center' }}>No images have been uploaded by Owner</Typography>
                        ) : (
                            <Box sx={{ 
                                display: 'flex', 
                                justifyContent: 'space-between', 
                                alignItems: 'flex-start', 
                                border: '1px solid #ccc', 
                                padding: '20px', 
                                borderRadius: '8px',
                                width: '90%',  // Adjust the width of the box as needed
                                margin: '0 auto',  // Center the box horizontally
                            }}>
                                {/* Left side */}
                                <Box sx={{ width: '48%', paddingRight: '20px' }}>
                                    <Typography variant="h4" gutterBottom>
                                        Gym Details
                                    </Typography>
                                    <Typography variant="body1" gutterBottom>
                                        Gym Name: ABC Gym
                                    </Typography>
                                    <Typography variant="body1" gutterBottom>
                                        Description: Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                    </Typography>
                                    <Typography variant="body1" gutterBottom>
                                        Location: XYZ Street, City
                                    </Typography>
                                    <Typography variant="body1" gutterBottom>
                                        Timings: 8:00 AM - 10:00 PM
                                    </Typography>
                                    <Typography variant="body1" gutterBottom>
                                        Address: 123 Main St, City
                                    </Typography>
                                    <Typography variant="h4" gutterBottom>
                                        Gym Price
                                    </Typography>
                                    <Typography variant="body1" gutterBottom>
                                        $50 per month
                                    </Typography>
                                </Box>
                    
                                {/* Right side */}
                                <Box sx={{ width: '52%', paddingLeft: '20px' }}>

                                <React.Fragment>
            <Button variant="outlined" onClick={handleButtonClick}>
                Select Dates
            </Button>

            {isDatePickerOpen && (
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <StaticDateRangePicker
                        value={selecteddate}
                        displayStaticWrapperAs="mobile"
                        onChange={handleDateChange}
                        onAccept={handleDateAccept}
                        onCancel={handleDateCancel}
                        renderInput={() => null} // Hide the input field
                    />
                </LocalizationProvider>
            )}

            {selecteddate && (
                <div>
                    Selected Dates: {selecteddate[0].toLocaleDateString()} to {selecteddate[1].toLocaleDateString()}
                </div>
            )}
        </React.Fragment>
                    
                                    {/* Book Button */}
                                    <Button variant="contained" onClick={handleBooking}>
                                        Book
                                    </Button>
                                </Box>
                            </Box>
                        )
                    )}
                </main>
                <Tooltip title='Add To Wishlist'>
                                    <Button style={{ marginLeft: 10, }} size='small' variant='contained' className='all-btn' >
                                        {<AiFillHeart fontSize={21}/>}
                                    </Button>

                                </Tooltip>
                                <Tooltip title='Share'>
                                    <Button style={{ marginLeft: 10 }} variant='contained' className='all-btn' startIcon={<AiOutlineShareAlt />}>Share</Button>
                                </Tooltip>
                <ProductReview setProceed={setProceed} authToken={authToken}  setOpenAlert={setOpenAlert} />
                

                <Typography sx={{ marginTop: 10, marginBottom: 5, fontWeight: 'bold', textAlign: 'center' }}>Similar Products</Typography>
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

            </Container >
            <CopyRight   sx={{ mt: 8, mb: 10 }} />

        </>
    )
}

export default ProductDetail