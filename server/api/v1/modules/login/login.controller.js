const loginService = require('./login.service');


function verifyCred(credentials, done) {
    
    loginService.verifyUserCred(credentials, (err, token) => {
        if (err) {
            return done('Invalid email/ password !', null);
        }
        return done(null, token);
    })
}

module.exports = {verifyCred};