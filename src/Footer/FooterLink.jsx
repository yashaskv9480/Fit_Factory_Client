import { Link } from "@mui/material";
import React from "react";

const FooterLink = ({ text }) => {
  return (
    <Link
      href="#"
      variant="p"
      component="a"
      sx={{
        fontSize: "1rem", // Adjusted font size to 1rem
        fontWeight: "bold", // Changed font weight to bold
        textDecoration: "none",
        color: "#414141",
        textTransform: "capitalize",
        "&:hover": {
          color: "#1c2859",
        },
      }}
    >
      {text}
    </Link>
  );
};

export default FooterLink;
