import React, { useState } from 'react'
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

}
    from '@mui/material'
import { Link } from 'react-router-dom';
import { AiOutlineSearch } from 'react-icons/ai';
import AddUser from '../AddUser';
const UserTable = ({ users }) => {

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
                 Name
                </TableCell>
                <TableCell sx={{ color: "#1976d2", fontWeight: "bold" }}>
                Email
                </TableCell>
                <TableCell sx={{ color: "#1976d2", fontWeight: "bold" }}>
                   Mobile
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <React.Fragment key={user.user_id}>
                  <TableRow>
                    <TableCell component="th" scope="row">
                      {user.name}
                    </TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.mobile}</TableCell>
                  </TableRow>
                </React.Fragment>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </>
    )
}

export default UserTable