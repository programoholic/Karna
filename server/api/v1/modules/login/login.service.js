const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Schema = mongoose.Schema;
const config = require("../../../../appconfig");
const { connectionString, jwtdetails } = config; 
import { Student } from "../../../../core/schema/studentSchema";
import { createJWTToken } from "../../../../core/utils/signResponse";
let db = null;

function verifyUserCred(payload, done) {
  mongoose.connect(
    connectionString.contact +
      "" +
      connectionString.port +
      "/" +
      connectionString.keyspace
  );
  db = mongoose.connection;
  db.on("error", console.error.bind(console, "connection error:"));
  db.once("open", function () {
    console.log("Connection Successful!", payload);
    Student.findOne({ email: payload.email }, function (err, user) {
      if (err) {
        console.log(err);
        releaseDB();
        return done(err, null);
      }
      if (!user) {
        releaseDB();
        console.log("user not found");
        return done("User doesn't exists!", null);
      }
      user.comparePassword(payload.password, function (err, result) {
        if (err) {
          console.log("compare unsuccessfull");
          releaseDB();
          return done("Invalid credentials!!!", null);
        } else {
            console.log("compare cuss");
          const userToken = createJWTToken(user);
          releaseDB();
          return done(null, userToken);
        }
      });
    });
  });
}
function releaseDB() {
  db.close((err, succcess) => {
    if (err) console.log("failed to close");
    else console.log("closed successfully");
  });
}
module.exports = { verifyUserCred };
