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
import session from "express-session";
import connectDb from "./config/database.js";
import FileStore from "session-file-store";
import MongoStore from "connect-mongo";


const app = express();
const PORT = process.env.PORT || 3030;
const FileStorage= FileStore(session);
const DB_URL = 'mongodb://127.0.0.1:27017/ecommerce?retryWrites=true&w=majority'


//Settings
app.set("views", __dirname+"/views")
app.set("view engine", "handlebars")
//Middlewares
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(express.static(__dirname+"/public"))
app.engine("handlebars", handlebars.engine())
app.use(cookieParser("hola"))//pasamos una clave
app.use(session({
    secret:'Secreto',
    resave: true,
    saveUninitialized: true
}))
app.use(session({
    //store: new fileStorage({path: "./sessions", ttl: 100, retries:0}),
    store:MongoStore.create({
        mongoUrl: DB_URL,
        ttl: 15
    }),
    secret:'hola',
    resave:false,
    saveUninitialized:false
}))

app.listen(3030, () => console.log("Listening on P0RT 3030"))


//middleware de auth
function auth(req, res, next) {
    if (req.session.user === "pepe" && req.session.admin) {
        return next ();
    }
    res.status(401).send("No estas autorizado");
}

//Routes
app.get("/", (req, res)=> {
    res.status(200).send("<h1> Clase 00 </h1>");
});

//rutas cookies
app.get('/setcookie', (req, res)=> {
    res
    .cookie("micookie", "Soy el rey del mundo")
    .send("Set cookie");
});

app.get('/getcookie', (req, res)=> {
    res.sed(req.cookies);
});

app.get('/deletecookie', (req, res)=> {
    res.clearCookie("micookie").send("Cookie removida");
});

//cookies seguras
app.get('/set-signed-cookie', (req, res)=> {
    res
    .cookie("miSignedCookie", "Soy el rey del mundo mundial", {maxAge:100000, signed: true})
    .send("Set signed cookie");
});
//ruta session
app.get('/session', (req, res)=>{
    if(req.session.counter){
        req.session.counter++;
        res.send(`Se ha visitado el sitio" ${req.session.counter} veces`)
    } else{
        req.session.counter=1;
        res.send("Bienvenido/a")
    }
})

//iniciar sesion
app.get("/login", (req, res) => {
    const { username, password } = req.query;
    if (username !== "pepe" || password !== "pepepass") {
        return res.send("Login failed");
    }

    req.session.user = username;
    req.session.admin = true,
    res.send("Login Sucess");
});

//cerrar sesion
app.get("/logout", (req, res) => {
    req.session.destroy((err) => {
        if (!err) {
            res.send("Saliste de la sesion");
        } else {
            res.send({ error: err });
        }
    });
});

//rutas protegidas
app.get('/privado', auth, (req, res)=>{
    res.send("Estas en el mejor lugar")
});


app.get('/get-signed-cookie', (req, res)=> {
    res.send(req.signedCookies);
});


//Listeners
const server = app.listen(PORT, ()=>
console.log("Servier listening on port", PORT)
);
const io = new Server(server); //instanciando socket.io

app.use(express.json())

app.use(studentsRouter)

connectDb();











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