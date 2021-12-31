import express from "express";
import {
  AllCompanies,
  createCompany,
  deleteCompany,
  getCompany,
  paginatedCompanies,
  updateCompany,
} from "../controllers/companies.js";
import { paginatedResults } from "../middleware/pagination.js";
import { Company } from "../models/company.js";

const router = express.Router();

router.get("/", AllCompanies);
router.get("/paginated", paginatedResults(Company), paginatedCompanies);
router.get("/:id", getCompany);
router.post("/create", createCompany);
router.delete("/:id", deleteCompany);
router.put("/:id", updateCompany);

export default router;
