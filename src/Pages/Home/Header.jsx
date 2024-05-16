import React, { useEffect, useState } from "react";
import { Box, Button, styled, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import logo from "./logo.png";
//img
// import headerImg from '../assets/pexels-binyamin-mellish-186078.png'

const Header = () => {
  const CustomBox = styled(Box)(({ theme }) => ({
    minHeight: "80vh",
    display: "flex",
    justifyContent: "center",
    // tamanhos
    gap: theme.spacing(2),
    paddingTop: theme.spacing(10),
    // cor de fundo
    [theme.breakpoints.down("md")]: {
      flexDirection: "column",
      alignItems: "center",
      textAlign: "center",
    },
  }));

  const BoxText = styled(Box)(({ theme }) => ({
    flex: "1",
    paddingLeft: theme.spacing(8),
    [theme.breakpoints.down("md")]: {
      flex: "2",
      textAlign: "center",
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
    },
  }));

  const [index, setIndex] = useState(0);
  const navigate = useNavigate();
  const textArray = [
    "Gym memberships under-utilized?",
    "Committed to a particular gym?",
    "Miss workouts while travelling?",
    "Overpaying for workouts?",
  ];

  useEffect(() => {
    const intervalId = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % textArray.length);
    }, 3000);

    return () => clearInterval(intervalId);
  }, []);

  const handlenavigate = () => {
    navigate("/user/register");
  };

  return (
    <CustomBox component="header">
      {/*  Box text  */}
      <BoxText component="section">
        <Typography
          variant="h2"
          component="h1"
          sx={{
            fontWeight: 700,
            color: "#1976d2",
          }}
        >
          {textArray[index]}{" "}
        </Typography>

        <Typography
          variant="p"
          component="p"
          sx={{
            py: 3,
            lineHeight: 1.6,
            color: "#fff",
          }}
        >
          We have 9000 more review and our customers trust on out property and
          quality products.
        </Typography>

        <Box>
          <Button
            variant="contained"
            onClick={handlenavigate}
            sx={{
              mr: 2,
              px: 5, // Increased horizontal padding
              py: 2, // Increased vertical padding
              fontSize: "1rem", // Increased font size
              textTransform: "capitalize",
              borderRadius: 10, // Increased border radius for a more rounded look
              borderColor: "#14192d",
              color: "#fff",
              backgroundColor: "#14192d",
              "&:hover": {
                // Simplified hover effect syntax
                backgroundColor: "#343a55",
              },
              "&:focus": {
                // Simplified focus effect syntax
                backgroundColor: "#343a55",
              },
            }}
          >
            Book now
          </Button>
        </Box>
      </BoxText>

      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end", // Align items horizontally to the right
          alignItems: "flex-start", // Align items vertically to the top
          paddingTop: "20px", // Add some top padding for spacing
          paddingRight: "20px", // Add some right padding for spacing
        }}
      >
        <img
          src={logo}
          alt="headerImg"
          style={{
            width: "80%",
            height: "80%", // Adjust the width of the image
          }}
        />
      </Box>
    </CustomBox>
  );
};

export default Header;
