const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const { schools, students } = require("../../../../core/common/constants");
const config = require("../../../../appconfig");
const otpService = require("../../../../services/OTP/otp.service");
const Student = require("../../../../core/schema/studentSchema");
const Schema = mongoose.Schema;
const { connectionString, jwtdetails } = config;

let db = null;

function validateSchoolId(schoolId, done) {
  // stub -> call CSR API to fetch school Info
  // -> 404 means invalid schoolId
  // -> 200 means a school exists  return that object and store in redis too.

  setTimeout(() => {
    const scl = schools.find(
      (school) => school.registrationNumber === schoolId
    );
    if (!scl) {
      done("Invalid Registration Number!", null);
    } else {
      done(null, scl);
    }
  }, 0);
}
function validateRollId(rollId, done) {
  // stub -> call School API to fetch student Info
  // -> 404 means invalid schoolId
  // -> 200 means a school exists  return that object and store in redis too.
  setTimeout(() => {
    const s = students.find((student) => student.rollId === rollId);
    if (!s) {
      done("Invalid Roll Number!", null);
    } else {
      generateOTP(s);
      done(null, s);
    }
  }, 0);
}

function generateOTP(student) {
  const { email } = student;
  otpService
    .generateOTP(email)
    .then((r) => {
      console.log("result is :", r);
    })
    .catch((err) => {
      console.log(err);
    });
}

function validateOTP(otp, done) {}

function register(user, done) {
  const studentDoc = new Student({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    password: user.password,
    rollId: user.rollId,
    className: user.className,
    school: {
      ...user.school,
    },
    created_at: new Date(),
    updated_at: null,
  });

  const { contact, port, keyspace } = connectionString;
  const conString = `${contact}${port}/${keyspace}`;
  console.log("connection string ", conString);
  mongoose.connect(conString, { useNewUrlParser: true });
  db = mongoose.connection;
  db.on("error", (err) => {
    console.error.bind(console, "connection error:", err);
    return done(err, null);
  });
  db.once("open", () => {
    try {
      console.log(Student);
      console.log(studentDoc);
      Student.findOne({ email: user.email }, (err, result) => {
        if (err) {
          releaseDB();
          return done("Something went wrong! Try again later...", null);
        }
        if (result) {
          releaseDB();
          return done("User is Already Registered!", null);
        }
        studentDoc.save((err, result) => {
          if (err) {
          releaseDB();
            console.log(err);
            return done("Something went wrong..! try again later", null);
          }
          const userToken = jwt.sign(
            { name: user.firstName, email: user.email },
            jwtdetails.secret,
            { expiresIn: jwtdetails.expiryTime }
          );
          console.log('logged user : ', userToken);
          releaseDB();
          return done(null, userToken);
        });
      });
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

function checkIfUserExists(rollId, done) {
  const { contact, port, keyspace } = connectionString;
  const conString = `${contact}${port}/${keyspace}`;
  console.log("connection string ", conString);
  mongoose.connect(conString, { useNewUrlParser: true });
  db = mongoose.connection;
  db.on("error", (err) => {
    console.error.bind(console, "connection error:", err);
    return done(err, null);
  });
  db.once("open", () => {
    try {
      Student.findOne({ rollId: rollId }, (err, result) => {
        if (err) {
          console.log("error is : ", err);
          releaseDB();
          return done(err, null);
        }
        console.log("result is : ", result);
        releaseDB();
        return done(null, result);
      });
    } catch (err) {
      console.log("error is :", err);
      releaseDB();
      return done(err, null);
    }
  });
}

module.exports = {
  validateOTP,
  validateSchoolId,
  validateRollId,
  register,
  checkIfUserExists,
};
