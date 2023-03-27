const express = require("express")
const {UserModel} = require("../model/user.model")
const bcrypt = require("bcrypt")
const jwt =require("jsonwebtoken")

const userRoute = express.Router()

userRoute.post("/register",async(req,res)=>{
    const {name,email,gender,password,age,city,is_married} = req.body
    try {
        const user = await UserModel.findOne({email})
        if(user){
            res.status(200).send({"message":"User already exist, please login"})
        }else{
            bcrypt.hash(password, 5, async(err, hash) =>{
                const newuser = new UserModel({name,email,gender,password:hash,age,city,is_married})
               await newuser.save()
              res.status(200).send({"message":"User Registered"})
            });
        }

    } catch (error) {
        res.status(400).send({"message":error.message})
    }
})


userRoute.post("/login",async(req,res)=>{
    const {email,password} = req.body
    try {
        const user = await UserModel.findOne({email})
        if(user){
            bcrypt.compare(password, user.password, function(err, result) {
                if(result){
                    res.status(200).send({"message":"login Success" , token: jwt.sign({ userId: user._id }, 'name') })
                }
            });
        }else{
            res.status(400).send({"message":"login first"})
        }
    } catch (error) {
        res.status(400).send({"message":error.message})
    }
})

module.exports={userRoute}