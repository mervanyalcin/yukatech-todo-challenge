import { Button, Divider, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useFormik } from "formik";
import React from "react";
import { useSelector } from "react-redux";
import { newTodo } from "../firebase";
import { NewTodoSchema } from "../validation/newtodo-schema";

export default function NewTodo() {
  const user = useSelector((state) => state.auth.user);

  const formik = useFormik({
    initialValues: {
      title: "",
      todostatus: "Pending",
    },
    validationSchema: NewTodoSchema,
    onSubmit: async (values, actions) => {
      // console.log(user)
      await newTodo(values.title, values.todostatus, user);
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
        Add New To Do
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
          label="Title"
          name="title"
          fullWidth
          value={formik.values.title}
          onChange={formik.handleChange}
          error={formik.touched.title && Boolean(formik.errors.title)}
          helperText={formik.touched.title && formik.errors.title}
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
          variant="outlined"
          fullWidth
          sx={{ fontWeight: 700, pt: 1.4, pb: 1.6, mt: "20px" }}
        >
          ADD
        </Button>
      </form>
    </div>
  );
}
