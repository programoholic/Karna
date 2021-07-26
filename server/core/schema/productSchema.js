const mongoose = require("mongoose"),
  Schema = mongoose.Schema;
const ProductSchema = new Schema({
  sku: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: false },
  quantity: { type: Number, required: true },
  manufactureDetails: {
    by: { type: String, required: true },
    releaseDate: { type: Date, required: true },
    type: { String, required: true },
  },
  category: { type: String, required: true },
  meta: {
    ratings: { type: String, required: false },
    cover_url: { type: String, required: true },
  },
});

export const Product = mongoose.model("Product", ProductSchema);
