const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const config = require("../../../../appconfig");
const Schema = mongoose.Schema;
const { connectionString, jwtdetails } = config;
import { Product } from '../../../../core/schema/productSchema';
let db = null;

export async function getRecommendations(user, done) {
  const { contact, port, keyspace } = connectionString;
  const conString = `${contact}${port}/${keyspace}`;
  mongoose.connect(conString, { useNewUrlParser: true });
  db = mongoose.connection;
  db.on("error", (err) => {
    console.error.bind(console, "connection error:", err);
    return done(err, null);
  });
  db.once("open", async() => {
    try {
  //   const r = await db.Product.aggregate([
  //     // First sort all the docs by name
  //     {$sort: {ratings: 1}},
  //     // Take the first 100 of those
  //     {$limit: 20},
  // ])
      const r = await Product.find().sort({ "meta.ratings": -1 }).limit(100);
      const result = r.map(p => p.toJSON());
      console.log('result of recommendations : ', r.length);
      const filter = result.filter(r => r.title.length < 20);
      console.log(filter.length, filter[0]);
      return done(null,filter);
    } catch (err) {
      console.log("error is :", err);
      releaseDB();
      return done(err, null);
    }
  });
}
export async function getProducts(done) {
    const { contact, port, keyspace } = connectionString;
    const conString = `${contact}${port}/${keyspace}`;
    mongoose.connect(conString, { useNewUrlParser: true });
    db = mongoose.connection;
    db.on("error", (err) => {
      console.error.bind(console, "connection error:", err);
      throw new Error(err.message);
    });
    db.once("open", async() => {
      try {
        const r = await Product.find({});
        const result = r.map(p => p.toJSON())
        // const r = Product.find({}).then(a => console.log(a.map(p => p.toJSON())))
        console.log('get all result : ', result.length);
        releaseDB();
        return done(null,result);
      } catch (err) {
        console.log("error is :", err);
        releaseDB();
        throw new Error(err.message);
      }
    });
  }
function releaseDB() {
  db.close((err, succcess) => {
    if (err) console.log("failed to close");
    else console.log("closed successfully");
  });
}
