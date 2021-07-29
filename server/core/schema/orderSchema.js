const mongoose = require("mongoose"),
  Schema = mongoose.Schema;
const OrderSchema = new Schema({
  rollId: { type: String, required: true },
  className: { type: String, required: true },
  status: { type: String, required: true },
  school: {
    registrationNumber: { type: String, required: true },
    name: { type: String, required: true },
  },
  items: { type: Array, required: true },
  shippingAddress: {
    country: { type: String, require: true },
    street1: { type: String, require: true },
    street2: { type: String, require: false },
    city: { type: String, require: true },
    state: { type: String, require: true },
    zip: { type: Number, require: true },
  },
  createdAt: { type: Date, required: true },
  updatedAt: { type: Date, required: false },
});
OrderSchema.index({ "rollId": 1, "className": 1, "items.sku": 1 }, { unique: true });
export const Order = mongoose.model("Order", OrderSchema);
