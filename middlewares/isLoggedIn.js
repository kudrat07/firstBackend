const express = require("express");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.isLoggedIn = (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(400).json({
        message: "No token provided",
      });
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(400).json({ message: "Invalid token" });
      }
      req.user = decoded;
    });

    next();
  } catch (error) {}
};
