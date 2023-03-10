const userService = require('../Services/userService')
const commonService = require('../Services/commonService')
const bcrypt = require('bcrypt');
const mongo = require('mongodb');
const mailService = require('../MailTemplate/MailService')
var ObjectID = mongo.ObjectID;

exports.Register = async(req , res, next) =>{
    console.log("req.body", req.body)
    //console.log("req.body",req)
    req.body._id = new ObjectID()

try{
    if (!req.body.email) {
        throw { success: false, message: "Email are Required.", response: {} };
      }
      if (!req.body.password) {
        throw { success: false, message: "Password is Required.", response: {} };
      }
      if (!req.body.name) {
        throw { success: false, message: "name are Required.", response: {} };
      }
      if (req.body.password != req.body.cpassword ) {
        throw { success: false, message: "Password is not matched.", response: {} };
      }
      
      const findUserData = await userService.findByEmail({...req.body})
      console.log("findUserData", findUserData);

      if(findUserData){
        throw { success: false, message: "Email already registered." };
      }

      const registerDataSave = await userService.saveRegisterData({...req.body})

      return res.send({
        success: true,
        message: "Successfully Registered.",
        response: registerDataSave,
      });
}catch (error ){
    console.log("error", error);
    return res.send(error)}

}
exports.Login = async(req , res, next) =>{
    console.log("req.body", req.body)
    //console.log("req.body",req)

try{
    
    if (!req.body.email) {
        throw { success: false, message: "Email are Required", response: {} };
      }
      if (!req.body.password) {
        throw { success: false, message: "Password is Required", response: {} };
      }
      
      const findUserData = await userService.findByEmail({...req.body})
      console.log("findUserData", findUserData);

      if(!findUserData){
        throw { success: false, message: "User is not registered." };
      }
    //   const saltRounds = 10;
    //  bcrypt.hash(req.body.password, saltRounds,async function(err, hash) {
    //   console.log("hash",hash);
    //   req.body.password = hash ;
    //   const isPasswordMatch = await findUserData.comparePassword(req.body.password);
    //   console.log("req.body.password", req.body.password);
    // if (!isPasswordMatch) {
    //   throw { success: false, message: "Password Not Matched" };
    // }
    
    // });

    const isPasswordMatch = await findUserData.comparePassword(req.body.password);
    console.log("req.body.password", isPasswordMatch);
  if (!isPasswordMatch) {
    throw { success: false, message: "Password Not Matched" };
  }
    


    const accessToken = await commonService.createUserAccessToken({
        _id: findUserData._id,
        email: findUserData.email,
      });
      const userData = {
        id: findUserData._id,
        authToken: accessToken
      }

      const updateToken = await userService.updateToken(userData)
      console.log("updateToken", updateToken);

      return res.send({
        success: true,
        message: "Login Successfull",
        response: updateToken,
        //token: accessToken
      });
}catch (error ){
    console.log("error", error);
    return res.send(error)}

}

exports.EmailVerify = async(req , res, next) =>{
  console.log("req.body", req.body)
  //console.log("req.body",req)

try{
  
  if (!req.body.email) {
      throw { success: false, message: "Email are Required", response: {} };
    }
    
    const findUserData = await userService.findByEmail({...req.body})
    console.log("findUserData", findUserData);

    if(!findUserData){
      throw { success: false, message: "User is not registered." };
    }
  const otp = Math.floor(100000 + Math.random() * 900000)
  console.log("otp", otp);

    mailService("forgotLinkMail")(req.body.email , {
      otp: otp
    }).send()

    const userData = {
      id: findUserData._id,
      otp: otp
    }
    const updateOtp = await userService.updateToken(userData)

    return res.send({
      success: true,
      message: "Otp is send to your email.",
      otp: otp
    });
}catch (error ){
  console.log("error", error);
  return res.send(error)}

}

exports.OtpVerify = async(req , res, next) =>{
  console.log("req.body", req.body)
  //console.log("req.body",req)

try{
  
  if (!req.body.otp) {
      throw { success: false, message: "otp required", response: {} };
    }
    
    const findUserData = await userService.findByEmail({...req.body})
     console.log("findUserData", findUserData);

     if(findUserData.otp === req.body.otp){
      throw { success: true, message: "Otp varified." };
     }

    return res.send({
      success: false,
      message: "Otp not varified.",
    });
}catch (error ){
  console.log("error", error);
  return res.send(error)}

}
exports.ChangePassword = async(req , res, next) =>{
  console.log("req.body", req.body)
  //console.log("req.body",req)

try{
  if (!req.body.password) {
    throw { success: false, message: "Password is Required", response: {} };
  }
  if (req.body.password != req.body.cpassword) {
    throw { success: false, message: "Password is not matched." };
  }
  const findUserData = await userService.findByEmail({...req.body})
     console.log("findUserData", findUserData);

  if(!findUserData){
    throw { success: false, message: "User is not registered." };
  }
    
  findUserData.password = req.body.password

  const modifyPassword = await findUserData.save({validateModifiedOnly: true})

  console.log("Modify password", modifyPassword);

    return res.send({
      success: true,
      message: "Password changed successfully.",
    });
}catch (error ){
  console.log("error", error);
  return res.send(error)}

}