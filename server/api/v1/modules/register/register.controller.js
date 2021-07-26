const registerSrvc = require("./register.service");

function validateSchoolId(schoolId, done) {
  registerSrvc.validateSchoolId(schoolId, (err, result) => {
    if (err) {
      return done(err, null);
    } else {
      return done(null, result);
    }
  });
}
function validateRollId(studentId, done) {
  registerSrvc.checkIfUserExists(studentId, (err, result) => {
    if (err) {
      done(err, null);
    }
    // user does not exists
    if (!result) {
      registerSrvc.validateRollId(studentId, (err, result) => {
        if (err) {
          return done(err, null);
        } else {
          return done(null, result);
        }
      });
    } else {
      return done("User Already Exists!", null);
    }
  });
}
function generateOTP(rollId, done) {
  templateService.deleteTemplate(templateId, (err, result) => {
    if (err) {
      return done(err, null);
    } else {
      return done(null, result);
    }
  });
}
function validateOTP(otp, done) {
  templateService.deleteTemplate(templateId, (err, result) => {
    if (err) {
      return done(err, null);
    } else {
      return done(null, result);
    }
  });
}

function register(user, done) {
  registerSrvc.register(user, (err, token) => {
    if (err) {
      return done(err, null);
    }
   return done(null, token);
  })
}

module.exports = {
  validateSchoolId,
  validateRollId,
  validateOTP,
  register,
};
