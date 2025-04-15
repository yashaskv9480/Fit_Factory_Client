import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Tab, Tabs, Typography, Box, useMediaQuery, Grid } from "@mui/material";
import ProductChart from "./Charts/ProductChart";
import UserTable from "./Tables/UserTable";
import axios from "axios";
import ProductTable from "./Tables/ProductTable";
import { VscGraph } from "react-icons/vsc";
import { CgProfile } from "react-icons/cg";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { FaShippingFast } from "react-icons/fa";
import { TbReportMoney } from "react-icons/tb";
import OrderTable from "./Tables/OrderTable";
import Widget from "./Widget";
import { useAuth } from "../../Auth/useAuth/useAuth";
import Fit_Factory_api from "../../Fit_Factory_Api/Fit_Factory_api";
import Cookies from "js-cookie";
import GymTable from "./Tables/GymTable";
import BookingTable from "./Tables/BookingTable";
import ListAltIcon from "@mui/icons-material/ListAlt";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import MoneyIcon from "@mui/icons-material/Money";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children} </Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs() {
  const { isClient, isAdmin } = useAuth();
  const [value, setValue] = useState(0);
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [clients, setClients] = useState([]);
  const [allBookings, setAllBookings] = useState([]);
  const token = Cookies.get("Authorization");

  useEffect(() => {
    getBookings();
    getUsers();
    getClients();
    getAllBookings();
  }, []);

  const getBookings = async () => {
    try {
      const bookingResponse = await Fit_Factory_api.get(
        "/client/bookingdetails",
        {
          headers: {
            Authorization: token,
          },
        },
      );
      if (bookingResponse.status == 200) {
        console.log(bookingResponse.data);
        setBookings(bookingResponse.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getUsers = async () => {
    try {
      const usersResponse = await Fit_Factory_api.get("/admin/viewusers", {
        headers: {
          Authorization: token,
        },
      });
      if (usersResponse.status == 200) {
        console.log(usersResponse.data);
        setUsers(usersResponse.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const getClients = async () => {
    try {
      const clientResponse = await Fit_Factory_api.get("/admin/viewclients", {
        headers: {
          Authorization: token,
        },
      });
      if (clientResponse.status == 200) {
        setClients(clientResponse.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getAllBookings = async () => {
    try {
      const allbookingresponse = await Fit_Factory_api.get(
        "/admin/viewallbookings",
        {
          headers: {
            Authorization: token,
          },
        },
      );
      if (allbookingresponse.status == 200) {
        setAllBookings(allbookingresponse.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const totalClientRevenue = bookings.reduce((total, booking) => {
    return total + booking.amount;
  }, 0);

  const totalRevenue = allBookings.reduce((total, booking) => {
    return total + booking.amount;
  }, 0);

  const isSmallScreen = useMediaQuery("(max-width:600px)");

  return (
    <Box sx={{ width: "100%" }}>
      {isClient && (
        <Grid
          container
          spacing={2}
          direction={isSmallScreen ? "column" : "row"}
          padding={1}
        >
          <Grid item xs={12} sm={6} md={6} lg={3}>
            <Widget
              numbers={bookings.length}
              heading="Total Bookings"
              color="#9932CC"
              icon={<ListAltIcon />}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={3}>
            <Widget
              numbers={totalClientRevenue}
              heading="Total Bookings Amount"
              color="#FFC300"
              icon={<MoneyIcon />}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={3}>
            <Widget
              numbers={totalClientRevenue * 0.8}
              heading="Revenue Generated"
              color="#FFC300"
              icon={<CurrencyRupeeIcon />}
            />
          </Grid>
        </Grid>
      )}
      {isAdmin && (
        <Grid
          container
          spacing={2}
          direction={isSmallScreen ? "column" : "row"}
          padding={1}
        >
          <Grid item xs={12} sm={6} md={6} lg={3}>
            <Widget
              numbers={users.length}
              heading="Total Users"
              color="#9932CC"
              icon={<CgProfile />}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={3}>
            <Widget
              numbers={clients.length}
              heading="Total Gyms"
              color="#FFC300"
              icon={<FitnessCenterIcon />}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={3}>
            <Widget
              numbers={allBookings.length}
              heading="Total Bookings"
              color="#FF69B4"
              icon={<ListAltIcon />}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={3}>
            <Widget
              numbers={totalRevenue}
              heading="Total Bookings Amount"
              color="#1f77b4  "
              icon={<MoneyIcon />}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={3}>
            <Widget
              numbers={totalRevenue * 0.2}
              heading="Revenue Generated"
              color="#1f77b4  "
              icon={<CurrencyRupeeIcon />}
            />
          </Grid>
        </Grid>
      )}
      <Box
        sx={{
          borderBottom: 1,
          borderColor: "divider",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: 5,
        }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          style={{ overflowX: "auto" }}
        >
          {isAdmin && (
            <Tab
              label={!isSmallScreen ? "Users" : null}
              {...a11yProps(0)}
              iconPosition="start"
              icon={<VscGraph fontSize={20} />}
            />
          )}
          {isAdmin && (
            <Tab
              label={!isSmallScreen ? "Gyms" : null}
              {...a11yProps(1)}
              iconPosition="start"
              icon={<CgProfile fontSize={20} />}
            />
          )}
          {isAdmin && (
            <Tab
              label={!isSmallScreen ? "Bookings" : null}
              {...a11yProps(2)}
              iconPosition="start"
              icon={<CgProfile fontSize={20} />}
            />
          )}
          {/* {isAdmin && (
            <Tab
              label={!isSmallScreen ? "Products" : null}
              {...a11yProps(2)}
              iconPosition="start"
              icon={<AiOutlineShoppingCart fontSize={20} />}
            />
          )} */}
          {isClient && (
            <Tab
              label={!isSmallScreen ? "Bookings" : null}
              {...a11yProps(3)}
              iconPosition="start"
              icon={<FaShippingFast fontSize={20} />}
            />
          )}
        </Tabs>
      </Box>
      {/* <TabPanel value={value} index={isAdmin && 0}>
        {isAdmin && (
          <ProductChart
            // products={products}
            review={review}
            cart={cart}
            wishlist={wishlist}
            // paymentData={paymentData}
            user={user}
          />
        )}
      </TabPanel> */}
      <TabPanel value={value} index={isAdmin && 0}>
        {isAdmin && <UserTable users={users} />}
      </TabPanel>
      <TabPanel value={value} index={isAdmin && 1}>
        {isAdmin && <GymTable gyms={clients} />}
      </TabPanel>
      <TabPanel value={value} index={isAdmin && 2}>
        {isAdmin && <BookingTable bookings={allBookings} />}
      </TabPanel>
      <TabPanel value={value} index={isClient && 0}>
        {isClient && <OrderTable bookings={bookings} />}
      </TabPanel>
    </Box>
  );
}
