const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
   name:String,
   email:{type : String},
   gender:String,
   password:String,
   age:Number,
   city:String,
   is_married:Boolean,
   posts:[{type: mongoose.Schema.Types.ObjectId , ref:"post"} ]

},{
    versionKey:false
})

const UserModel = mongoose.model("user",userSchema)

module.exports={UserModel}

// {
//     "name":"rahul",
//     "email":"rahul@gmail.com",
//     "gender":"male",
//     "password":"rahul",
//     "age":24,
//     "city":"hld",
//     "is_married":false
//   }