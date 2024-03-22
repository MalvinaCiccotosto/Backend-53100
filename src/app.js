import express from "express";
import __dirname from "./utils.js";
import mongoose from "mongoose";
import studentsRouter from "./routes/studentsRouter.js";
import handlebars from 'express-handlebars';
import { Server } from 'socket.io';
import productRouter from "./routes/productRouter.js"


const app = express()
const PORT = process.env.PORT || 3030


//MiddLewares
app.set('views', __dirname+'/views')
app.set('view engine', 'handlebars')
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(express.static(__dirname+'/public'))
app.engine('handlebars', handlebars.engine())

//Routes
app.use("/api/products", productRouter)

const connectMongoDB = async () => {
const DB_URL = "mongodb://127.0.0.1:27017/ecommerce?retryWrites=true&w=majority"

try{
    await mongoose.connect(DB_URL)
    console.log("Conectado a MongoDB!!!")
}catch(error){
    console.error("No se pudo conectar a la DB", error)
    process.exit()
}
}

connectMongoDB()




const server = app.listen(PORT, ()=> console.log("Servier listening on port", PORT))


app.use(express.json())

app.use(studentsRouter)











//const blogSchema = new Schema({
//  title: String, // String is shorthand for {type: String}
// author: String,
// body: String,
// comments: [{ body: String, date: Date}],
// date: { type: Date, default: Date.now },
// hidden: Boolean,
// meta: {
//      votes: Number,
//      favs: Number
//   }
//  });