const Job = require("../model/jobSchema");
const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../model/userSchema");

//Creating a Job

exports.postJob = async (req, res) => {
  try {
    const { title, description, salary, location } = req.body;

    const user = await User.findOne({ email: req.user.email });

    //checking if user with userId exist to create a post or not

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User doesn't exit",
      });
    }

    //creating entry for job
    const job = await Job.create({
      title,
      description,
      salary,
      location,
      userId: user.id,
    });
    res.status(200).json({
      message: "Job posted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

//finding all jobs by a single user
exports.allJobs = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findOne({ email: req.user.email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User doesn't exist",
      });
    }
    const jobs = await Job.find({ userId: user._id });
    res.status(200).json(jobs);
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

//Update a job
exports.updateJob = async (req, res) => {
  try {
    const { title, description, salary, location } = req.body;

    const user = await User.findOne({ email: req.user.email });

    try {
      const job = await Job.findByIdAndUpdate(
        { _id: req.params.id },
        {
          title,
          description,
          salary,
          location,
        }
      );
      res.status(200).json(job);
    } catch (error) {
      console.log(error);
      res.status(400).json({
        success: false,
        error: error.message,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

// delete a job
exports.deleteJob = async (req, res) => {
  try{
    const user = await User.findOne({email: req.user.email});
    const job = await Job.findOne({_id: req.params.id, userId: user._id})
    if(!job){
      return res.status(400).json({message: "Job not found"});
    }
    await Job.findByIdAndDelete({_id:req.params.id})
    res.status(200).json({
      message: "Job deleted successfully"
    })

  }catch(err){
    console.log(err)
    res.status(400).json({
      success: false,
      error: err.message
    });

  }
};
