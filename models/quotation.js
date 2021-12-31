import Joi from "joi";
import mongoose from "mongoose";

const BidSchema = new mongoose.Schema({
  company: { type: String, required: true },
  product: { type: String, required: true, ref: "Product" },
  price: { type: Number },
});
const ProductSchema = new mongoose.Schema({
  product: { type: String, required: true, ref: "Product" },
  quantity: { type: Number, required: true },
});

const Quotation = mongoose.model(
  "Quotation",
  new mongoose.Schema({
    companies: {
      type: Array,
      required: true,
      trim: true,
      ref: "Company",
    },
    products: {
      type: [ProductSchema],
      required: true,
      trim: true,
    },
    bids: {
      type: [BidSchema],
      required: true,
      trim: true,
    },
    lastDate: { type: Date },
    qtype: {
      type: String,
      trim: true,
    },
    refNo: {
      type: String,
      trim: true,
      // required: true,
    },
  })
);

function validateQuotation(product) {
  const schema = {
    companies: Joi.array().required(),
    products: Joi.array().required(),
    bids: Joi.array().required(),
    lastDate: Joi.date().required(),
    qtype: Joi.string(),
    refNo: Joi.string(),
  };

  return Joi.validate(product, schema);
}

export { Quotation, validateQuotation };
