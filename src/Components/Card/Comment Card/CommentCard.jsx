import {
  Avatar,
  Box,
  Button,
  Grid,
  Rating,
  SpeedDial,
  SpeedDialAction,
  SpeedDialIcon,
  TextField,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { AiFillEdit, AiFillDelete, AiOutlineSend } from "react-icons/ai";
import { GiCancel } from "react-icons/gi";
import { toast } from "react-toastify";
const CommentCard = ({ reviews }) => {
  return (
    <Grid
      container
      wrap="nowrap"
      spacing={2}
      sx={{
        backgroundColor: "#1976d",
        boxShadow: "0px 8px 13px rgba(0, 0, 0, 0.2)",
        borderRadius: 5,
        margin: "20px auto",
        width: "100%",
        height: "auto",
      }}
    >
      <Grid item>
        <Avatar alt="Customer Avatar" />
      </Grid>
      <Grid justifyContent="left" item xs zeroMinWidth>
        <h4 style={{ margin: 0, textAlign: "left" }}>{reviews.name}</h4>
        <p style={{ textAlign: "left", marginTop: 10 }}>
          <Rating
            name="read-only"
            value={reviews.rating}
            readOnly
            precision={0.5}
          />
        </p>
        <p
          style={{
            textAlign: "left",
            wordBreak: "break-word",
            paddingRight: 10,
            margin: "10px 0",
          }}
        >
          {reviews.review}
        </p>
      </Grid>
    </Grid>
  );
};

export default CommentCard;
