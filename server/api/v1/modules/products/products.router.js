const router = require("express").Router();
import { getUserRecommendations, getAllProducts } from "./products.controller";
import {
  successResponseBuilder,
  errorResponseBuilder,
} from "../../../../core/utils/responseBuilder";

router.get("/recommendation", (req, res) => {
  const { email } = req.user;
  console.log('email is : ', email);
  getUserRecommendations(email, (err, products) => {
    if (err) {
      return errorResponseBuilder(res, 500, "Internal server Error!");
    }
    return successResponseBuilder(res, 200, products);
  });
});

router.get("/all", (req, res) => {
  getAllProducts((err, products) => {
    if (err) {
      return errorResponseBuilder(res, 500, "Internal server Error!");
    }
    return successResponseBuilder(res, 200, products);
  });
});

module.exports = router;
