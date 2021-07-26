import { inventoryConfig } from "../../appconfig";
import { get } from "superagent";
import { Product } from "../../core/schema/productSchema";

export async function fillInventory() {
  try {
    const books = [1].map((page) =>
      get(`${inventoryConfig.BOOK_STORE_API_BASE}/search/ab/${page}`)
    );
      const res = await Promise.all(books);
      console.log('###################  ',res);
      const mergedStock = res.reduce((prev, next) => ([...prev,...next.body.books]),[])
      console.log('*****************',mergedStock);
      updateInventory(mergedStock);
  } catch (err) {
    console.error(err);
  }
}

async function updateInventory(stockArray) {

    // Bulk.find(<query>).upsert().update(<update>);
    // Bulk.find(<query>).upsert().updateOne(<update>);
    // Bulk.find(<query>).upsert().replaceOne(<replacement>);
    // const product = getProductInstance(stockArrays);
    var bulk = Product.collection.initializeOrderedBulkOp(); //Model.collection.initializeOrderedBulkOp();
    // var bulk = db.items.initializeUnorderedBulkOp();
    for (let stockItem of stockArray) {
        bulk.insert(getProductInstance(stockItem));
    }
    bulk.execute((err, result) => {
        console.log('result is :', result, err);
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
      ratings: `4.${Math.random().toFixed(1)}`,
      cover_url: product.image,
    },
  });
}
