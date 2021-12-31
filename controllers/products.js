import { validateProduct, Product } from "../models/product.js";
import _ from "lodash";

export const AllProducts = async (req, res) => {
  const products = await Product.find().select("-__v").sort("name");
  res.send(products);
};

export const paginatedProducts = (req, res) => {
  return res.json(res.paginatedResults);
};

export const createProduct = async (req, res) => {
  const { error } = validateProduct(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    const product = new Product({
      name: req.body.name,
      unit: req.body.unit,
    });
    await product.save();
    res.json({ product });
  } catch (ex) {
    return res.status(400).json({ error: ex });
  }
};

export const deleteProduct = async (req, res) => {
  const product = await Product.findByIdAndRemove(req.params.id);

  if (!product)
    return res
      .status(404)
      .json({ message: "The product with the given ID was not found." });

  res.json(product);
};

export const getProduct = async (req, res) => {
  const product = await Product.findById(req.params.id).select("-__v");

  if (!product)
    return res
      .status(404)
      .json({ message: "The Product with the given ID was not found." });

  res.json(product);
};

export const updateProduct = async (req, res) => {
  const { error } = validateProduct(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const product = await Product.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      unit: req.body.unit,
    },
    { new: true }
  );

  if (!product)
    return res.status(404).send("The product with the given ID was not found.");

  res.json({ product });
};

export const searchByQuery = async (req, res) => {
  const { searchQuery, limit: pageSize, page: pageNumber } = req.body;
  const products = await Product.find().select("-__v").sort("name");

  let filtered = products;
  filtered = products.filter((m) =>
    m.name.toLowerCase().includes(searchQuery.name.toLowerCase())
  );
  filtered = filtered.filter((m) =>
    m.unit.toLowerCase().includes(searchQuery.unit.toLowerCase())
  );
  const startIndex = (pageNumber - 1) * pageSize;
  const p = _(filtered).slice(startIndex).take(pageSize).value();
  res.json(p);
};
