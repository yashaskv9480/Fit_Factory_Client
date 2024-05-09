import "./Desktop.css";
import React, { useContext, useEffect, useState } from "react";
import {
  AiOutlineHeart,
  AiOutlineShoppingCart,
  AiFillCloseCircle,
  AiFillAmazonCircle,
  AiFillTool,
  AiOutlineCopy,
} from "react-icons/ai";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import { CgProfile } from "react-icons/cg";
import { FiLogOut } from "react-icons/fi";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  Badge,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Menu,
  MenuItem,
  MenuList,
  Slide,
  Tooltip,
  Typography,
} from "@mui/material";
import { ContextFunction } from "../Context/Context";
import { toast } from "react-toastify";
import {
  getCart,
  getWishList,
  handleClickOpen,
  handleClose,
  Transition,
} from "../Constants/Constant";

import { useAuth } from "../Auth/useAuth/useAuth";
import ListAltIcon from "@mui/icons-material/ListAlt";

const DesktopNavigation = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [userDropDownanchorEl, setuserDropDownanchorEl] = React.useState(null);
  const [clientDropDownanchorEl, setclientDropDownanchorEl] =
    React.useState(null);

  const [proceed, setProceed] = useState(false);
  const { isauthenticated, isClient, isUser, isAdmin, checkLoggedOut } =
    useAuth();
  const open = Boolean(anchorEl);
  const dropdownopen = Boolean(userDropDownanchorEl);
  const dropdownopen2 = Boolean(clientDropDownanchorEl);
  const [openAlert, setOpenAlert] = useState(false);
  const navigate = useNavigate();
  const anchorRef = React.useRef(null);

  const handleUserDropDownClick = (event) => {
    setuserDropDownanchorEl(event.currentTarget);
  };

  const handleClientDropDownClick = (event) => {
    setclientDropDownanchorEl(event.currentTarget);
  };

  const handleDropdownClose = () => {
    setclientDropDownanchorEl(null);
    setuserDropDownanchorEl(null);
  };

  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  const handleClose = () => {
    setAnchorEl(null);
    setOpenAlert(false);
  };

  const handleLogOut = async () => {
    if (setProceed) {
      await checkLoggedOut();
      toast.success("Logout Successfully", {
        autoClose: 500,
        theme: "colored",
      });
      navigate("/");
      // window.location.reload()
      setOpenAlert(false);
    } else {
      toast.error("User is already logged of", {
        autoClose: 500,
        theme: "colored",
      });
    }
  };

  return (
    <>
      <nav className="nav">
        <div className="logo">
          <Link to={isClient || isAdmin ? "/dashboard" : "/"}>
            <span>Fit Factory</span>
          </Link>
        </div>
        <div className="nav-items">
          <ul className="nav-items">
            {
              <li className="nav-links">
                <NavLink to={isClient || isAdmin ? "/dashboard" : "/"}>
                  <span className="nav-icon-span"> Home</span>
                </NavLink>
              </li>
            }
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

            {isauthenticated ? (
              <>
                {isUser && (
                  <>
                    <li className="nav-links">
                      <Tooltip title="Bookings">
                        <NavLink to="/user/bookings">
                          <span className="nav-icon-span">
                            {" "}
                            <ListAltIcon
                              style={{
                                fontSize: 29,
                                marginTop: 7,
                                marginRight: 10,
                              }}
                            />
                          </span>
                        </NavLink>
                      </Tooltip>
                    </li>
                    <li className="nav-links">
                      <Tooltip title="Profile">
                        <NavLink to="/update">
                          <span className="nav-icon-span">
                            {" "}
                            <CgProfile
                              style={{
                                fontSize: 29,
                                marginTop: 7,
                                marginRight: 10,
                              }}
                            />
                          </span>
                        </NavLink>
                      </Tooltip>
                    </li>
                  </>
                )}
                {isClient && (
                  <li className="nav-links">
                    <Tooltip title="Profile">
                      <NavLink to="/update">
                        <span className="nav-icon-span">
                          {" "}
                          <FitnessCenterIcon
                            style={{
                              fontSize: 29,
                              marginTop: 7,
                              marginRight: 10,
                            }}
                          />
                        </span>
                      </NavLink>
                    </Tooltip>
                  </li>
                )}
                <li
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyItems: "center",
                  }}
                  onClick={() => handleClickOpen(setOpenAlert)}
                >
                  <Button
                    variant="contained"
                    className="nav-icon-span"
                    sx={{ marginBottom: 1 }}
                    endIcon={<FiLogOut />}
                  >
                    <Typography variant="button"> Logout</Typography>
                  </Button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-links">
                  <Button
                    id="user-button"
                    aria-controls={dropdownopen ? "user-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={dropdownopen ? "true" : undefined}
                    onClick={handleUserDropDownClick}
                  >
                    <NavLink>
                      <span className="nav-icon-span">
                        {" "}
                        User{" "}
                        <Badge>
                          {" "}
                          <CgProfile className="nav-icon" />
                        </Badge>
                      </span>
                    </NavLink>
                  </Button>
                  <Menu
                    id="user-menu"
                    anchorEl={userDropDownanchorEl}
                    open={dropdownopen}
                    onClose={handleDropdownClose}
                    MenuListProps={{
                      "aria-labelledby": "user-button",
                    }}
                  >
                    <MenuItem onClick={handleDropdownClose}>
                      <NavLink to="/user/register">
                        <span>Signup</span>
                      </NavLink>
                    </MenuItem>
                    <MenuItem onClick={handleDropdownClose}>
                      <NavLink to="/user/login">
                        <span>Login</span>
                      </NavLink>
                    </MenuItem>
                  </Menu>
                </li>
                <li className="nav-links">
                  <Button
                    id="client-button"
                    aria-controls={dropdownopen2 ? "client-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={dropdownopen2 ? "true" : undefined}
                    onClick={handleClientDropDownClick}
                  >
                    <NavLink>
                      <span className="nav-icon-span">
                        Client
                        <Badge>
                          <FitnessCenterIcon className="nav-icon" />
                        </Badge>
                      </span>
                    </NavLink>
                  </Button>
                  <Menu
                    id="client-menu"
                    anchorEl={clientDropDownanchorEl}
                    open={dropdownopen2}
                    onClose={handleDropdownClose}
                    MenuListProps={{
                      "aria-labelledby": "client-button",
                    }}
                  >
                    <MenuItem onClick={handleDropdownClose}>
                      <NavLink to="/client/register">
                        <span>Signup</span>
                      </NavLink>
                    </MenuItem>
                    <MenuItem onClick={handleDropdownClose}>
                      <NavLink to="/client/login">
                        <span>Login</span>
                      </NavLink>
                    </MenuItem>
                  </Menu>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>
      <Dialog
        open={openAlert}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogContent
          sx={{
            width: { xs: 280, md: 350, xl: 400 },
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Typography variant="h6"> Do You Want To Logout?</Typography>
        </DialogContent>
        <DialogActions sx={{ display: "flex", justifyContent: "space-evenly" }}>
          <Link to="/">
            <Button
              variant="contained"
              endIcon={<FiLogOut />}
              color="primary"
              onClick={handleLogOut}
            >
              Logout
            </Button>
          </Link>
          <Button
            variant="contained"
            color="error"
            endIcon={<AiFillCloseCircle />}
            onClick={() => handleClose(setOpenAlert)}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DesktopNavigation;
