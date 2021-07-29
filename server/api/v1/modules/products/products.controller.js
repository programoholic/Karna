import { getRecommendations, getProducts } from "./products.service";

export async function getUserRecommendations(id, done) {
  getRecommendations(id, (err, products) => {
    if (err) {
      return done(error, null);
    }
  return done(null, products);
  });
}

export async function getAllProducts(done) {
  try {
    getProducts((err, products) => {
      if (err) {
        return done(err, null);
      }
      console.log("products. : ", products.length);
      return done(null, products);
    });
    // return done(null, products);
  } catch (error) {
    return done(error, null);
  }
}
