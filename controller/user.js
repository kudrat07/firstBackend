const User = require("../model/userSchema");
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.signUp = async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;

    //checking if a user is already registered or not
    const alreadyUser = await User.findOne({ email });
    if (alreadyUser) {
      return res.status(400).json({
        message: "User already exist",
      });
    }

    //hashing the password
    const hashPassword = await bcrypt.hash(password, 10);

    //creating a user
    const user = await User.create({
      name,
      email,
      password: hashPassword,
      phone,
    });

    //creating a JWT token
    const token = jwt.sign({ email }, process.env.JWT_SECRET);
    res.status(200).json({
      success: true,
      message: "User created successfully",
      user,
      token,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};


//login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    //checking if a user is exist or not
    const user = await User.findOne({email});
    if(!user) {
        return res.status(400).json({
            message: "User does not exist please register"
        });
    }
    // compare password
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if(!isPasswordMatch){
        res.status(400).json({
            message:"Email or Password is not correct",
        });
    }

    user.password = undefined;
    const token = jwt.sign({email}, process.env.JWT_SECRET)
    res.status(200).json({
        success: true,
        message:"Successfully login",
        user,
        token,
    })


  } catch (error) {
    res.status(400).json({
        success: false,
        error: error.message
    })
  }
};
