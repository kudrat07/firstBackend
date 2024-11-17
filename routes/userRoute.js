const express = require("express");
const router = express.Router();
const{signUp, login} = require("../controller/user")
const{postJob, allJobs,updateJob, deleteJob} = require("../controller/job");
const{isLoggedIn} = require("../middlewares/isLoggedIn")

// SignUp and Login
router.post("/signup",  signUp);
router.post("/login", login);

// route for creating a job
router.post("/post", isLoggedIn, postJob);
router.get("/jobs/:id",isLoggedIn, allJobs);
router.put("/update/:id", isLoggedIn, updateJob)
router.delete("/delete/:id", isLoggedIn, deleteJob)

module.exports = router;
