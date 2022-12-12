import { Button, Divider, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { editTodo, getCurrentData } from "../firebase.js";
import { NewTodoSchema } from "../validation/newtodo-schema";

export default function EditTodo() {
  const user = useSelector((state) => state.auth.user);
  const [currentTodo, setcurrentTodo] = useState([]);
  const [titlee, setTitle] = useState();
  const [descc, setDesc] = useState();
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    getCurrentData(id)
      .then((editTodoCurrent) => { 
        setDesc(editTodoCurrent.description)
        setTitle(editTodoCurrent.title)
        setcurrentTodo(editTodoCurrent);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // Todo 1 From admin

  const d = new Date();
  const createdTime =
    d.getFullYear().toString() +
    d.getMonth().toString() +
    d.getDate().toString();

  const formik = useFormik({
    initialValues: {
      title: titlee,
      description: descc,
      todostatus: "Pending",
    },
    validationSchema: NewTodoSchema,
    onSubmit: async (values, actions) => {
      await editTodo(
        id,
        values.title,
        values.description,
        values.todostatus,
        user,
        createdTime
      );

      navigate("/");
    },
  });

  return (
    <div>
      <Typography
        variant="h3"
        sx={{
          marginBottom: "1.2rem",
        }}
      >
        Edit Todo
      </Typography>
      <Divider
        variant="middle"
        sx={{ marginBottom: "1.6rem", marginLeft: "0" }}
      />

      <form onSubmit={formik.handleSubmit}>
        <TextField
          sx={{ mt: "20px" }}
          id="outlined-adornment-title"
          type="text"
          name="title"
          fullWidth
          value={titlee}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          error={formik.touched.title && Boolean(formik.errors.title)}
          helperText={formik.touched.title && formik.errors.title}
        />

        <TextField
          multiline
          sx={{ mt: "20px" }}
          id="outlined-adornment-description"
          type="text"
          rows={4}
          name="description"
          fullWidth
          value={descc}
          onChange={(e) => {
            setDesc(e.target.value);
          }}
          error={
            formik.touched.description && Boolean(formik.errors.description)
          }
          helperText={formik.touched.description && formik.errors.description}
        />

        <TextField
          sx={{ mt: "20px" }}
          id="outlined-adornment-todostatus"
          type={"todostatus"}
          label="Pending"
          name="todostatus"
          disabled
          fullWidth
          value={formik.values.todostatus}
          onChange={formik.handleChange}
          error={formik.touched.todostatus && Boolean(formik.errors.todostatus)}
          helperText={formik.touched.todostatus && formik.errors.todostatus}
        />
        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{ fontWeight: 700, pt: 1.4, pb: 1.6, mt: "20px" }}
        >
          Updated
        </Button>
      </form>
    </div>
  );
}
