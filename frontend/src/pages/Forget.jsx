import { styled } from "@mui/material/styles";
import { Link } from "react-router-dom";
import {
  Container,
  Typography,
  Divider,
  Stack,
  Button,
  TextField,
} from "@mui/material";
// hooks

// components
import Forgetform from "../components/forgetform";
// sections

// ----------------------------------------------------------------------

const StyledRoot = styled("div")(({ theme }) => ({
  [theme.breakpoints.up("md")]: {
    display: "flex",
  },
}));

const StyledSection = styled("div")(({ theme }) => ({
  width: "100%",
  maxWidth: 600,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  boxShadow: "5px 5px 100px 1px rgba(0, 0, 0, 0.2)",
}));

const StyledContent = styled("div")(({ theme }) => ({
  maxWidth: 480,
  margin: "auto",
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
}));

// ----------------------------------------------------------------------

export default function Forget() {
  return (
    <div
      style={{
        padding: "0px",
        margin: "0px",
        backgroundColor: "#fff",
      }}
    >
      <StyledRoot>
        <StyledSection>
          <img
            src="/img/logo.jpg"
            alt="login"
            style={{ width: "100px", margin: "0px auto" }}
          />
          <Typography
            variant="h3"
            sx={{  mb: 5 }}
            style={{
              color: "#3C7EFF",
              textAlign: "center",
              fontFamily: "Ink Free",
              fontSize: "92px",
            }}
          >
            Change your password
          </Typography>

          <img
            src="/img/bg2.jpg"
            alt="login"
            style={{ width: "300px", margin: "0px auto" }}
          />
        </StyledSection>

        <Container maxWidth="sm">
          <StyledContent>
            <img
              src="/img/icon.jpg"
              alt="login"
              style={{ width: "100px", margin: "0px auto" }}
            />
            <Typography
              variant="h6"
              mb={5}
              style={{
                fontWeight: "700",
                textAlign: "center",
                color: "#214392",
              }}
            >
              Forget Your Password?
            </Typography>

            <Typography
              variant="body2"
              sx={{ mb: 5, mt: -2 }}
              style={{ textAlign: "center" }}
            >
              Don’t worry our team will help you to Login again.
            </Typography>
            <Typography
              variant="body2"
              sx={{ mb: 5, mt: -2 }}
              style={{ textAlign: "center", fontWeight: "700" }}
            >
              Enter Your Email Address
            </Typography>

            <Forgetform />
          </StyledContent>
        </Container>
      </StyledRoot>
    </div>
  );
}
