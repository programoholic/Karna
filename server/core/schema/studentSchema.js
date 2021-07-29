const mongoose = require("mongoose"),
  Schema = mongoose.Schema,
  bcrypt = require("bcrypt"),
  SALT_WORK_FACTOR = 10;

 const StudentSchema = new Schema({
  firstName: { type: String, require: true },
  lastName: { type: String },
  email: { type: String, require: true, unique: true,index: { unique: true }},
  password: { type: String, required: true },
  rollId: { type: String, required: true, unique: true,index: { unique: true } },
  className: {type: String, required: true, unique: false},
  school: {
    name: {type: String, require: true},
    registrationNumber: { type: String, require: true },
    address: {
      country: { type: String, require: true },
      street1: { type: String, require: true },
      street2: { type: String, require: false },
      city: { type: String, require: true },
      state: { type: String, require: true },
      zip: { type: Number, require: true },
    }
  },
  created_at: { type: Date, required: true },
  updated_at: { type: Date, required: false },
});

StudentSchema.pre("save", function (next) {
  var user = this;

  // only hash the password if it has been modified (or is new)
  if (!user.isModified("password")) return next();

  // generate a salt
  bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
    if (err) return next(err);

    // hash the password using our new salt
    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) return next(err);
      // override the cleartext password with the hashed one
      user.password = hash;
      next();
    });
  });
});

StudentSchema.methods.comparePassword = function (candidatePassword, done) {
  bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
    if (err) return done(err);
    done(null, isMatch);
  });
};

export const Student =  mongoose.model('Student', StudentSchema);
