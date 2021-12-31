import express from "express";
import {
  AllQuotations,
  createQuotation,
  deleteQuotation,
  getQuotation,
  updateQuotation,
  paginatedQuotations,
} from "../controllers/quotation.js";
import { paginatedResults, paginatedResultsForQuotation } from "../middleware/pagination.js";
import { Quotation } from "../models/quotation.js";

const router = express.Router();

router.get("/", AllQuotations);
router.get(
  "/paginated",
  paginatedResultsForQuotation(Quotation),
  paginatedQuotations
);
router.get("/:id", getQuotation);
router.post("/create", createQuotation);
router.delete("/:id", deleteQuotation);
router.put("/:id", updateQuotation);

export default router;
