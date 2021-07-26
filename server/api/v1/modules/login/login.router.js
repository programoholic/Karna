const express = require("express");
const loginCtrl = require("./login.controller");
const config = require("../../../../appconfig");
const { errorResponseBuilder, successResponseBuilder } = require("../../../../core/utils/responseBuilder");
const { cookieInfo } = config;
const router = express.Router();

router.post("/", (req, res) => {
  const cred = req.body;
  loginCtrl.verifyCred(cred, (err, token) => {
    if (err) {
        return errorResponseBuilder(res, 401, err);
    } else {
      res.cookie(cookieInfo.user, token);
      console.log('response is : ', res);
        return successResponseBuilder(res, 200, { message: "Login successful!" });
    }
  });
});
module.exports = router;
