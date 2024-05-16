import React from "react";
import { Box, Grid, styled, Typography } from "@mui/material";
import Title from "./Title";
import homeImage1 from "./home_image1.png";
import homeImage2 from "./home_image2.png";
import homeImage3 from "./home_image3.png";

const GetStarted = () => {
  const CustomGridItem = styled(Grid)({
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  });

  const CustomTypography = styled(Typography)({
    fontSize: "1.1rem",
    textAlign: "start",
    lineHeight: "1.5",
    color: "#515151",
    marginTop: "1.5rem",
  });

  return (
    <Grid
      container
      spacing={{ xs: 4, sm: 4, md: 0 }}
      sx={{
        py: 10,
        px: 2,
      }}
    >
      <CustomGridItem item xs={12} sm={8} md={6} component="section">
        <Box
          component="article"
          sx={{
            px: 4,
          }}
        >
          <Title text={"Workout Anytime, Anywhere"} textAlign={"start"} />
          <CustomTypography>
            Explore nearby GYMs, check images, compare prices, review ratings.
            Book through the FIT FACTORY app & workout at your favourite GYM
            without paying admission & membership charge.
          </CustomTypography>
        </Box>
      </CustomGridItem>

      <Grid item xs={12} sm={4} md={6}>
        <img
          src={homeImage1}
          alt=""
          style={{
            width: "100%",
          }}
        />
      </Grid>

      <Grid
        item
        xs={12}
        sm={4}
        md={6}
        sx={{
          order: { xs: 4, sm: 4, md: 3 },
        }}
      >
        <img
          src={homeImage3}
          alt=""
          style={{
            width: "100%",
          }}
        />
      </Grid>

      <CustomGridItem
        item
        xs={12}
        sm={8}
        md={6}
        sx={{
          order: { xs: 3, sm: 3, md: 4 },
        }}
      >
        <Box
          component="article"
          sx={{
            px: 4,
          }}
        >
          <Title text={"Pay-per day"} textAlign={"start"} />
          <CustomTypography>
            Miss workout while travelling? Can’t go to GYM every day? Have a
            busy schedule? We have got your back. Workout at any gym and get
            unlimited time.
          </CustomTypography>
        </Box>
      </CustomGridItem>
    </Grid>
  );
};

export default GetStarted;
