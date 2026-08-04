import express from "express";

import {
  createPackage,
  getAllPackages,
  getSinglePackage,
  updatePackage,
  deletePackage,
} from "../controllers/packageController.js";

import protect from "../middleware/authMiddleware.js";
import authorizeRoles from "../middleware/roleMiddleware.js";

const router = express.Router();

// Public Routes
router.get("/", getAllPackages);
router.get("/:id", getSinglePackage);

// Admin Routes
router.post(
  "/",
  protect,
  authorizeRoles("admin"),
  createPackage
);

router.put(
  "/:id",
  protect,
  authorizeRoles("admin"),
  updatePackage
);

router.delete(
  "/:id",
  protect,
  authorizeRoles("admin"),
  deletePackage
);

export default router;