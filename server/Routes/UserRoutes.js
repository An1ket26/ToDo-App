const express=require('express')
const Joi = require("joi");
const validator = require("express-joi-validation").createValidator({});
const userController=require("../Controllers/UserController");
const registerSchema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
    mail: Joi.string().email().required(),
  });
  
  const loginSchema = Joi.object({
    password: Joi.string().min(6).max(12).required(),
    mail: Joi.string().email().required(),
  });
  


const router=express.Router();

router.post("/register",validator.body(registerSchema),userController.register);
router.post("/login",validator.body(loginSchema),userController.login);

module.exports=router;