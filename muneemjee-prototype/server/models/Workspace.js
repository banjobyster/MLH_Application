import mongoose from "mongoose";

const WorkspaceSchema = new mongoose.Schema(
  {
    /* Workspace Schema */
  },
  {
    timestamps: true,
  }
);

const Workspace = mongoose.model("Workspace", WorkspaceSchema);

export default Workspace;
