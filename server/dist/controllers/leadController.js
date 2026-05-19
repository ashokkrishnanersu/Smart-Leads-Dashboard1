"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.exportCSV = exports.deleteLead = exports.updateLead = exports.getLeadById = exports.getLeads = exports.createLead = void 0;
const Lead_1 = __importDefault(require("../models/Lead"));
const json2csv_1 = require("json2csv");
const createLead = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const lead = yield Lead_1.default.create(req.body);
        res.status(201).json(lead);
    }
    catch (_a) {
        res.status(500).json({ message: "Error creating lead" });
    }
});
exports.createLead = createLead;
const getLeads = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { status, source, search, sort, page = "1" } = req.query;
        const limit = 10;
        const currentPage = Number(page);
        const filter = {};
        if (status)
            filter.status = status;
        if (source)
            filter.source = source;
        if (search) {
            filter.$or = [
                { name: { $regex: search, $options: "i" } },
                { email: { $regex: search, $options: "i" } }
            ];
        }
        const sortOption = sort === "oldest"
            ? { createdAt: 1 }
            : { createdAt: -1 };
        const total = yield Lead_1.default.countDocuments(filter);
        const leads = yield Lead_1.default.find(filter)
            .sort(sortOption)
            .skip((currentPage - 1) * limit)
            .limit(limit);
        res.json({
            leads,
            totalPages: Math.ceil(total / limit),
            currentPage
        });
    }
    catch (_a) {
        res.status(500).json({ message: "Server Error" });
    }
});
exports.getLeads = getLeads;
const getLeadById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const lead = yield Lead_1.default.findById(req.params.id);
        if (!lead) {
            return res.status(404).json({ message: "Lead not found" });
        }
        res.json(lead);
    }
    catch (_a) {
        res.status(500).json({ message: "Error fetching lead" });
    }
});
exports.getLeadById = getLeadById;
const updateLead = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const lead = yield Lead_1.default.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(lead);
    }
    catch (_a) {
        res.status(500).json({ message: "Error updating lead" });
    }
});
exports.updateLead = updateLead;
const deleteLead = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield Lead_1.default.findByIdAndDelete(req.params.id);
        res.json({ message: "Lead deleted" });
    }
    catch (_a) {
        res.status(500).json({ message: "Error deleting lead" });
    }
});
exports.deleteLead = deleteLead;
const exportCSV = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const leads = yield Lead_1.default.find();
        const parser = new json2csv_1.Parser();
        const csv = parser.parse(leads);
        res.header("Content-Type", "text/csv");
        res.attachment("leads.csv");
        res.send(csv);
    }
    catch (_a) {
        res.status(500).json({ message: "Error exporting CSV" });
    }
});
exports.exportCSV = exportCSV;
