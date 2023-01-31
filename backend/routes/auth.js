const express = require("express");
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
// const fetchuser = require('../middleware/fetchuser');
const jwt = require("jsonwebtoken");

const JWT_secret = "HiI'mPr@thmeshP@w@r";

const router = express.Router();
// ROUTE 1 Create a User using : POST "/api/auth/createuser". No login required
router.post(
  "/createuser",
  [
    body("name", "Name should be minimum 3 letters.").isLength({ min: 3 }),
    body("email", "Enter a valid email.").isEmail(),
    body("password", "Password should be minimum 5 letters.").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    let success=1;
    // if there are errors, return bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({success, errors: errors.array() });
    }
    try {
      // Check whether the user with this email exists already  
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        success=2;
        return res
          .status(400)
          .json({success, error: "Please enter a unique value of email." });
      }
      const salt = await bcrypt.genSaltSync(10);
      const secPass = await bcrypt.hashSync(req.body.password, salt);
      // CEATE A NEW USER
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      });
      const data = {
        user: {
          id: user.id,
        },
      };
      const authToken = jwt.sign(data, JWT_secret);
      success=0;
      res.json({success, authToken });
    } catch (error) {
      // CATCH ERRORS
      console.log(error.message);
      res.status(500).send("Internal Server Error.");
    }
  }
);

// ROUTE 2 Authenticate a User using : POST "/api/auth/login". No login required
router.post(
  "/login",
  [
    body("email", "Enter a valid email.").isEmail(),
    body("password", "Password cannot be blank.").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    let success = false;
    const {email, password} = req.body;
    try {
        let user = await User.findOne({ email});
        if (!user) {
            return res
              .status(400)
              .json({success, error: "Please try to login with correct Credentials." });
        }
        const passwordCompare = await bcrypt.compare(password, user.password);
        if(!passwordCompare){
            return res
              .status(400)
              .json({success, error: "Please try to login with correct Credentials." });
        }
        const data = {
            user: {
              id: user.id,
            },
          };
          const authToken = jwt.sign(data, JWT_secret);
          success= true;
          res.json({success, authToken });
    } catch (error) {
        console.log(error.message);
      res.status(500).send("Internal Server Error.");
    }
  }
);


// router.post("/getuser",fetchuser, async (req, res) => {
//     try {
//         const userId = req.user.id;
//         const user = await User.findById(userId).select("-password");
//         res.send(user);
//     } catch (error) {
//         console.log(error.message);
//       res.status(500).send("Internal Server Error.");
//     }
//     }
// )
module.exports = router;
