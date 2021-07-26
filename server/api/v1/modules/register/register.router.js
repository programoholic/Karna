const express = require('express');
const router =  express.Router();
const registerCtrl = require('./register.controller');
const { successResponseBuilder,errorResponseBuilder } = require('../../../../core/utils/responseBuilder');
const config = require('../../../../appconfig');
const { cookieInfo } = config;



router.post('/schools', (req, res) => {
  const { schoolId } = req.body;
  registerCtrl.validateSchoolId(schoolId, (err, result) => {
    if (err) {
      return errorResponseBuilder(res, 500, err);
    }
    return successResponseBuilder(res, 200, result);
  });
});

router.post('/student/verify',(req,res)=>{
  const { studentId } = req.body;
  registerCtrl.validateRollId(studentId, (err, result) => {
    if (err) {
      return errorResponseBuilder(res, 500, err);
    }
    return successResponseBuilder(res, 200, result);
  });
});
  
router.post('/verify/otp', (req, res) => {
  const { otp } = req.body;
  registerCtrl.validateOTP(schoolId, (err, result) => {
    if (err) {
      return errorResponseBuilder(res, 500, err);
    }
    return successResponseBuilder(res, 200, result);
  });
});


router.post('/student',(req,res)=>{
  const details = req.body;
  registerCtrl.register(details, (err, token) => {
    if (err) {
      return errorResponseBuilder(res, 500, err);
    }
    res.cookie(cookieInfo.user, token);
    return successResponseBuilder(res, 204, { message: 'Registration successful!' });
  })
});

router.get('/user/:id',(req,res)=>{
    
});

  module.exports = router ;