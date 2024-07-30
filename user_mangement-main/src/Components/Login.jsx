import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Container,
  Box,
  Typography,
  Alert,
  CircularProgress,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { useSnackbar } from "notistack";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const Login = () => {
  const [formData, setFormData] = useState({
    user_email: "",
    user_password: "",
  });
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const { enqueueSnackbar } = useSnackbar();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post(
        "https://syoft.dev/Api/userlogin/api/userlogin",
        formData
      );
      if (response.data.status) {
        localStorage.setItem(
          "user",
          JSON.stringify(response.data.user_data[0])
        );
        enqueueSnackbar(
          `Welcome back ${response.data.user_data[0].user_firstname}!`,
          { variant: "success" }
        );

        window.location = "/";
      } else {
        setError(true);
        setMessage(response.data.msg);
      }
      setLoading(false);
    } catch (error) {
      enqueueSnackbar("There was an error logging in. Please try again.", {
        variant: "error",
      });
      setLoading(false);
    }
  };

  useEffect(() => {
    const user = localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : null;
    if (user) {
      console.log(user);
      navigate("/");
    }
  }, [navigate]);

  return (
    <>
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
            height: "580px",
            backgroundColor: "#333333",
          }}
        >
          <Box maxWidth={"70%"} sx={{ gap: "24px" }}>
            <Typography
              sx={{ fontSize: "32px", fontWeight: "bold", color: "white" }}
            >
              Welcome to our community
            </Typography>
            <Typography
              sx={{ fontSize: "20px", fontWeight: "400", color: "#B2B2B2" }}
            >
              Fuse helps developers to build organized and well coded dashboards
              full of beautiful and rich modules. Join us and start building
              your application today.
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
            padding: "30px",
            backgroundColor: { md: "#dddddd" },
            boxShadow: { xs: 3, md: "none" },
            height: { md: "520px" },
          }}
          maxWidth={"350px"}
        >
          <Typography
            variant="h4"
            component="h1"
            gutterBottom
            fontSize={"28px"}
          >
            Log In
          </Typography>
          <Typography sx={{ mb: 2 }}>
            Don't have an account?{" "}
            <Link
              to="/signup"
              style={{
                textDecoration: "none",
                color: "#009999",
                fontWeight: "bold",
              }}
            >
              Sign Up
            </Link>{" "}
          </Typography>
          {error && <Alert severity="error">{message}</Alert>}
          <form onSubmit={handleSubmit}>
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
              type={showPassword ? "text" : "password"}
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
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              disabled={loading}
              sx={{ mt: 3 }}
            >
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Log In"
              )}
            </Button>
          </form>
        </Box>
      </Container>
    </>
  );
};

export default Login;
