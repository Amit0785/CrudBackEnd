const mongoose = require('mongoose')
const schema = mongoose.Schema;
const bcrypt = require('bcrypt')

const registerSchema = new schema({
    name:{type:String, require: true , default: ''},
    email:{type:String, require: true , default: ''},
    password:{type:String, require: true , default: ''},
    otp:{type:Number || String, default: ''},
    profilePicture:{type:String, default: ''},
    authToken:{type:String, default: ''}
},{versionKey:false},{timestamps:true})


registerSchema.pre("save", function (next) {
    var user = this;
    console.log("ismodified:", user.isModified("password"));
    if (!user.isModified("password")) return next();
  
    const saltRounds = 10;
    bcrypt.hash(user.password, saltRounds, function (err, hash) {
      if (err) {
        return next(err);
      }
      user.password = hash;
      next();
    });
  });
  
  registerSchema.methods.comparePassword = function (password) {
    var user = this;
    return bcrypt.compareSync(password, user.password);
  };

module.exports = mongoose.model('register',registerSchema)
console.log('Registration create');


