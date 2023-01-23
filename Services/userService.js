const userSchema = require('../schema/userschema')

exports.saveRegisterData = (data)=>{
    const dataSave = new userSchema(data)
  return  dataSave.save();

}
exports.findByEmail = (data)=>{
    return userSchema.findOne({email:data.email})
  
  }
exports.updateToken = (data)=>{
    return userSchema.findOneAndUpdate({_id: data.id},{...data},{ new: true})
  }