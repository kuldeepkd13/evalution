const express = require("express")
const {connection} = require("./db")
const {userRoute} = require("./routes/user.route")
const {postRoute} = require("./routes/post.route")
const {auth} = require("./middleware/auth.middleware")
require('dotenv').config()
const app = express()


app.use(express.json())
app.use(cors())
app.use("/users",userRoute)
app.use("/posts",auth,postRoute)

app.listen(process.env.Port,async()=>{
    try {
        await connection
        console.log("connected to mongoose")
    } catch (error) {
        console.log(error)
        console.log("Not connected to mongoose")
    }
    console.log(`server is running at ${process.env.Port}`)
})