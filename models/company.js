import Joi from "joi";
import mongoose from "mongoose";

const Company = mongoose.model(
  "Company",
  new mongoose.Schema({
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 200,
      unique: true,
    },
    address: {
      type: String,
      required: true,
      trim: true,
      maxlength: 200,
    },
  })
);

function validateCompany(company) {
  const schema = {
    name: Joi.string().max(200).required(),
    address: Joi.string().max(200).required(),
  };

  return Joi.validate(company, schema);
}

export { Company, validateCompany };
