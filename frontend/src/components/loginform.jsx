import React,{ useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
// @mui
import {
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

export default function LoginForm() {
  const navigate = useNavigate();

  
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [message, setMessage] = useState('');
  // prompt Box
  const [state, setState] = useState({
    vertical:'top',
    horizontal:'center',
  });
  const {vertical, horizontal} = state;


  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const togglePasswordVisibility =() =>{
    setShowPassword(!showPassword);
  };

  const handleClick = () => {
    // whethe input the email and pwd
    if (email !== '' && password !== '') {
      navigate('/dashboard', { replace: true });

        // Constructing request parameters
        const requestData = {
          email: email,
          password: password
        };
  
        // Send POST request
        fetch('http://localhost:3005/api/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(requestData)
        })
          .then(response => response.json())
          .then(data => {
            // Processing data returned by the interface
            console.log(data);
            if (data.success) {
              // Login Success Logic
              setMessage("Login successful");
              setOpenSnackbar(true);

            } else {
              // Login Failure Logic
              setMessage("Login failed");
              setOpenSnackbar(true);
            console.log("登录失败");
            }
          })
          .catch(error => {
           // Error handling logic
            setMessage("An error occurred");
            setOpenSnackbar(true);
            console.log("没连通");
          });  

    } else {
      // prompt box
      setMessage("Please fill in all fields!");
      setOpenSnackbar(true);

    }
  };

  return (
    <>
      <Stack spacing={3}>
        <TextField
          name="email"
          label="Email address"
          type="text"
          required
          value={email}
          onChange={handleEmailChange}
        />

        <TextField
          name="password"
          label="Password"
          required="required"
          type={showPassword ? 'text' : 'password'}
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
      </Stack>

      <Box
        sx={{
          my: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="subtitle2" underline="hover">
          <Checkbox name="remember" label="Remember me" />
          Remember me
        </Typography>
        <Link
          to="/forgetpwd"
          variant="subtitle2"
          underline="hover"
          style={{ textDecoration: "none", color: "black" }}
        >
          Forgot password?
        </Link>
      </Box>

      <Button
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        onClick={handleClick}
        sx={{ height: "70px", bgcolor: "#214392" }}
        style={{ fontSize: "24px", borderRadius: "15px" }}
      >
        Login
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
