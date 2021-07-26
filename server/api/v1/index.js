const router = require('express').Router();
const config = require('../../appconfig/appconfig');
const { cookieInfo } = config;

router.use('/login', require('./modules/login'));
router.use('/register', require('./modules/register'));
router.use('/logout', (req, res) => {
  console.log('logout called',cookieInfo);
  res.clearCookie(cookieInfo.user);  
  res.redirect('/#/login');  
});
// secure routes for admin
router.use(require('./modules/authentication'));
router.use('/products', require('./modules/products'));
module.exports = router;