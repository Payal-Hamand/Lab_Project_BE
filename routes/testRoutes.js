import express from "express";

import protect from "../middleware/authMiddleware.js";
import authorizeRoles from "../middleware/roleMiddleware.js";

import {
  createTest,
  getAllTests,
  getSingleTest,
  updateTest,
  deleteTest,
} from "../controllers/testController.js";

const router = express.Router();

// Public Routes
router.get("/", getAllTests);
router.get("/:id", getSingleTest);

// Admin Routes
router.post(
  "/",
  protect,
  authorizeRoles("admin"),
  createTest
);

router.put(
  "/:id",
  protect,
  authorizeRoles("admin"),
  updateTest
);

router.delete(
  "/:id",
  protect,
  authorizeRoles("admin"),
  deleteTest
);

export default router;