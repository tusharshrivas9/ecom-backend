const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const product = require('./product')
const register = require("./routes/register")
const login = require("./routes/login")
const app = express()
require("dotenv").config()
app.use(express.json())
app.use("/api/register", register)
app.use("/api/login", login)
app.use(cors())

const port = process.env.PORT || 8000
const url = process.env.DB
mongoose.connect(url).then(()=>{
  console.log( "CONNECTEB TO MONGO-DB")
}).catch((error)=>{
console.log(error,"not connected");
})

app.get("/",(req,res)=>{
    res.send("hello")
})

app.get("/product",(req,res)=>{
    res.send(product)
})
app.listen(port,()=>{
    console.log(`listining to the server ${port}`);
})