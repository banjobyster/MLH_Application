import { Link as RouterLink, useNavigate } from "react-router-dom";
import { setLogout } from "../state";
import { useDispatch } from "react-redux";

import { Box, Button, Typography, Avatar } from "@mui/material";
import OpenInNew from "@mui/icons-material/OpenInNew";
import LogoutIcon from "@mui/icons-material/Logout";

export const UserBox = ({ user }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let initials = "JD";

  const handleLogout = () => {
    dispatch(setLogout());

    navigate("/signin");
  };

  if (user.firstName && user.lastName) {
    const firstNameInitial = user.firstName.charAt(0).toUpperCase();
    const lastNameInitial = user.lastName.charAt(0).toUpperCase();
    initials = `${firstNameInitial}${lastNameInitial}`;
  }

  return (
    <Box p="16px">
      <Box display="flex" gap="4px" mb="20px" flexDirection="column">
        <Avatar sx={{ width: 56, height: 56, bgcolor: "primary.main" }}>
          {initials}
        </Avatar>
        <Box display="flex" flexDirection="column" justifyContent="center">
          <Typography component="p" variant="subtitle2" color="text.secondary">
            {user.firstName ? user.firstName + " " + user.lastName : "John Doe"}
          </Typography>
          <Typography component="p" variant="caption" color="text.secondary">
            {user.email ? user.email : "example@email.com"}
          </Typography>
        </Box>
      </Box>
      <Button
        component={RouterLink}
        to="/change-password"
        size="small"
        variant="outlined"
        startIcon={<OpenInNew />}
      >
        Change Password
      </Button>
      <Button
        onClick={handleLogout}
        size="small"
        variant="outlined"
        startIcon={<LogoutIcon />}
        sx={{ mt: "10px" }}
      >
        Logout
      </Button>
    </Box>
  );
};
