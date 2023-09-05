import React,{ useState } from "react";
import { useNavigate } from "react-router-dom";
// import { Link } from "react-router-dom";
// @mui
import {
  Link,
  Stack,
  IconButton,
  InputAdornment,
  TextField,
  Checkbox,
  Button,
  Typography,
  Box,
  Snackbar,
} from "@mui/material";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
// components

// ----------------------------------------------------------------------

export default function RegisterForm() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [message, setMessage] = useState('');

  // prompt Box
  const [state, setState] = useState({
    vertical:'top',
    horizontal:'center',
  });
  const {vertical, horizontal} = state;
  
  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const handleUserNameChange = (event) => {
    setUserName(event.target.value);
  };
  
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };
  
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  
  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  const togglePasswordVisibility =() =>{
    setShowPassword(!showPassword);
  };

  const handleClick = () => {
    let isValid = true;
    let message = '';

    if (!userName || !email || !password || !confirmPassword) {
      isValid = false;
      message = 'Please fill in all fields.';
  } else if (password !== confirmPassword) {
      isValid = false;
      message = 'Passwords do not match.';
  } else if (password.length < 8) {
      isValid = false;
      message = 'Password should be at least 8 characters long.';
  } else if (!/[A-Z]/.test(password)) {
      isValid = false;
      message = 'Password must contain at least one uppercase letter.';
  } else {
      isValid = true; // Set isValid to true if all conditions pass
  }
  
  if (isValid) {
    const requestData = {
      email: email,
      password: password,
      // Add any other required registration data here
    };

    fetch('/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestData)
    })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        setMessage('Registration successful! Check your email for verification.');
        setOpenSnackbar(true);
        navigate("/login", { replace: true }); // Redirect to login page
      } else {
        setMessage("Registration failed");
        setOpenSnackbar(true);
      }
    })
    .catch(error => {
      setMessage("An error occurred");
      setOpenSnackbar(true);
    });
  } else {
    setMessage(message);
    setOpenSnackbar(true);
  }
};


  return (
    <>
      <Stack spacing={3}>
        <TextField
          name="name"
          label="User name"
          type="text"
          required="required"
          value={userName}
          onChange={handleUserNameChange}
        />
        <TextField
          name="email"
          label="Email address"
          type="text"
          required="required"
          value={email}
          onChange={handleEmailChange}
        />
        <TextField
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          required="required"
          value={password}
          onChange={handlePasswordChange}
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
          label="Confirm Password"
          type={showPassword ? 'text' : 'password'}
          required="required"
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
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
      </Stack>

      <Button
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        onClick={handleClick}
        sx={{ height: "70px", bgcolor: "#214392" }}
        style={{ fontSize: "24px", marginTop: "10px", borderRadius: "15px" }}
      >
        Register
      </Button>

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
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
        anchorOrigin={{vertical, horizontal}}
      />
    </>
  );
}
