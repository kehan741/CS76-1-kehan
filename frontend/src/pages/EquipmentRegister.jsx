import * as React from "react";
import NavSection from "../components/Navbar/navbar";
import { Container, Box, Typography, Button } from "@mui/material";
import RegisterDialog from "../components/Navbar/RegisterDialog";

export default function EquipmentRegister() {
  return (
    <div
      style={{ display: "flex", backgroundColor: "#f9fafb", height: "100vh" }}
    >
      <NavSection />
      <Container
        maxWidth="xl"
        sx={{ ml: 5, mr: 5 }}
        style={{
          flex: 1,
          marginTop: "80px",
          backgroundColor: "white",
          boxShadow: "4px 4px 30px 5px rgba(153, 153, 153, 0.21)",
          borderRadius: "10px",
        }}
      >
        <RegisterDialog />
      </Container>
    </div>
  );
}
