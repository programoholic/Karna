const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const config = require("../../../../appconfig");
const otpService = require("../../../../services/OTP/otp.service");
const Student = require("../../../../core/schema/studentSchema");
const Schema = mongoose.Schema;
const { connectionString, jwtdetails } = config;

let db = null;

export async function getRecommendations(user, done) {
    return [];
//   const { contact, port, keyspace } = connectionString;
//   const conString = `${contact}${port}/${keyspace}`;
//   mongoose.connect(conString, { useNewUrlParser: true });
//   db = mongoose.connection;
//   db.on("error", (err) => {
//     console.error.bind(console, "connection error:", err);
//     return done(err, null);
//   });
//   db.once("open", () => {
//     try {
    
//     } catch (err) {
//       console.log("error is :", err);
//       releaseDB();
//       return done(err, null);
//     }
//   });
}
export async function getProducts(user, done) {
    return [];
    const { contact, port, keyspace } = connectionString;
    const conString = `${contact}${port}/${keyspace}`;
    mongoose.connect(conString, { useNewUrlParser: true });
    db = mongoose.connection;
    db.on("error", (err) => {
      console.error.bind(console, "connection error:", err);
      return done(err, null);
    });
    db.once("open", () => {
      try {
      
      } catch (err) {
        console.log("error is :", err);
        releaseDB();
        return done(err, null);
      }
    });
  }
function releaseDB() {
  db.close((err, succcess) => {
    if (err) console.log("failed to close");
    else console.log("closed successfully");
  });
}
