const express = require("express")
const {UserModel} = require("../model/user.model")
const {PostModel} = require("../model/post.model")


const postRoute = express.Router()

postRoute.post("/add",async(req,res)=>{
    const payload = req.body
    try {
        const newpost = new PostModel(payload)
        await newpost.save()
        const user = await UserModel.findById(payload.userId)
        if(user){
            user.posts.push(newpost._id)
            await user.save()
        }
        res.status(200).send({"message":"Post is added"})
    } catch (error) {
        res.status(400).send({"message":error.message})
    }
})
postRoute.get("/",async(req,res)=>{
    try {
        const user = await UserModel.findOne({ _id: req.body.userId }).populate("posts");
        res.status(200).send({"data":user.posts});
      } catch (error) {
        res.status(400).send({ message: error.message  });
      }
})


postRoute.patch("/update/:id",async(req,res)=>{
    const id = req.params.id
    const payload = req.body

    try {
        const post = await PostModel.findByIdAndUpdate({_id:id},payload, {new:true})
        res.status(200).send({"message":"post is update",post:post})
    } catch (error) {
        res.status(400).send({"message":error.message})
    }
})

postRoute.delete("/delete/:id",async(req,res)=>{
    const id = req.params.id
  
    try {
        const post = await PostModel.findByIdAndDelete({_id:id})
        res.status(200).send({"message":"post is deleted"})
    } catch (error) {
        res.status(400).send({"message":error.message})
    }
})

module.exports={postRoute}