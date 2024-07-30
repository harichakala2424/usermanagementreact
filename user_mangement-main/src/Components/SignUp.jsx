import React, { useState } from "react";
import axios from "axios";
import {
  TextField,
  Button,
  Container,
  Box,
  Typography,
  Alert,
  FormControlLabel,
  Checkbox,
  Stack,
  CircularProgress,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useSnackbar } from "notistack";
import { Link, useNavigate } from "react-router-dom";
import AlertDialog from "./Dialog";

const SignUp = () => {
  const [formData, setFormData] = useState({
    user_firstname: "",
    user_email: "",
    user_password: "",
    user_phone: "",
  });
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");
  const [invalid, setInvalid] = useState(false);
  const [checked, setChecked] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const phoneRegex = /^\d{10}$/;

    if (formData.user_phone && !phoneRegex.test(formData.user_phone)) {
      setInvalid(true);
      return;
    } else {
      setInvalid(false);
    }

    if (!checked) {
      enqueueSnackbar("Please Accept the Terms and Privacy Policy", {
        variant: "error",
      });
      return;
    }

    const payload = {
      ...formData,
      user_lastname: "ni",
      user_city: "Hyderabad",
      user_zipcode: "500072",
    };
    setLoading(true);
    axios
      .post(
        "https://syoft.dev/Api/user_registeration/api/user_registeration",
        payload
      )
      .then((response) => {
        if (response.data.status) {
          enqueueSnackbar(`${response.data.msg} ! Login`, {
            variant: "success",
          });
          setLoading(false);
          setError(false);
          setTimeout(() => {
            navigate("/login");
          }, 3000);
        } else {
          setError(true);
          setMessage(`User ${response.data.msg}`);
          setLoading(false);
        }
      })
      .catch((error) => {
        enqueueSnackbar("There was an error logging in. Please try again.", {
          variant: "error",
        });
        setLoading(false);
      });
  };

  return (
    <Container
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "95vh",
      }}
    >
      <Box
        sx={{
          flexGrow: 1,
          display: { xs: "none", md: "flex" },
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "90%",
          backgroundColor: "#333333",
        }}
      >
        <Box maxWidth={"70%"}>
          <Typography
            sx={{
              fontSize: "32px",
              fontWeight: "bold",
              color: "white",
              mb: "24px",
            }}
          >
            Welcome to our community
          </Typography>
          <Typography
            sx={{ fontSize: "20px", fontWeight: "400", color: "#B2B2B2" }}
          >
            Fuse helps developers to build organized and well coded dashboards
            full of beautiful and rich modules. Join us and start building your
            application today.
          </Typography>

          <Box
            sx={{
              mt: 4,
              display: "flex",
              alignItems: "center",
              gap: "10px",
              color: "#B2B2B2",
            }}
          >
            {["/img-1.jpg", "/img-2.jpg", "/img-3.jpg"].map((each, index) => (
              <div
                key={index}
                style={{
                  backgroundImage: `url(${each})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  width: "50px",
                  height: "50px",
                  borderRadius: "50%",
                  marginLeft: "-12px",
                }}
              ></div>
            ))}
            {"  "} More than 17k people joined us, it's your turn
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "0px 30px 0px 30px ",
          backgroundColor: { md: "#dddddd" },
          boxShadow: { xs: 3, md: "none" },
          height: "90%",
        }}
        maxWidth={"350px"}
      >
        <Typography variant="h4" component="h1" gutterBottom fontSize={"28px"}>
          Sign Up
        </Typography>
        <Typography sx={{ mb: 2 }}>
          Already have an account?{" "}
          <Link
            to="/login"
            style={{
              textDecoration: "none",
              color: "#009999",
              fontWeight: "bold",
            }}
          >
            Log in
          </Link>{" "}
        </Typography>
        {error && <Alert severity="error">{message}</Alert>}
        <form onSubmit={handleSubmit}>
          <TextField
            label="First Name"
            name="user_firstname"
            fullWidth
            margin="normal"
            value={formData.user_firstname}
            onChange={handleChange}
            required
          />
          <TextField
            label="Email"
            name="user_email"
            type="email"
            fullWidth
            margin="normal"
            value={formData.user_email}
            onChange={handleChange}
            required
          />

          <TextField
            label="Password"
            name="user_password"
            type={showPassword ? "text" : "password"} // Toggle password visibility
            fullWidth
            margin="normal"
            value={formData.user_password}
            onChange={handleChange}
            required
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={togglePasswordVisibility}>
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <TextField
            error={invalid}
            label="Phone"
            name="user_phone"
            fullWidth
            margin="normal"
            value={formData.user_phone}
            onChange={handleChange}
            required
            helperText={invalid && "Invalid Phone number"}
          />
          <Stack direction={"row"} alignItems={"center"} mt={2}>
            <FormControlLabel
              control={
                <Checkbox
                  onChange={(event) => setChecked(event.target.checked)}
                  checked={checked}
                />
              }
            />
            <Typography>
              I have agreed to the
              <AlertDialog
                text="Terms and Conditions"
                title="Terms and Conditions"
                description="Accept terms and conditions..."
                handler={() => setChecked(true)}
              />{" "}
              and{" "}
              <AlertDialog
                text="Privacy Policy"
                title="Privacy Policy"
                description="Accept privacy policy..."
                handler={() => setChecked(true)}
              />
            </Typography>
          </Stack>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: "30px" }}
            disabled={loading}
          >
            {loading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Sign Up"
            )}
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default SignUp;
