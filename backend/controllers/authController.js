import bcrypt from "bcryptjs";
import User from "../models/userModel.js";
import { generateToken } from "../utils/generateToken.js";
import { asyncHandler } from "../utils/asyncHandler.js";

//register
export const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, role } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    return res.status(400).json({ message: "User already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    role,
  });

  const userObj = user.toObject();
  delete userObj.password;

  // hide agent profile for non-agents
  if (userObj.role !== "agent") {
    delete userObj.agentProfile;
  }

  res.status(201).json({
    ...userObj,
    token: generateToken(user._id),
  });
});

//login
export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  if (user.status === "blocked") {
    return res.status(403).json({ message: "Account blocked" });
  }


  const userObj = user.toObject();
  delete userObj.password;

  if (userObj.role !== "agent") {
    delete userObj.agentProfile;
  }

  res.json({
    ...userObj,
    token: generateToken(user._id),
  });
});

//profile
export const getMe = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const userObj = user.toObject();
  delete userObj.password;

  if (userObj.role !== "agent") {
    delete userObj.agentProfile;
  }

  res.json(userObj);
});