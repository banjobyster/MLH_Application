import express from "express";
import { verifyToken } from "../middlewares/auth.js";
import { getWorkspace, getWorkspaces, createWorkspace, joinWorkspace, removeUser, updateOwner, updatePerimssions } from "../controllers/workspace.js";

const router = express.Router();

router.get("/workspace-list", verifyToken, getWorkspaces);
router.post("/create-workspace", verifyToken, createWorkspace);
router.get("/:workspaceID", verifyToken, getWorkspace);
router.post("/join-workspace", verifyToken, joinWorkspace);
router.patch("/:workspaceID/remove-user", verifyToken, removeUser);
router.patch("/:workspaceID/update-owner", verifyToken, updateOwner);
router.patch("/:workspaceID/update-permissions", verifyToken, updatePerimssions);

export default router;