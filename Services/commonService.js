"use strict";
const jwt = require("jsonwebtoken");
const secretKey = process.env.SECRET_KEY;

exports.createUserAccessToken = (userTokenData) => {
    return jwt.sign(userTokenData, secretKey, {
      expiresIn: "24h",
    });
  };

exports.verifyToken = (data) => {
    return jwt.verify(data, secretKey);
  };
  