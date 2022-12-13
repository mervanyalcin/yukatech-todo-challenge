import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { useNavigate } from "react-router-dom";
import { logout } from "../../../firebase.js";

function Header() {
  const navigate = useNavigate();

  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const logoutHandle = () => {
    logout();
    navigate("/login");
  };

  return (
    <AppBar position="static" sx={{ mb: "2rem" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Button
            sx={{
              mr: 1,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
            onClick={() => {
              navigate("/");
            }}
          >
            <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
            LOGO
          </Button>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              <MenuItem
                key={"todos"}
                onClick={() => {
                  navigate("/");
                }}
              >
                <Typography textAlign="center">Todos</Typography>
              </MenuItem>

              <MenuItem
                key={"newtodo"}
                onClick={() => {
                  navigate("/newtodo");
                }}
              >
                <Typography textAlign="center">Add Todo</Typography>
              </MenuItem>

              <MenuItem
                key={"logout"}
                onClick={() => {
                  logoutHandle();
                }}
              >
                <Typography textAlign="center">Logout</Typography>
              </MenuItem>
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            LOGO
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <Button
              sx={{ my: 2, color: "white", display: "block" }}
              onClick={() => {
                navigate("/");
              }}
            >
              Todos
            </Button>
            <Button
              sx={{ my: 2, color: "white", display: "block" }}
              onClick={() => {
                navigate("/newtodo");
              }}
            >
              New Todo
            </Button>
            <Button
              sx={{ my: 2, color: "white", display: "block" }}
              onClick={() => {
                logout();
              }}
            >
              Logout
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Header;
