import "./singlecategory.css";
import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Container } from "@mui/system";
import { Typography, IconButton } from "@mui/material";
import Loading from "../Components/loading/Loading";
import ProductCard from "../Components/Card/GymCard/GymCard";
import CopyRight from "../Components/CopyRight/CopyRight";
import Fit_Factory_api from "../Fit_Factory_Api/Fit_Factory_api";
import GymCard from "../Components/Card/GymCard/GymCard";
import SearchBar from "../Components/SearchBar/SearchBar";
import Cookies from "js-cookie";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import WishListCard from "../Components/Card/WishListCard/WishListCard";

const Wishlist = () => {
  const [gyms, setGyms] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [filterOption, setFilterOption] = useState("All");
  const [title, setTitle] = useState("All");
  const { location } = useParams();
  const token = Cookies.get("Authorization");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    viewWishlist();
    window.scroll(0, 0);
  }, []);

  const viewWishlist = async () => {
    try {
      setIsLoading(true);
      const response = await Fit_Factory_api.get("/user/viewwishlist", {
        headers: {
          Authorization: token,
        },
      });
      if (response.status == 200) {
        console.log(response);
        const data = response.data;
        setIsLoading(false);
        setGyms(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const loading = isLoading ? (
    <Container
      maxWidth="xl"
      style={{
        marginTop: 10,
        display: "flex",
        justifyContent: "center",
        flexWrap: "wrap",
        paddingLeft: 10,
        paddingBottom: 20,
      }}
    >
      <Loading />
      <Loading />
      <Loading />
      <Loading />
      <Loading />
      <Loading />
      <Loading />
      <Loading />
    </Container>
  ) : (
    ""
  );
  return (
    <>
      <Container
        maxWidth="xl"
        style={{
          marginTop: 90,
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <SearchBar gyms={gyms} />

        {loading}
        {gyms.length == 0 ? (
          <Typography
            variant="h3"
            sx={{
              textAlign: "center",
              marginTop: 10,
              color: "#1976d2",
              fontWeight: "bold",
            }}
          >
            "No gyms available at the selected location"
          </Typography>
        ) : (
          <Container
            maxWidth="xl"
            style={{
              marginTop: 10,
              display: "flex",
              justifyContent: "center",
              flexWrap: "wrap",
              paddingBottom: 20,
              marginBottom: 30,
            }}
          >            {gyms.map((gym) => (
              <WishListCard gym={gym} token = {token}/>
            ))}
          </Container>
        )}
      </Container>
      <CopyRight sx={{ mt: 8, mb: 10 }} />
    </>
  );
};

export default Wishlist;
