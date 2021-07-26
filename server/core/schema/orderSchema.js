const mongoose = require("mongoose"),
  Schema = mongoose.Schema;
const OrderSchema = new Schema({
  customerId: { type: String, required: true },
  status: { type: String, required: true },
  schoolId: { type: String, required: true },
  customerId: { type: String, required: true },
  customerId: { type: String, required: true },
  customerId: { type: String, required: true },
  items: { type: Array, required: true },
  shippingAddress: { type: String, required: true },
});

module.exports = mongoose.model("Order", OrderSchema);
