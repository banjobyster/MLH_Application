import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { passwordGenerator } from "../services/randomGenerator.js";
import { sendEmail } from "../services/mailer.js";

/* SIGNUP USER */
export const signup = async (req, res) => {
  try {
    const { firstName, lastName, email } = req.body;

    const user = await User.findOne({ email: email });

    if (user) {
      return res.status(400).json({ error: "User already exist!" });
    }

    const password = passwordGenerator();

    await sendEmail(email, password);

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = User({
      firstName,
      lastName,
      email,
      password: passwordHash,
    });

    await newUser.save();
    res.status(200).json({ message: "User created successfully" });
  } catch (err) {
    res.status(500).json({ error: "An error occured!" });
  }
};

/* SIGNIN USER */
export const signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(400).json({ error: "User does not exist!" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid credentials!" });
    }

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
    user.password = null;
    res.status(200).json({ token, user });
  } catch (err) {
    res.status(500).json({ error: "An error occured!" });
  }
};

/* CHANGE USER PASSWORD */
export const changePassword = async (req, res) => {
  try {
    const { email, password, newPassword } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ error: "User does not exist!" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Old Password Incorrect!" });
    }

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(newPassword, salt);

    user.password = passwordHash;
    await user.save();

    res.status(200).json({ msg: "Password updated successfully!" });
  } catch (err) {
    res.status(500).json({ error: "An error occured!" });
  }
};

/* USER FORGOT PASSWORD */
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(400).json({ error: "User does not exist!" });
    }

    const newPassword = passwordGenerator();

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(newPassword, salt);

    user.password = passwordHash;

    await sendEmail(email, newPassword);
    await user.save();

    res.status(200).json({ message: "New password sent to email!" });
  } catch (err) {
    res.status(500).json({ error: "An error occured!" });
  }
};
