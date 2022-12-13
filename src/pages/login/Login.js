import { Navigate } from "react-router-dom";
import { login } from "../../firebase.js";
import { useFormik } from "formik";
import { LoginSchema } from "../../validation/login-schema";
import { useSelector } from "react-redux";
import { Button, TextField, Typography } from "@mui/material";

export default function Login() {
  const user = useSelector((state) => state.auth.user);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: LoginSchema,
    onSubmit: async (values) => {
      await login(values.email, values.password);
    },
  });


  if (user !== null) {
    return <Navigate to={"/"} replace={true} />;
  } 

  

  return (
    <div>
      <div className="login-wrapper">
        <div className="login-center">
          <form onSubmit={formik.handleSubmit}>
            <Typography variant="h5" component="h5">
              User Login
            </Typography>
            <TextField
              sx={{ mt: "20px" }}
              id="outlined-adornment-email"
              type="email"
              label="Email"
              name="email"
              fullWidth
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
            <TextField
              sx={{ mt: "20px" }}
              id="outlined-adornment-password"
              type={"password"}
              label="Password"
              name="password"
              fullWidth
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
            <Button
              type="submit"
              variant="outlined"
              fullWidth
              sx={{ fontWeight: 700, pt: 1.4, pb: 1.6, mt: "20px" }}
            >
              Login
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
