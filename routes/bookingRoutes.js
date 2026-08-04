import express from "express";

const router = express.Router();

import protect from "../middleware/authMiddleware.js";
import authorizeRoles from "../middleware/roleMiddleware.js";

import {
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
  getMyAssistants
} from "../controllers/userController.js";

// Admin Routes
router.get(
  "/",
  protect,
  authorizeRoles("admin"),
  getAllUsers
);

router.get(
  "/:id",
  protect,
  authorizeRoles("admin"),
  getSingleUser
);

router.put(
  "/:id",
  protect,
  authorizeRoles("admin"),
  updateUser
);

router.delete(
  "/:id",
  protect,
  authorizeRoles("admin"),
  deleteUser
);

// Lab Owner
router.get(
  "/my-assistants",
  protect,
  authorizeRoles("lab_owner"),
  getMyAssistants
);

export default router;