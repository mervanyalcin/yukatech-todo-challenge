import { Button, Divider, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { Box } from "@mui/system";
import { getAllTodos } from "../firebase.js";
import TodosList from "./components/TodosList.js";

export default function Home() {
  const user = useSelector((state) => state.auth.user);
  const todos = useSelector((state) => state.todos.todos);
  const navigate = useNavigate();
  const [alltodos, setAlltodos] = useState([]);

  useEffect(() => {
    getAllTodos();
    if (user?.status !== "admin") {
      const filterByUser = todos.filter((key) => {
        return key.uid === user.uid && key.todostatus !== "Deleted";
      });
      setAlltodos(filterByUser);
    } else {
      setAlltodos(todos);
    }
  }, []);
  

  
  if (user === null) {
    return <Navigate to="/login" />;
  }

  return (
    <div>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "1.2rem",
        }}
      >
        <Typography variant="h3">To Do List</Typography>

        <Button
          variant="contained"
          onClick={() => {
            navigate("/newtodo");
          }}
        >
          Add New To Do
        </Button>
      </Box>
      <Divider
        variant="middle"
        sx={{ marginBottom: "1.6rem", marginLeft: "0" }}
      />

      <TableContainer component={Paper}>
        <Table
          sx={{ minWidth: 650, fontWeight: "bold" }}
          aria-label="simple table"
        >
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>Title</TableCell>
              <TableCell sx={{ fontWeight: "bold" }} align="right">
                Created by
              </TableCell>
              <TableCell sx={{ fontWeight: "bold" }} align="right">
                Status
              </TableCell>
              <TableCell sx={{ fontWeight: "bold" }} align="right">
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {alltodos.map((data) => {
              return (
                <TodosList
                  key={data.id}
                  id={data.id}
                  title={data.title}
                  createdby={data.createdby}
                  todostatus={data.todostatus}
                />
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

// return <TodosList key={data.id} id={data.id} title={data.title} createdby={data.createdby} name={data.todostatus} />
