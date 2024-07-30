import React from "react";
import {
  Container,
  Box,
  Typography,
  Button,
  Paper,
  Avatar,
  Divider,
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import { styled } from "@mui/system";
import { useNavigate } from "react-router-dom";

const DashboardContainer = styled(Container)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  alignSelf: "center",
  marginTop: "50px",
  padding: "20px",
  backgroundColor: "#f5f5f5",
  borderRadius: "10px",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  marginLeft: { xs: "20px", sm: "auto" },
  marginRight: { xs: "20px", sm: "auto" },
});

const ProfileBox = styled(Box)({
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "20px",
  textAlign: "center",
  width: "100%",
});

const InfoContainer = styled(Box)({
  display: "flex",
  alignItems: "center",
  margin: "10px 0",
});

const InfoTypography = styled(Typography)({
  fontWeight: "bold",
});

const ValueTypography = styled(Typography)({
  marginLeft: "10px",
});

const LogoutButton = styled(Button)({
  marginTop: "20px",
  color: "#fff",
  "&:hover": {
    backgroundColor: "#ff3d2e",
  },
});

const Dashboard = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div style={{ padding: "20px" }}>
      <DashboardContainer maxWidth="sm">
        <ProfileBox>
          <Typography variant="h4" component="h1" gutterBottom>
            Hello {user.user_firstname.toUpperCase()}
          </Typography>
          <Avatar
            sx={{
              width: { xs: 50, sm: 50, md: 80 },
              height: { xs: 50, sm: 50, md: 80 },
              mb: 2,
            }}
          >
            {user.user_firstname[0].toUpperCase()}
          </Avatar>
        </ProfileBox>
        <Paper elevation={3} sx={{ p: 3, width: "100%", textAlign: "left" }}>
          {[
            { label: "User Id:", value: user.user_id },
            { label: "First Name:", value: user.user_firstname },
            { label: "Email:", value: user.user_email },
            { label: "Phone:", value: user.user_phone },
            { label: "City:", value: user.user_city },
            { label: "Zipcode:", value: user.user_zipcode },
          ].map((item, index) => (
            <React.Fragment key={index}>
              <InfoContainer>
                <InfoTypography variant="body1" sx={{ minWidth: "90px" }}>
                  {item.label}
                </InfoTypography>
                <Divider orientation="vertical" flexItem sx={{ mx: 2 }} />
                <ValueTypography variant="body1">{item.value}</ValueTypography>
              </InfoContainer>
              {index < 5 && <Divider sx={{ my: 1 }} />}
            </React.Fragment>
          ))}
        </Paper>
        <LogoutButton
          onClick={logout}
          variant="contained"
          startIcon={<LogoutIcon />}
        >
          Log Out
        </LogoutButton>
      </DashboardContainer>
    </div>
  );
};

export default Dashboard;
