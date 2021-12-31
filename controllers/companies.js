import { validateCompany, Company } from "../models/company.js";

export const AllCompanies = async (req, res) => {
  const companies = await Company.find().select("-__v").sort("name");
  res.send(companies);
};

export const createCompany = async (req, res) => {
  const { error } = validateCompany(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    const company = new Company({
      name: req.body.name,
      address: req.body.address,
    });
    await company.save();
    res.json({ company });
  } catch (ex) {
    console.log(ex);
    res.json({ error: ex });
  }
};

export const deleteCompany = async (req, res) => {
  const company = await Company.findByIdAndRemove(req.params.id);

  if (!company)
    return res
      .status(404)
      .json({ message: "The company with the given ID was not found." });

  res.json(company);
};

export const getCompany = async (req, res) => {
  const company = await Company.findById(req.params.id).select("-__v");

  if (!company)
    return res
      .status(404)
      .json({ message: "The Company with the given ID was not found." });

  res.json(company);
};
export const paginatedCompanies = (req, res) => {
  return res.json(res.paginatedResults);
};

export const updateCompany = async (req, res) => {
  const { error } = validateCompany(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const company = await Company.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      address: req.body.address,
    },
    { new: true }
  );

  if (!company)
    return res.status(404).json("The company with the given ID was not found.");

  res.json({ company });
};
