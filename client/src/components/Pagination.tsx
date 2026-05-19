export const getLeads = async (req: Request, res: Response) => {
    const page = Number(req.query.page) || 1;
    const limit = 10;
  
    const leads = await Lead.find()
      .skip((page - 1) * limit)
      .limit(limit);
  
    const total = await Lead.countDocuments();
  
    res.json({
      leads,
      totalPages: Math.ceil(total / limit)
    });
  };