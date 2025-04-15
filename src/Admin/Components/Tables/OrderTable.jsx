import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Collapse,
  Typography,
} from "@mui/material";
import { MdKeyboardArrowDown } from "react-icons/md";
import { Link } from "react-router-dom";
import CurrencyRupee from "@mui/icons-material/CurrencyRupee";

const OrderTable = ({ bookings }) => {
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
                  Booking Date
                </TableCell>
                <TableCell sx={{ color: "#1976d2", fontWeight: "bold" }}>
                  Amount
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {bookings.map((booking) => (
                <React.Fragment key={booking.booking_id}>
                  <TableRow>
                    <TableCell component="th" scope="row">
                      {booking.name}
                    </TableCell>
                    <TableCell>
                      {new Date(booking.booking_date).toLocaleDateString(
                        "en-US",
                        { day: "numeric", month: "short", year: "numeric" },
                      )}
                    </TableCell>
                    <TableCell>
                      <CurrencyRupee style={{ fontSize: "18px" }} />
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

export default OrderTable;
