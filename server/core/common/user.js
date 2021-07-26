// var mongoose = require('mongoose');
// var Schema = mongoose.Schema;
// const userSchema = new Schema({
//     name: String,
//     username: { type: String, required: true, unique: true },
//     password: { type: String, required: true },
//     admin: Boolean,
//     location: String,
//     meta: {type:String},
//     created_at: Date,
//     updated_at: Date
//   });

const { stringify } = require("@angular/compiler/src/util");

const userSchema = {
  name: String,
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  admin: Boolean,
  location: String,
  meta: { type: String },
  created_at: Date,
  updated_at: Date,
};



const user = {
  _id: "journalfanatic@e/mail.com",
  fname: "Journal",
  lname: "Fanatic",
  hashedAndSaltedPassword: "$1$O3JMY.Tw$AdLnLjQ/5jXF9.MTp3gHv/",
  emailVerified: false,
  address: {
    country: "United States",
    street1: "99 Main Street",
    street2: "Apt #3",
    city: "Boston",
    state: "MA",
    zip: "74586",
  },
};

const productSchema = {
  sku: { type: String, required: true },
  title: {type: String, required: true},
  description: {type: String, required: false},
  quantity: {type: Number, required: true},
  manufactureDetails: {
    by: { type: String, required: true },
    releaseDate: { type: Date, required: true },
    type: { String, required: true }
  },
  category: { type: String, required: true },
  meta: {
    ratings: { type: String, required: false },
    cover_url: {type: String, required: true}
  }
};

const orderSchema = {
  customerId: { type: String, required: true },
  status: {type: String, required: true},
  schoolId: {type: String, required: true},
  customerId: {type: String, required: true},
  customerId: {type: String, required: true},
  customerId: {type: String, required: true},
  items: {type: Array, required: true},
  shippingAddress: {type: String, required: true},
  // customerId: "journalfanatic@e/mail.com",
  // paymentId: "600e6f37aa2232f59e273082",
  // paymentStatus: "paid",
  status: "shippedAwaitingDelivery",
  // currency: "USD",
  // totalCost: NumberDecimal(39.85),
  items: [
    {
      sku: "154B",
      quantity: "2",
      price: NumberDecimal(14.99),
      discount: NumberDecimal(1.0),
      preTaxTotal: NumberDecimal(27.98),
      tax: NumberDecimal(1.0),
      total: NumberDecimal(28.98),
    },
    {
      sku: "154A",
      quantity: "1",
      price: NumberDecimal(9.99),
      preTaxTotal: NumberDecimal(9.99),
      tax: NumberDecimal(0.87),
      total: NumberDecimal(10.86),
    },
  ],
  shipping: {
    address: {
      street1: "50 Work Street",
      street2: "Floor 16",
      city: "Chicago",
      state: "IL",
      country: "USA",
      zip: "60601",
    },
    origin: {
      street1: "1 Penn Ave",
      street2: "",
      city: "New York",
      state: "NY",
      country: "USA",
      zipCode: "46281",
    },
    carrier: "USPS",
    tracking: "123412341234",
  },
};

module.exports = { userSchema };
