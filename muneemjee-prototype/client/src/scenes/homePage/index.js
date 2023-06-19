import * as React from "react";

import { Box, CssBaseline, Toolbar } from "@mui/material";
import { useParams } from "react-router-dom";
import { Workspace } from "../../components/workspace";
import { DrawerWrapper } from "../../components/drawerWrapper";

const HomePage = () => {
  const { workspaceID } = useParams();

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <DrawerWrapper />
      {/* Code Handling Home Page Rendering */}
    </Box>
  );
};

export default HomePage;
