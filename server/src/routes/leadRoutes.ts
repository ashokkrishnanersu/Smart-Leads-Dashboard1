import express from "express";
import {
  createLead,
  getLeads,
  getLeadById,
  updateLead,
  deleteLead,
  exportCSV
} from "../controllers/leadController";

import { protect, authorize } from "../middleware/auth";

const router = express.Router();

router.post("/", protect, createLead);
router.get("/", protect, getLeads);
router.get("/export", protect, exportCSV);
router.get("/:id", protect, getLeadById);
router.put("/:id", protect, updateLead);
router.delete(
  "/:id",
  protect,
  authorize("admin"),
  deleteLead
);

export default router;