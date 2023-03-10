const mongodb = require("mongodb")
const employeSchema = require("../schema/employeschema")

exports.saveEmployeData = (data)=>{
    const dataSave = new employeSchema(data)
  return  dataSave.save();

}
exports.findByEmail = (data)=>{
  return employeSchema.findOne({email:data.email})

}
exports.allEmploye= ()=>{
 // return employeSchema.find({noticePeriod: "30"})
 return employeSchema.find({})
}
exports.deleteEmploye= (data)=>{
  return employeSchema.deleteOne({_id:mongodb.ObjectId(data)})
//  return employeSchema.updateOne({}, {$pull : {_id:mongodb.ObjectId(data)}})
 }
exports.updateEmploye =(data)=>{
  const condition = {_id:mongodb.ObjectId(data.employeId)}
  const updateValue =  {  $set: {
    name: data.name,
    email: data.email,
    dob:data.dob,
    city: data.city,
    profession:data.profession,
    joinDate: data.joinDate,
    noticePeriod: data.noticePeriod,
    companyName: data.companyName, 
    profilePicture: data.profilePicture
    }}
    const options = { upsert: true };
  return employeSchema.updateOne(condition , updateValue , options)
} 
