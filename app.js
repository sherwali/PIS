import express from "express";
import cors from "cors";
import morgan from "morgan";
import mongoose from "mongoose";
// Import Routes
import productRoutes from "./routes/products.js";
import companyRoutes from "./routes/companies.js";
import quotationRoutes from "./routes/quotation.js";

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

// Routes
app.use("/api/product", productRoutes);
app.use("/api/company", companyRoutes);
app.use("/api/quotation", quotationRoutes);

// Listeners
mongoose
  .connect("mongodb://127.0.0.1:27017/")
  .then(() => console.log("DB connected"));
app.listen(8000, () => console.log(`Example app listening on port 8000!`));
