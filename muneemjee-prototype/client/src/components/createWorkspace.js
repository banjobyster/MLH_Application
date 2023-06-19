import {
  Box,
  TextField,
  Backdrop,
  CircularProgress,
  IconButton,
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { useDispatch, useSelector } from "react-redux";
import { setWorkspaces } from "../state";
import { useState } from "react";

export const CreateWorkspace = () => {
  const token = useSelector((state) => state.token);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    const formData = new FormData(event.currentTarget);
    const data = {
      workspaceName: formData.get("workspaceName"),
    };

    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/workspace/create-workspace`,
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
        document.getElementById("workspaceName").value = "";
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
      <Box component="form" onSubmit={handleSubmit} title="Create a workspace with name of your choice">
        <TextField
          required
          fullWidth
          id="workspaceName"
          label="Workspace Name"
          name="workspaceName"
          size="small"
          InputProps={{
            endAdornment: (
              <IconButton
                type="submit"
                edge="end"
              >
                <AddCircleOutlineIcon />
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
