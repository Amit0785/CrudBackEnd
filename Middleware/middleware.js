const express = require('express')
const jwt = require("jsonwebtoken");
require('dotenv').config();

exports.CheckAuthToken = async(req , res, next) =>{

    if (!req.headers.authorization) {
        return res.status(401).send({ message: 'Please make sure your request has an Authorization header' });
     }
     var token = req.headers.authorization;
     var payload = jwt.verify(token, process.env.SECRET_KEY);
     if(!payload){
        return res.status(400).send({ message: 'Invalid Token' });
     }

     req.decoded = payload

     req.userId = payload._id
     return  next()    
    //   if(!token){
    //     throw { success: false, message: "Authorization Error"};
    //   }
    
    //   var payload = null;
    //   try {
    //     payload = jwt.decode(token, config.token_secret);
    //   }
    //   catch (err) {
    //     return res.status(401).send({ message: err.message });
    //   }
    
    //   if (payload.exp <= moment().unix()) {
    //     return res.status(401).send({ message: 'Token has expired' });
    //   }
}