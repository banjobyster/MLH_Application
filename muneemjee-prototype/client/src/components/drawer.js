import * as React from "react";
import { useLayoutEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { setWorkspaces } from "../state";
import { UserBox } from "./userBox";
import { Link as RouterLink } from "react-router-dom";

import {
  Box,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  Typography,
} from "@mui/material";
import BusinessIcon from "@mui/icons-material/Business";
import CloseIcon from "@mui/icons-material/Close";
import { CreateWorkspace } from "./createWorkspace";
import { JoinWorkspace } from "./joinWorkspace";

export const CustomDrawer = ({ handleDrawerToggle = null }) => {
  const user = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const workspaces = useSelector((state) => state.workspaces);
  const dispatch = useDispatch();
  const { workspaceID } = useParams();

  useLayoutEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_SERVER_URL}/workspace/workspace-list`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const responseData = await response.json();

        if (!responseData.error) {
          dispatch(setWorkspaces(responseData));
        } else {
          alert(responseData.error);
        }
      } catch (err) {
        alert(err);
      }
    };

    fetchData();
  }, []);

  return (
    <Box>
      <UserBox user={user} />
      {handleDrawerToggle && (
        <IconButton
          onClick={handleDrawerToggle}
          size="small"
          sx={{
            position: "absolute",
            top: "16px",
            right: "16px",
          }}
        >
          <CloseIcon />
        </IconButton>
      )}
      <Divider />
      <CreateWorkspace />
      <JoinWorkspace />
      <Divider />
      <div
        style={{
          height: "200px",
          overflowY: "scroll",
        }}
      >
        <List>
          {workspaces.map((workspace, index) => (
            <ListItem
              key={workspace.workspaceID}
              disablePadding
              component={RouterLink}
              to={`/workspace/${workspace.workspaceID}`}
            >
              <ListItemButton selected={workspaceID === workspace.workspaceID}>
                <ListItemIcon>
                  <BusinessIcon />
                </ListItemIcon>
                <Typography color="text.secondary">{workspace.name}</Typography>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </div>
      <Divider />
    </Box>
  );
};
