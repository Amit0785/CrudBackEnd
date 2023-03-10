const employeService = require('../Services/employeService')


exports.EmployeRegister = async(req , res, next) =>{
    console.log("req.body", req.body)
    console.log("req.body", req.decoded,  req.userId)
    // req.body._id = new ObjectID()

try{
   
    if (!req.body.email) {
        throw { success: false, message: "Email are Required", response: {} }; 
      }
      if (!req.body.name) {
        throw { success: false, message: "Name is Required", response: {} };
      }
      if (!req.body.dob) {
        throw { success: false, message: "DOB is Required", response: {} };
      }
      if (!req.body.city) {
        throw { success: false, message: "City is Required", response: {} };
      }
      if (!req.body.profession) {
        throw { success: false, message: "Employee Profession is Required", response: {} };
      }
      if (!req.body.joinDate) {
        throw { success: false, message: "Join Date is Required", response: {} };
      }
      if (!req.body.noticePeriod) {
        throw { success: false, message: "Notice Period is Required", response: {} };
      }
      if (!req.body.companyName) {
        throw { success: false, message: "Company Name is Required", response: {} };
      }
      // if (req.body.password != req.body.cpassword ) {
      //   throw { success: false, message: "Password is Required", response: {} };
      // }
      
      const findEmployeData = await employeService.findByEmail({...req.body})
      console.log("findEmployeData", findEmployeData);

      if(findEmployeData){
        throw { success: false, message: "Email already registered." };
      }

      const employeDetails = await employeService.saveEmployeData({...req.body})

      return res.send({
        success: true,
        message: "Employe details successfully Registered",
        response: employeDetails,
      });
}catch (error ){
    console.log("error", error);
    return res.send(error)}

}

exports.AllEmploye = async(req , res, next) =>{
try{   
   
    const allemployeDetails = await employeService.allEmploye()

    return res.send({
      success: true,
      message: "All Employe details successfully Registered",
      response: allemployeDetails,
    });
}catch (error ){
  console.log("error", error);
  return res.send(error)}

}
exports.DeleteEmploye = async(req , res, next) =>{
  try{
    
    if (!req.body.employeId) {
      throw { success: false, message: "Employe id is Required"};
    }
     
      const deleteEmployeDetails = await employeService.deleteEmploye(req.body.employeId)
      console.log("delete Employe Details", deleteEmployeDetails);

      if(!deleteEmployeDetails){
        throw { success: false, message: "Employe id is not matched." };
      }
  
      return res.send({
        success: true,
        message: "Employe details deleted successfully.",
       // response: allemployeDetails,
      });
  }catch (error ){
    console.log("error", error);
    return res.send(error)}
  }

exports.UpdateEmployeDetails = async(req , res , next)=>{
  try{
    if (!req.body.email) {
      throw { success: false, message: "Email are Required"}; 
    }
    if (!req.body.name) {
      throw { success: false, message: "Name is Required"};
    }
    if (!req.body.dob) {
      throw { success: false, message: "DOB is Required"};
    }
    if (!req.body.city) {
      throw { success: false, message: "City is Required" };
    }
    if (!req.body.profession) {
      throw { success: false, message: "Employee Profession is Required"};
    }
    if (!req.body.joinDate) {
      throw { success: false, message: "Join Date is Required"};
    }
    if (!req.body.noticePeriod) {
      throw { success: false, message: "Notice Period is Required"};
    }
    if (!req.body.companyName) {
      throw { success: false, message: "Company Name is Required"};
    }
    
    if (!req.body.employeId) {
      throw { success: false, message: "Employe id is Required"};
    }
     
      const employeDetailsUpdate = await employeService.updateEmploye(req.body)
      console.log("delete Employe Details", employeDetailsUpdate);

      if(employeDetailsUpdate.modifiedCount == 0){
        throw { success: true, message: "Employe details is up to date." };
      }
  
      return res.send({
        success: true,
        message: "Employe details updated successfully.",
       // response: allemployeDetails,
      });
  }catch (error ){
    console.log("error", error);
    return res.send(error)}
  }
