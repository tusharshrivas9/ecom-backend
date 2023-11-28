const bcrypt = require("bcrypt");
const joi = require("joi");
const express = require("express");
const { User } = require("../models/user");
const genauthToken = require("../utiles/Auth"); 

const router = express.Router();

router.post("/", async (req, res) => {
    const schema = joi.object({
      email: joi.string().min(3).max(30).required().email(),
      password: joi.string().min(5).max(9).required(),
    });
  
    const { error } = schema.validate(req.body);
  
    if (error) {
      return res.status(400).send(error.details[0].message);
    }
      let user = await User.findOne({ email: req.body.email });

      if (!user) {
        return res.status(400).send("invalid email or password");
      }

     const isvalid  = await bcrypt.compare(req.body.password, user.password)
     if (!isvalid) {
        return res.status(400).send("invalid email or password");

        
      }
      const token = genauthToken(user)
      res.send(token)
    })
   
    module.exports = router
