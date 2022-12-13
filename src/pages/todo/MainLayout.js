import { Container } from "@mui/system";
import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";

export default function MainLayout() {
  return (
    <div>

      <Header />
      
      <Container maxWidth="xl">
        <Outlet />
      </Container>
    </div>
  );
}
