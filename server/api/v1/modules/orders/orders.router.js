const express = require("express");
const router = express.Router();
import { create } from "./orders.controller";
import {
  successResponseBuilder,
  errorResponseBuilder,
} from "../../../../core/utils/responseBuilder";

router.get("/all", (req, res) => {});

router.get("/orders/:id", (req, res) => {});

router.post("/", (req, res) => {
  let orderDetails = req.body;
  create(orderDetails, (err, result) => {
    if (err) {
      return errorResponseBuilder(res, 500, err);
    } else {
      return successResponseBuilder(res, 201, result);
    }
  });
});

module.exports = router;
