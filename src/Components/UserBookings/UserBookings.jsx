import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Container,
  InputAdornment,
  Skeleton,
  TextField,
} from "@mui/material";
import CurrencyRupee from "@mui/icons-material/CurrencyRupee";
import Cookies from "js-cookie";
import { useEffect } from "react";
import Fit_Factory_api from "../../Fit_Factory_Api/Fit_Factory_api";
import { toast } from "react-toastify";
import { TbRuler } from "react-icons/tb";

const UserBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = Cookies.get("Authorization");

  useEffect(() => {
    getUserBookings();
  }, []);

  const getUserBookings = async () => {
    try {
      const response = await Fit_Factory_api.get(`/user/viewuserbookings/`, {
        headers: {
          Authorization: token,
        },
      });
      if (response.status == 200) {
        setLoading(false);
        setBookings(response.data);
      }
    } catch (err) {
      setLoading(false);
      toast.error("browser not support", { autoClose: 500, theme: "colored" });
      console.log(err);
    }
  };

  return (
    <>
      {loading ? (
        <section
          style={{
            display: "flex",
            flexWrap: "wrap",
            width: "100%",
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          <Skeleton variant="rectangular" height={200} width="200px" />
          <Skeleton variant="text" height={400} width={700} />
        </section>
      ) : (
        <Paper
          style={{
            overflow: "auto",
            marginLeft: "20px",
          }}
        >
          <TableContainer>
            <Table stickyHeader aria-label="sticky table">
              <TableHead sx={{ position: "sticky", top: 0 }}>
                <TableRow>
                  <TableCell sx={{ color: "#1976d2", fontWeight: "bold" }}>
                    Gym Name{" "}
                  </TableCell>
                  <TableCell sx={{ color: "#1976d2", fontWeight: "bold" }}>
                    Date
                  </TableCell>
                  <TableCell sx={{ color: "#1976d2", fontWeight: "bold" }}>
                    Price{" "}
                  </TableCell>
                </TableRow>
              </TableHead>
              {bookings.length > 0 ? (
                <TableBody>
                  {bookings.map((booking) => (
                    <React.Fragment key={booking.booking_id}>
                      <TableRow>
                        <TableCell component="th" scope="row">
                          {booking.gym_name.toUpperCase()}
                        </TableCell>
                        <TableCell>
                          {new Date(booking.booking_date).toLocaleDateString(
                            "en-US",
                            { day: "numeric", month: "short", year: "numeric" }
                          )}
                        </TableCell>
                        <TableCell>
                          <CurrencyRupee style={{ fontSize: "16px" }} />
                          {booking.amount}
                        </TableCell>
                      </TableRow>
                    </React.Fragment>
                  ))}
                </TableBody>
              ) : (
                <Typography
                  variant="h3"
                  sx={{
                    textAlign: "center",
                    marginTop: 10,
                    color: "#1976d2",
                    fontWeight: "bold",
                  }}
                >
                  No Bookings. Book Now . Stay Fit
                </Typography>
              )}
            </Table>
          </TableContainer>
        </Paper>
      )}
    </>
  );
};

export default UserBookings;
