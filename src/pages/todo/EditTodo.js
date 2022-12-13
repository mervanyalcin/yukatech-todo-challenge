import {
  Button,
  Divider,
  FormControl,
  MenuItem,
  Modal,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { editTodo, getCurrentData } from "../../firebase.js";
import { NewTodoSchema } from "../../validation/newtodo-schema";

export default function EditTodo() {
  const user = useSelector((state) => state.auth.user);

  const [formValues, setFormValues] = useState([]);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [todostatus2, setTodostatus] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    getCurrentData(id)
      .then((editTodoCurrent) => {
        setTitle(editTodoCurrent?.title);
        setDesc(editTodoCurrent?.description);
        setTodostatus(editTodoCurrent?.todostatus);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  const d = new Date();
  const createdTime =
    d.getFullYear().toString() +
    d.getMonth().toString() +
    d.getDate().toString();

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: title,
      description: desc,
      todostatus: todostatus2,
    },
    validationSchema: NewTodoSchema,
    onSubmit: async (values, actions) => {
      setFormValues(values);
      setModalOpen(true);
    },
  });

  const formHandleChange = (event) => {
    setTodostatus(event.target.value);
  };

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
          sx={{ mt: "30px" }}
          id="outlined-adornment-title"
          type="text"
          name="title"
          fullWidth
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          error={formik.touched.title && Boolean(formik.errors.title)}
          helperText={formik.touched.title && formik.errors.title}
        />
        <TextField
          multiline
          sx={{ mt: "30px" }}
          id="outlined-adornment-description"
          type="text"
          rows={4}
          name="description"
          fullWidth
          value={desc}
          onChange={(e) => {
            setDesc(e.target.value);
          }}
          error={
            formik.touched.description && Boolean(formik.errors.description)
          }
          helperText={formik.touched.description && formik.errors.description}
        />

        <FormControl fullWidth sx={{ mt: "30px" }}>
          <Select
            id="outlined-adornment-todostatus"
            type={"text"}
            name="todostatus"
            fullWidth
            value={todostatus2}
            onChange={formHandleChange}
          >
            <MenuItem value={"Pending"}>Pending</MenuItem>
            <MenuItem value={"Completed"}>Complete</MenuItem>
            <MenuItem value={"Deleted"}>Delete</MenuItem>
          </Select>
        </FormControl>

        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{ fontWeight: 700, pt: 1.4, pb: 1.6, mt: "20px" }}
        >
          Update
        </Button>

        <Modal
          hideBackdrop
          open={modalOpen}
          aria-labelledby="parent-modal-title"
          aria-describedby="parent-modal-description"
        >
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 400,
              bgcolor: "background.paper",
              border: "2px solid #eee",
              borderRadius: "8px",
              pt: 2,
              px: 4,
              pb: 3,
              backgroundColor: "white",
              boxShadow: "0 0 30px #999",
            }}
          >
            <h2 id="parent-modal-title">Are you sure?</h2>
            <p id="parent-modal-description">
              Do you really want to change what to do titled {" : "}
              <Typography variant="strong" component={"strong"}>
                {title}
              </Typography>
            </p>
            <Button
              variant="outlined"
              onClick={async () => {
                await editTodo(
                  id,
                  formValues.title,
                  formValues.description,
                  formValues.todostatus,
                  user,
                  createdTime
                );
                navigate("/");
              }}
            >
              Confirm
            </Button>
            <Button
              variant="outlined"
              onClick={async () => {
                setModalOpen(false);
              }}
            >
              Cancel
            </Button>
          </Box>
        </Modal>
      </form>
    </div>
  );
}
