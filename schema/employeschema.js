const mongoose = require('mongoose')
const schema = mongoose.Schema;

const employeSchema = new schema({
    name:{type:String, require: true , default: ''},
    email:{type:String, require: true , default: ''},
    dob:{type:String || Date, require: true , default: ''},
    city:{type:String, require: true , default: ''},
    profession:{type:String, require: true , default: ''},
    joinDate:{type:String, require: true , default: ''},
    noticePeriod:{type:String, require: true , default: ''},
    companyName:{type:String, require: true , default: ''}, 
    profilePicture:{type:String, default: ''},
},{versionKey:false},{timestamps:true})

module.exports = mongoose.model('employe',employeSchema)
console.log('New employee added');