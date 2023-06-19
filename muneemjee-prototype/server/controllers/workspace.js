import User from "../models/User.js";
import Workspace from "../models/Workspace.js";
import { invitationKeyGenerator } from "../services/randomGenerator.js";

export const getWorkspaces = async (req, res) => {
  try {
    const _id = req.user._id;

    const user = await User.findOne({ _id: _id });

    if (!user) {
      return res.status(400).json({
        error: "User does not exist. Please log in again and try again.",
      });
    }

    return res.status(200).json(user.workspaces);
  } catch (err) {
    res.status(500).json({ error: "An error occured!" });
  }
};

export const createWorkspace = async (req, res) => {
  try {
    /* Code Handling Workspace Creation */
    return res.status(200).json(user.workspaces);
  } catch (err) {
    res.status(500).json({ error: "An error occured!" });
  }
};

export const getWorkspace = async (req, res) => {
  try {
    const _id = req.user._id;
    const { workspaceID } = req.params;

    const workspace = await Workspace.findOne({
      _id: workspaceID,
      $or: [
        { "owner.userID": _id },
        { users: { $elemMatch: { userID: _id } } },
      ],
    });

    if (!workspace) {
      return res
        .status(404)
        .json({ error: "Workspace not found or user does not have access" });
    }

    if (_id !== workspace.owner.userID.toString()) {
      workspace.invitationKey = null;
    }

    return res.status(200).json(workspace);
  } catch (err) {
    res.status(500).json({ error: "An error occured!" });
  }
};

export const joinWorkspace = async (req, res) => {
  try {
   /* Code Handling Workspace Joining Logic */

    return res.status(200).json(user.workspaces);
  } catch (err) {
    res.status(500).json({ error: "An error occured!" });
  }
};

export const removeUser = async (req, res) => {
  try {
    /* Code Handling User Remove Logic */

    return res.status(200).json(workspace);
  } catch (err) {
    res.status(500).json({ error: "An error occured!" });
  }
};

export const updateOwner = async (req, res) => {
  try {
    /* Code Handling Ownership update logic */

    return res.status(200).json(workspace);
  } catch (err) {
    res.status(500).json({ error: "An error occured!" });
  }
};

export const updatePerimssions = async (req, res) => {
  try {
    /* Code Handling Permissions update logic */

    return res.status(200).json(workspace);
  } catch (err) {
    res.status(500).json({ error: "An error occured!" });
  }
};
