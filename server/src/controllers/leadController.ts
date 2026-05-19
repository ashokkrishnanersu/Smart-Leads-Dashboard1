import { Request, Response } from "express";
import Lead from "../models/Lead";
import { Parser } from "json2csv";
import { SortOrder } from "mongoose";
export const createLead = async (req: Request, res: Response) => {
  try {
    const lead = await Lead.create(req.body);
    res.status(201).json(lead);
  } catch {
    res.status(500).json({ message: "Error creating lead" });
  }
};

export const getLeads = async (req: Request, res: Response) => {
  try {
    const { status, source, search, sort, page = "1" } = req.query;

    const limit = 10;
    const currentPage = Number(page);

    const filter: any = {};

    if (status) filter.status = status;
    if (source) filter.source = source;

    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } }
      ];
    }

    const sortOption =
      sort === "oldest"
        ? ({ createdAt: 1 } as any)
        : ({ createdAt: -1 } as any);

    const total = await Lead.countDocuments(filter);

    const leads = await Lead.find(filter)
      .sort(sortOption)
      .skip((currentPage - 1) * limit)
      .limit(limit);

    res.json({
      leads,
      totalPages: Math.ceil(total / limit),
      currentPage
    });
  } catch {
    res.status(500).json({ message: "Server Error" });
  }
};
export const getLeadById = async (req: Request, res: Response) => {
  try {
    const lead = await Lead.findById(req.params.id);

    if (!lead) {
      return res.status(404).json({ message: "Lead not found" });
    }

    res.json(lead);
  } catch {
    res.status(500).json({ message: "Error fetching lead" });
  }
};

export const updateLead = async (req: Request, res: Response) => {
  try {
    const lead = await Lead.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(lead);
  } catch {
    res.status(500).json({ message: "Error updating lead" });
  }
};

export const deleteLead = async (req: Request, res: Response) => {
  try {
    await Lead.findByIdAndDelete(req.params.id);
    res.json({ message: "Lead deleted" });
  } catch {
    res.status(500).json({ message: "Error deleting lead" });
  }
};

export const exportCSV = async (_req: Request, res: Response) => {
  try {
    const leads = await Lead.find();

    const parser = new Parser();
    const csv = parser.parse(leads);

    res.header("Content-Type", "text/csv");
    res.attachment("leads.csv");
    res.send(csv);
  } catch {
    res.status(500).json({ message: "Error exporting CSV" });
  }
};