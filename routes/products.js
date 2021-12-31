import express from "express";
import {
  AllProducts,
  createProduct,
  deleteProduct,
  getProduct,
  updateProduct,
  paginatedProducts,
  searchByQuery,
} from "../controllers/products.js";
import { paginatedResults } from "../middleware/pagination.js";
import { Product } from "../models/product.js";

const router = express.Router();

router.get("/", AllProducts);
router.get("/paginated", paginatedResults(Product), paginatedProducts);
router.get("/:id", getProduct);
router.post("/create", createProduct);
router.post("/search", searchByQuery);
router.delete("/:id", deleteProduct);
router.put("/:id", updateProduct);

export default router;
