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
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { Box } from "@mui/system";
import { deneme, getAllTodos, getTodosByUser } from "../firebase.js";
import { DeleteForever } from "@mui/icons-material";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";

export default function Home() {
  const user = useSelector((state) => state.auth.user);
  const todos = useSelector((state) => state.todos.todos);
  const location = useLocation();
  const navigate = useNavigate();
  const [datas, setDatas] = useState([]);

  const firebaseConfig = {
    apiKey: "AIzaSyAHWEvliIWSQZAo3xR_QwO4PT_upgPMRpE",
    authDomain: "yukatech-todo-challenge.firebaseapp.com",
    projectId: "yukatech-todo-challenge",
    storageBucket: "yukatech-todo-challenge.appspot.com",
    messagingSenderId: "299265507659",
    appId: "1:299265507659:web:0dac62378ae7e49b4528ce",
  };
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  useEffect(() => {
    (async () => {
      const colRef = collection(db, "todos");
      const snapshots = await getDocs(colRef);
      const docs = snapshots.docs.map((doc) => {
        const data = doc.data();
        data.id = doc.id;
        console.log(data)
        return data;
      });
      // const enaf = myArray.map((data) => {
      //   return data.id + "," + data.title + "," + data.createdby;
      // });
      setDatas(docs);
    })();
  }, []);

  // datas.map((data) => {
  //   console.log(data);
  // });

  if (!user) {
    return (
      <Navigate to={location.state?.return_url || "/login"} replace={true} />
    );
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
            {datas.map((data) => {
              <TableRow
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {"fewf"}
                </TableCell>
                <TableCell align="right">{"data"}</TableCell>
                <TableCell align="right">{} </TableCell>
                <TableCell align="right">
                  <DeleteForever />
                  {}
                </TableCell>
              </TableRow>;
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
