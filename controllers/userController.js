import User from '../models/User.js'
import bcrypt from "bcryptjs";


export const getMyAssistants =
  async (req, res) => {

    try {

      const assistants =
        await User.find({

          role:
            'lab_assistant',

          labOwner:
            req.user._id

        }).select('-password')

      res.status(200)
        .json(assistants)

    } catch (error) {

      res.status(500).json({

        message:
          error.message

      })
    }
  }

// =============================
// Get All Users
// =============================
export const getAllUsers = async (req, res) => {
  try {

    const users = await User.find()
      .select("-password")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: users.length,
      data: users
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};

// =============================
// Get Single User
// =============================
export const getSingleUser = async (req, res) => {
  try {

    const user = await User.findById(req.params.id)
      .select("-password");

    if (!user) {

      return res.status(404).json({
        success: false,
        message: "User Not Found"
      });

    }

    res.status(200).json({
      success: true,
      data: user
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};

// =============================
// Update User
// =============================
export const updateUser = async (req, res) => {

  try {

    const user = await User.findById(req.params.id);

    if (!user) {

      return res.status(404).json({
        success: false,
        message: "User Not Found"
      });

    }

    const {
      name,
      email,
      phone,
      password,
      role,
      labAddress,
      latitude,
      longitude,
      serviceRadius,
      servicePincodes,
      document
    } = req.body;

    user.name = name ?? user.name;
    user.email = email ?? user.email;
    user.phone = phone ?? user.phone;
    user.role = role ?? user.role;
    user.labAddress = labAddress ?? user.labAddress;
    user.latitude = latitude ?? user.latitude;
    user.longitude = longitude ?? user.longitude;
    user.serviceRadius = serviceRadius ?? user.serviceRadius;
    user.servicePincodes =
      servicePincodes ?? user.servicePincodes;
    user.document = document ?? user.document;

    if (password) {
      user.password = await bcrypt.hash(password, 10);
    }

    await user.save();

    res.status(200).json({
      success: true,
      message: "User Updated Successfully",
      data: user
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};

// =============================
// Delete User
// =============================
export const deleteUser = async (req, res) => {

  try {

    const user = await User.findById(req.params.id);

    if (!user) {

      return res.status(404).json({
        success: false,
        message: "User Not Found"
      });

    }

    await user.deleteOne();

    res.status(200).json({
      success: true,
      message: "User Deleted Successfully"
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};
