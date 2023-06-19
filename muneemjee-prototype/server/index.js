import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";

import authRoutes from "../server/routes/auth.js"
import workspaceRoutes from "../server/routes/workspace.js"

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

/* ROUTES */
app.use("/auth", authRoutes);
app.use("/workspace", workspaceRoutes);

const PORT = process.env.PORT || 6001;
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    app.listen(PORT, () => console.log(`SERVER PORT: ${PORT}`));
}).catch((error) => console.log(`${error} did not connect`));

