const mongoose = require("mongoose");
import { inventoryConfig } from "../../appconfig";
import { get } from "superagent";
import { Product } from "../../core/schema/productSchema";
import { connectionString } from "../../appconfig";

let db = null;

export async function fillInventory() {
  try {
    const books = [
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 19, 20,
    ].map((page) =>
      get(`${inventoryConfig.BOOK_STORE_API_BASE}/search/ab/${page}`)
    );
    const res = await Promise.all(books);
    const mergedStock = res.reduce(
      (prev, next) => [...prev, ...next.body.books],
      []
    );
    const insertedItems = mergedStock.filter((item) => item.title.length < 20);
    updateInventory(insertedItems);
  } catch (err) {
    console.error(err);
  }
}

async function updateInventory(stockArray) {
  const { contact, port, keyspace } = connectionString;
  const conString = `${contact}${port}/${keyspace}`;
  mongoose.connect(conString, { useNewUrlParser: true });
  db = mongoose.connection;
  db.on("error", (err) => {
    console.error.bind(console, "connection error:", err);
    return done(err, null);
  });
  db.once("open", async () => {
    try {
      const bulk = stockArray.map((stock) => getProductInstance(stock));
      const r = await Product.insertMany(bulk);
      console.log("result is : ", r.length);
      releaseDB();
    } catch (err) {
      console.log("error is :", err);
      releaseDB();
      return done(err, null);
    }
  });
}

function getProductInstance(product) {
  return new Product({
    sku: product.isbn13,
    title: product.title,
    description: product.subtitle,
    quantity: "20",
    manufactureDetails: {
      by: "Anonymous",
      releaseDate: new Date(),
      type: "Book",
    },
    category: "Books",
    meta: {
      ratings: `4.${(Math.random().toFixed(1))* 10}`,
      cover_url: product.image,
    },
  });
}

function releaseDB() {
  db.close((err, succcess) => {
    if (err) console.log("failed to close");
    else console.log("closed successfully");
  });
}
