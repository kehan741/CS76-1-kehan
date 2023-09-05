import { styled } from "@mui/material/styles";
import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  IconButton,
  InputAdornment,
  Stack,
  Button,
  TextField,
  Snackbar,
} from "@mui/material";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';


const StyledContent = styled("div")(({ theme }) => ({
  maxWidth: 480,
  margin: "auto",
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
}));

export default function Change() {
  const [showPassword, setShowPassword] = useState(false);
  const [Password1, setPassword1] = useState();
  const [Password2, setPassword2] = useState();
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [message, setMessage] = useState("");
  const [state, setState] = useState({
    vertical: "top",
    horizontal: "center",
  });
  const { vertical, horizontal } = state;
  var isValid = true;
  const navigate = useNavigate();

  useEffect(() => {
    if (Password1 == undefined || Password2 == undefined) {
      isValid = false;
      setMessage("Please fill in all fields.");
    } else if (Password1 !== Password2) {
      isValid = false;
      setMessage("Passwords do not match.");
    } else if (Password1.length < 8 || Password2.length < 8) {
      isValid = false;
      setMessage("Password should be at least 8 characters long.");
    } else if (!/[A-Z]/.test(Password1)) {
      isValid = false;
      setMessage("Password must contain at least one uppercase letter.");
    }
  });

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const handleSetpwd1 = (e) => {
    setPassword1(e.target.value);
  };
  const handleSetpwd2 = (e) => {
    setPassword2(e.target.value);
  };

  const togglePasswordVisibility =() =>{
    setShowPassword(!showPassword);
  };

  const handleClick = (e) => {
    e.preventDefault();

    if (isValid) {
      const requestData = {
        password: Password1,
        // Add any other required registration data here
      };
      fetch("/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            setMessage(
              "Password change successful! Check your email for verification."
            );
            setOpenSnackbar(true);
            navigate("/login", { replace: true }); // Redirect to login page
          } else {
            setMessage("Registration failed");
            setOpenSnackbar(true);
          }
        })
        .catch((error) => {
          setMessage("An error occurred");
          setOpenSnackbar(true);
        });
    } else {
      setOpenSnackbar(true);
    }
  };
  return (
    <>
      <Container maxWidth="sm">
        <StyledContent>
          <Typography
            variant="h6"
            mb={5}
            style={{
              fontWeight: "700",
            }}
          >
            Reset Your Password
          </Typography>
          <Link to={"/login"} style={{ color: "blue", textDecoration: "none" }}>
            Back
          </Link>

          <TextField
            name="password"
            label="Please enter your new password"
            type={showPassword ? 'text' : 'password'}
            required="required"
            style={{ margin: "30px 0" }}
            value={Password1}
            onChange={handleSetpwd1}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={togglePasswordVisibility}>
                    {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <TextField
            name="password"
            label="Please confirm your password"
            type={showPassword ? 'text' : 'password'}
            required="required"
            value={Password2}
            onChange={handleSetpwd2}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={togglePasswordVisibility}>
                    {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Button
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            onClick={handleClick}
            sx={{ height: "70px", bgcolor: "#214392", marginTop: "30px" }}
            style={{ fontSize: "24px", borderRadius: "15px" }}
          >
            Set
          </Button>
        </StyledContent>

        <Snackbar
          //Determines if the snackbar is open or not
          open={openSnackbar}
          //anchorOrigin={{vertical, horizontal}}
          //Time in milliseconds before snackbar automatically closes
          autoHideDuration={3000}
          //Function to call when the snackbar is closed
          onClose={handleCloseSnackbar}
          message={message}
          sx={{
            //position: 'fixed',
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
          anchorOrigin={{ vertical, horizontal }}
        />
      </Container>
    </>
  );
}
