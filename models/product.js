import Joi from "joi";
import mongoose from "mongoose";

const Product = mongoose.model(
  "Product",
  new mongoose.Schema({
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 200,
      unique: true,
    },
    unit: {
      type: String,
      trim: true,
      maxlength: 200,
    },
  })
);

function validateProduct(product) {
  const schema = {
    name: Joi.string().max(200).required(),
    unit: Joi.string().max(200),
  };

  return Joi.validate(product, schema);
}

export { Product, validateProduct };
