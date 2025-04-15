import React, { useEffect } from "react";
import { Container, Typography } from "@mui/material";
import CopyRight from "../Components/CopyRight/CopyRight";

const Unauthorized = () => {
  return (
    <>
      <Container
        maxWidth="xl"
        style={{
          display: "flex",
          justifyContent: "center",
          padding: 0,
          flexDirection: "column",
          marginBottom: 70,
        }}
      >
        <Typography
          variant="h3"
          sx={{
            textAlign: "center",
            marginTop: 10,
            color: "#1976d2",
            fontWeight: "bold",
          }}
        >
          Unauthorized
        </Typography>
      </Container>
      <CopyRight sx={{ mt: 8 }} />
    </>
  );
};

export default Unauthorized;
