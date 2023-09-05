import { Stack, TextField, Button, Typography, Box } from "@mui/material";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Forgetform() {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/changepwd", { replace: true });
  };
  return (
    <>
      <Stack spacing={3}>
        <TextField name="email" label="Email address" type="text" />
      </Stack>

      <Button
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        onClick={handleClick}
        sx={{ height: "70px", bgcolor: "#214392", marginTop: "30px" }}
        style={{ fontSize: "24px", borderRadius: "15px" }}
      >
        Send
      </Button>
      <Typography
        variant="body2"
        sx={{ mb: 5, mt: 3 }}
        style={{ textAlign: "center", fontWeight: "700" }}
      >
        Already have an account?
        <Link to="/login" style={{ color: "blue", textDecoration: "none" }}>
          SIGN IN
        </Link>
      </Typography>
    </>
  );
}
