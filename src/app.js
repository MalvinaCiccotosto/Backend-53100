import express from "express";
import __dirname from "./utils.js";
import mongoose from "mongoose";
import studentsRouter from "./routes/studentsRouter.js";
import handlebars from 'express-handlebars';
import { Server } from 'socket.io';
import productRouter from "./routes/productRouter.js"
import usersModel from "./dao/models/users.js";
import OrderModel from "./dao/models/orders.js";
import coursesModel from "./dao/models/courses.js";
import fs from "fs";
import { scheduler } from "timers/promises";
import { log } from "console";
import cookieParser from "cookie-parser";


const app = express()
const PORT = process.env.PORT || 3030


//MiddLewares
app.set("views", __dirname+"/views")
app.set("layouts", __dirname + +"/views/layouts/main.handlebars");
app.set("view engine", "handlebars")
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(express.static(__dirname+"/public"))
app.engine("handlebars", handlebars.engine())
app.use(cookieParser("hola"))//pasamos una clave

app.listen(3030, () => console.log("Listening on P0RT 3030"))

//Routes
//app.use("/api/products", productRouter)
app.get("/", (req, res)=> {
    res.send("inicio");
});

//rutas cookies
app.get('/setcookie', (req, res)=> {
    res.cookie("mi cookie", "Soy el rey del mundo", {maxAge:10000}).send("Set cookie")
})

app.get('/getcookie', (req, res)=> {
    res.sed(req.cookies)
})

app.get('/deletecookie', (req, res)=> {
    res.clearCookie("micookie").send("Cookie removida")
})

//cookies seguras
app.get('/set-signed-cookie', (req, res)=> {
    res
    .cookie("miSignedCookie", "Soy el rey del mundo mundial", {maxAge:100000, signed: true})
    .send("Set signed cookie");
});

app.get('/get-signed-cookie', (req, res)=> {
    res.send(req.signedCookies);
});



// const connectMongoDB = async () => {
// const DB_URL = "mongodb://127.0.0.1:27017/ecommerce?retryWrites=true&w=majority"

// try{
//     await mongoose.connect(DB_URL) 
//     
// }catch(error){
//     console.error("No se pudo conectar a la DB", error)
//     process.exit()
// }
// }

// connectMongoDB()


const environment = async () => { 
    const DB_URL = 'mongodb://127.0.0.1:27017/ecommerce?retryWrites=true&w=majority'
    await mongoose.conect(DB_URL)
    console.log("Conectado a MongoDB!!!");


    const PATH = "./src/data/data.json"

    fs.readFile(PATH, "utf-8", (err, data) =>{

        if(err){
            console.error("Error reading data")
            return 
        }
        
        const user = JSON.parse(data)

        userModel.insertMany(users)
        .then(() => console.log("Data inserted!!"))
        .catch(err => console.log(err))
        })


        let result = await userModel.insertMany({first_name: "Carolina", last_name: "Contreras", email: "caro@gmail.com", gender: "Female", courses: ["65fa2577f6ebc114415c8e51"]})
console.log(result)


    //logica a implementar
    // const usuarios = await usersModel.find();
    // const userJson = JSON.stringify(usuarios,null,'\t')
    // console.log(userJson);
    // const orders = await orderModel.find()
    // console.log(orders)
    const pipeline = [
        {
            $match: { size: "medium"},
        },
        {
            $group:{
                _id:"$name", 
                total:{$sum: "$quantity"},
            },
        },
        {
            $sort: {total: 1},
        },
    ];

    // const orders = await OrderModel.aggregate(pipeline)
    // console.log(orders)
const users= await usersModel.paginate({gender:"Femenino"},{limit:2,page:1})
console.log(users)

};


environment()


const server = app.listen(PORT, ()=>
console.log("Servier listening on port", PORT)
);
const io = new Server(server); //instanciando socket.io

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