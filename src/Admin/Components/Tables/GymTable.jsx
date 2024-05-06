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

const GymTable = ({ gyms }) => {
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
                  Owner Name
                </TableCell>
                <TableCell sx={{ color: "#1976d2", fontWeight: "bold" }}>
                  Email
                </TableCell>
                <TableCell sx={{ color: "#1976d2", fontWeight: "bold" }}>
                  Mobile
                </TableCell>
                <TableCell sx={{ color: "#1976d2", fontWeight: "bold" }}>
                  Gym Name
                </TableCell>
                <TableCell sx={{ color: "#1976d2", fontWeight: "bold" }}>
                  Location
                </TableCell>
                <TableCell sx={{ color: "#1976d2", fontWeight: "bold" }}>
                  Gym Price
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {gyms.map((gym) => (
                <React.Fragment key={gym.gym_id}>
                  <TableRow>
                    <TableCell component="th" scope="row">
                      {gym.name.toUpperCase()}
                    </TableCell>
                    <TableCell>{gym.email}</TableCell>
                    <TableCell>{gym.mobile}</TableCell>
                    <TableCell>{gym.gym_name.toUpperCase()}</TableCell>
                    <TableCell>{gym.location.toUpperCase()}</TableCell>
                    <TableCell>
                      <CurrencyRupee style={{ fontSize: "16px" }} />
                      {gym.gym_price}
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

export default GymTable;
