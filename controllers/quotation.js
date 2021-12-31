import { validateQuotation, Quotation } from "../models/quotation.js";

export const AllQuotations = async (req, res) => {
  const quotations = await Quotation.find().select("-__v").sort("name");
  // .populate("companies", "name")
  // .populate("products.product", "name unit");
  res.json({ results: quotations });
};

export const paginatedQuotations = (req, res) => {
  return res.json(res.paginatedResults);
};

export const createQuotation = async (req, res) => {
  const { error } = validateQuotation(req.body);
  if (error) return res.status(400).send(error);

  try {
    const quotation = new Quotation({
      products: req.body.products,
      companies: req.body.companies,
      bids: req.body.bids,
      lastDate: req.body.lastDate,
      qtype: req.body.qtype,
      refNo: req.body.refNo,
    });
    const result = await quotation.save();
    const quotation2 = await Quotation.findById(result._id)
      .select("-__v")
      .populate("companies", "name")
      .populate("products.product", "name unit");
    res.json({ quotation: quotation2 });
  } catch (ex) {
    return res.status(400).json({ error: ex });
  }
};

export const deleteQuotation = async (req, res) => {
  const quotation = await Quotation.findByIdAndRemove(req.params.id);

  if (!quotation)
    return res
      .status(404)
      .json({ message: "The quotation with the given ID was not found." });

  res.json(quotation);
};

export const getQuotation = async (req, res) => {
  const quotation = await Quotation.findById(req.params.id)
    .select("-__v")
    .populate("companies", "name address")
    .populate("products.product", "name unit")
    .populate("bids.product", "name unit");

  if (!quotation)
    return res
      .status(404)
      .json({ message: "The Quotation with the given ID was not found." });

  res.json(quotation);
};

export const updateQuotation = async (req, res) => {
  const { error } = validateQuotation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  await Quotation.findByIdAndUpdate(
    req.params.id,
    {
      products: req.body.products,
      companies: req.body.companies,
      bids: req.body.bids,
      lastDate: req.body.lastDate,
      qtype: req.body.qtype,
      refNo: req.body.refNo,
    },
    { new: true }
  );

  const quotation = await Quotation.findById(req.params.id)
    .select("-__v")
    .populate("companies", "name")
    .populate("products.product", "name unit");

  if (!quotation)
    return res
      .status(404)
      .json({ message: "The Quotation with the given ID was not found." });

  res.json(quotation);
};
