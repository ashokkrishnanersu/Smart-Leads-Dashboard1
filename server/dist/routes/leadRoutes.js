"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const leadController_1 = require("../controllers/leadController");
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
router.post("/", auth_1.protect, leadController_1.createLead);
router.get("/", auth_1.protect, leadController_1.getLeads);
router.get("/export", auth_1.protect, leadController_1.exportCSV);
router.get("/:id", auth_1.protect, leadController_1.getLeadById);
router.put("/:id", auth_1.protect, leadController_1.updateLead);
router.delete("/:id", auth_1.protect, (0, auth_1.authorize)("admin"), leadController_1.deleteLead);
exports.default = router;
