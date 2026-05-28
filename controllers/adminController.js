import User from "../models/User.js";

import bcrypt from "bcryptjs";

/* -----------------------------------------
   CREATE LAB ASSISTANT
------------------------------------------ */

export const createLabAssistant = async (req, res) => {
  try {
    // Only Lab Owner
    if (req.user.role !== "lab_owner") {
      return res.status(403).json({
        message: "Only Lab Owners Can Create Assistants",
      });
    }
    const {
      name,
      email,
      password,
      mobile,
      documents,
    } = req.body;

    // Validation

    if (!name || !email || !password || !mobile) {
      return res.status(400).json({
        message: "All Fields Are Required",
      });
    }

    // Password Length

    if (password.length < 6) {
      return res.status(400).json({
        message: "Password Must Be At Least 6 Characters",
      });
    }

    // Email Validation

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        message: "Invalid Email Format",
      });
    }

    // Existing User

    const userExists = await User.findOne({
      email,
    });
    if (userExists) {
      return res.status(400).json({
        message: "User Already Exists",
      });
    }

    // Hash Password

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(
      password,
      salt,
    );

    // Create Assistant

    const user = await User.create({
      name,
      email,
      mobile,
      documents,
      password: hashedPassword,
      role: "lab_assistant",
      // IMPORTANT
      labOwner: req.user._id,
    });
    res.status(201).json({
      message: "Lab Assistant Created Successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server Error",
    });
  }
};

/* -----------------------------------------
   CREATE LAB OWNER
------------------------------------------ */
export const createLabOwner = async (req, res) => {
  try {
    // Only Admin
    if (req.user.role !== "admin") {
      return res.status(403).json({
        message: "Only Admin Can Create Lab Owners",
      });
    }
    const {
      name,
      email,
      password,
      servicePincodes,
    } = req.body;
    // Validation
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "All Fields Are Required",
      });
    }
    // Password Length
    if (password.length < 6) {
      return res.status(400).json({
        message: "Password Must Be At Least 6 Characters",
      });
    }
    // Email Validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        message: "Invalid Email Format",
      });
    }
    // Existing User
    const userExists = await User.findOne({
      email,
    });
    if (userExists) {
      return res.status(400).json({
        message: "User Already Exists",
      });
    }
    // Hash Password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(
      password,
      salt,
    );
    // Create Lab Owner
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: "lab_owner",
      servicePincodes: servicePincodes || [],
    });
    res.status(201).json({
      message: "Lab Owner Created Successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server Error",
    });
  }
};
