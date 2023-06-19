import {
  Box,
  TextField,
  Backdrop,
  CircularProgress,
  IconButton,
} from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";
import { useDispatch, useSelector } from "react-redux";
import { setWorkspaces } from "../state";
import { useState } from "react";

export const JoinWorkspace = () => {
  const token = useSelector((state) => state.token);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    const formData = new FormData(event.currentTarget);
    const data = {
      invitationKey: formData.get("invitationKey"),
    };

    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/workspace/join-workspace`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      const responseData = await response.json();

      if (!responseData.error) {
        dispatch(setWorkspaces(responseData));
        document.getElementById("invitationKey").value = "";
      } else {
        alert(responseData.error);
      }
    } catch (err) {
      alert(err);
    }
    setLoading(false);
  };

  return (
    <Box m="16px">
      <Box component="form" onSubmit={handleSubmit} title="Enter invitation key to join a workspace">
        <TextField
          required
          fullWidth
          id="invitationKey"
          label="Invitation Key"
          name="invitationKey"
          size="small"
          InputProps={{
            endAdornment: (
              <IconButton type="submit" edge="end">
                <LoginIcon />
              </IconButton>
            ),
          }}
        />
      </Box>
      {loading && (
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={loading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      )}
    </Box>
  );
};
