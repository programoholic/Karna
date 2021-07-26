import { getRecommendations, getProducts } from './products.service';

 export async  function getUserRecommendations(id,done){
      try {
        const rec = await getRecommendations(id);
        return done(null, rec);
      } catch (error) {
        return done(error,null)
      }       
}

export async function getAllProducts(done) {
  try {
    const products = await getProducts();
    return done(null, products);
  } catch (error) {
    return done(error,null)
  }   
}

