import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Container,
  InputAdornment,
  TextField,
} from "@mui/material";
import CurrencyRupee from "@mui/icons-material/CurrencyRupee";

const BookingTable = ({ bookings }) => {
  return (
    <>
      <Paper
        style={{
          overflow: "auto",
          maxHeight: "500px",
        }}
      >
        <TableContainer sx={{ maxHeight: "500px" }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead sx={{ position: "sticky", top: 0 }}>
              <TableRow>
                <TableCell sx={{ color: "#1976d2", fontWeight: "bold" }}>
                  Customer Name
                </TableCell>
                <TableCell sx={{ color: "#1976d2", fontWeight: "bold" }}>
                  Gym Name
                </TableCell>
                <TableCell sx={{ color: "#1976d2", fontWeight: "bold" }}>
                  Date
                </TableCell>
                <TableCell sx={{ color: "#1976d2", fontWeight: "bold" }}>
                  Price{" "}
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {bookings.map((booking) => (
                <React.Fragment key={booking.booking_id}>
                  <TableRow>
                    <TableCell component="th" scope="row">
                      {booking.name.toUpperCase()}
                    </TableCell>
                    <TableCell>{booking.gym_name.toUpperCase()}</TableCell>
                    <TableCell>{new Date(booking.booking_date).toLocaleDateString("en-US", { day: "numeric", month: "short", year: "numeric" })}</TableCell>
                    <TableCell>
                      <CurrencyRupee style={{ fontSize: "16px" }} />
                      {booking.amount}
                    </TableCell>
                  </TableRow>
                </React.Fragment>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </>
  );
};

export default BookingTable;
