const mongoose = require("mongoose")

const postSchema = mongoose.Schema({
    title :String,
    body : String,
    device : {type:String, enum: ["Laptop","Mobile","Tablet"]},
    no_of_comments : Number,
    userId:{type: mongoose.Schema.Types.ObjectId , ref:"user"} 

})

const PostModel = mongoose.model("post",postSchema)

module.exports={PostModel}

// {
//     "title":"learn",
//     "body":"java",
//     "device":"Laptop",
//     "no_of_comments":12
//   }