import './Desktop.css'
import React, { useContext, useEffect, useState } from 'react'
import { AiOutlineHeart, AiOutlineShoppingCart, AiFillCloseCircle, AiFillAmazonCircle, AiFillTool, AiOutlineCopy } from 'react-icons/ai'
import { CgProfile } from 'react-icons/cg'
import { FiLogOut } from 'react-icons/fi'
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Badge, Button, Dialog, DialogActions, DialogContent, Menu, MenuItem, Slide, Tooltip, Typography } from '@mui/material';
import { ContextFunction } from '../Context/Context';
import { toast } from 'react-toastify';
import { getCart, getWishList, handleClickOpen, handleClose, Transition } from '../Constants/Constant'
import Cookies from 'js-cookie'
import Fit_Factory_api from '../Fit_Factory_Api/Fit_Factory_api'
import { useAuth } from '../Auth/useAuth/useAuth'

const DesktopNavigation = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [proceed,setProceed] = useState(false)
  const auth = useAuth();
  const token = auth ?  auth.token : null
  const open = Boolean(anchorEl);
  const { cart, setCart, wishlistData, setWishlistData } = useContext(ContextFunction)
  const [openAlert, setOpenAlert] = useState(false);
  const navigate = useNavigate()

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };


  const handleLogOut = () => {
    if (setProceed) {
        Cookies.remove('Authorization')
        toast.success("Logout Successfully", { autoClose: 500, theme: 'colored' })
        navigate('/')
        window.location.reload()
        setOpenAlert(false)
    }
    else {
        toast.error("User is already logged of", { autoClose: 500, theme: 'colored' })
    }
}

  
  return (
    <>
      <nav className='nav'>
        <div className="logo">
          <Link to='/'>
            <span >Fit Factory</span>
          </Link>
        </div>
        <div className="nav-items">
          <ul className="nav-items">
            <li className="nav-links">
              <NavLink to='/'>
                <span className='nav-icon-span'>  Home</span>
              </NavLink>
            </li>
            {/* <li className="nav-links">
              <NavLink to='/contact'>
                <span className='nav-icon-span'>  Contact Us</span>
              </NavLink>
            </li> */}
            {/* <li className="nav-links">
              <Tooltip>
                <NavLink to="/wishlist">
                  <span className='nav-icon-span'>About Us  <Badge badgeContent={setProceed ? wishlistData.length : 0}> <AiOutlineCopy className='nav-icon' /></Badge></span>
                </NavLink>
              </Tooltip>
            </li> */}

            {
              token ?
                <>
                  <li className="nav-links">
                    <Tooltip title='Profile'>
                      <NavLink to='/update'>
                        <span className='nav-icon-span'>  <CgProfile style={{ fontSize: 29, marginTop: 7,marginRight:10 }} /></span>
                      </NavLink>
                    </Tooltip>
                  </li>
                  <li style={{ display: 'flex', alignItems: 'center', justifyItems: 'center' }} onClick={() => handleClickOpen(setOpenAlert)}>
                    <Button variant='contained' className='nav-icon-span' sx={{ marginBottom: 1 }} endIcon={<FiLogOut />}>
                      <Typography variant='button'> Logout</Typography>
                    </Button>
                  </li>
                </>
                :
                <>
                            <li className="nav-links">
              <Tooltip >
                <NavLink to="/register/user">
                  <span className='nav-icon-span'> User Signup <Badge badgeContent={setProceed ? cart.length : 0}> <CgProfile className='nav-icon' /></Badge></span>
                </NavLink>
              </Tooltip>
              </li>
                  <li className="nav-links">
                <Tooltip title="Client login/Signup">
                  
                  <NavLink to="/register/client">
                    <span className='nav-icon-span'> Client Signup <Badge badgeContent={setProceed ? cart.length : 0}> <AiFillTool className='nav-icon' /></Badge></span>
                  </NavLink>
                </Tooltip>
              </li>
                <li className="nav-links">
                  <Tooltip title='Login'>
                    <NavLink to='/login'>
                    <span className='nav-icon-span'> Login<Badge badgeContent={setProceed ? cart.length : 0}> </Badge></span>
                    </NavLink>
                  </Tooltip>
                </li>
                </>             
            }
          </ul>
        </div>
      </nav >
      <Dialog
        open={openAlert}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogContent sx={{ width: { xs: 280, md: 350, xl: 400 }, display: 'flex', justifyContent: 'center' }}>
          <Typography variant='h6'>  Do You Want To Logout?</Typography>
        </DialogContent>
        <DialogActions sx={{ display: 'flex', justifyContent: 'space-evenly' }}>
          <Link to="/">
            <Button variant='contained' endIcon={<FiLogOut />} color='primary' onClick={handleLogOut}>Logout</Button></Link>
          <Button variant='contained' color='error' endIcon={<AiFillCloseCircle />} onClick={() => handleClose(setOpenAlert)}>Close</Button>
        </DialogActions>
      </Dialog>
    </>

  )
}

export default DesktopNavigation