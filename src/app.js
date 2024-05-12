import express from "express";
import session from "express-session";
import MongoStore from "connect-mongo";
import mongoose from "mongoose";
import handlebars from "express-handlebars";
import __dirname from "./utils.js";
import viewsRouter from "./routes/views.router.js";
import sessionsRouter from "./routes/sessions.router.js";
import passport from "passport";
import initilizePassport from "./config/passport.config.js";
//import { Command } from "commander";
import config from "./config/config.js";
import { fork } from "child_process";
import { entorno } from "./config/config.js";
import userRouter from "./routes/users.router.js";
import toysRouter from "./routes/toys.router.js";
//import MongoSingleton from "./config/MongoSingleton.js";
import cors from 'cors';



const app = express();

const port = entorno.port;


//seteamos el puerto
app.set("PORT", process.env.PORT || 3030);

const DBURL =
"mongodb://127.0.0.1:27017/ecommerce?retryWrites=true&w=majority";
const connection = mongoose.connect(DBURL); //migrar a otro archivo
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
app.use(cors());
//logica de la sesión
app.use(
session({
    store: new MongoStore({
    mongoUrl: DBURL,
    ttl: 3600,
    }),
    secret: "Secret",
    resave: false,
    saveUninitialized: false,
})
);

//routes
app.use("/api", userRouter);
app.use("/api", toysRouter);
//ruta principal
app.get("/", (req, res) => {
  res.status(200).send("Inicio");
});

app.get('/test',(req, res)=>{
  res.json({message:"Respuesta del servidor"})
})

//usando passport
initilizePassport()
app.use(passport.initialize())
app.use(passport.session())


//platilla
app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

app.use("/", viewsRouter);
app.use("/api/sessions", sessionsRouter);

//listener
app.listen(app.get("PORT"), console.log(`Server on port ${app.get("PORT")}`));
app.listen(port, () => {
  console.log(`Server on port ${port}`);
});

//inicializar commader
// const program= new Command()

// program
// .option("-d", "Modo de desarrollo", false)
// .option('-p, --port <port>', "Puerto del servidor")

// program.parse(process.argv)
// process.on('exit',code=>{
//   console.log('Lo vas a ver antes de que termine el proceso ');
// })

// process.on('uncaughtException',exception=>{
//   console.log("Esto va capturar un error no controlado");
// })

// process.on('message', message=>{
//   console.log("Esto se va a ver cuando reciba un mensaje desde otro lugar");
// })

//math()


function listNumbers(...numbers) {
    const types = numbers.map((num) => typeof num);
    if (types.some((type) => type !== "number")) {
    console.log("Invalid parameters ", types);
    process.exit(-4);
    return;
    }

    console.log("Lista de numeros: ", numbers);
    console.log("Lista de tipos: ", types);
}

process.on("exit", (code) => {
    if (code === -4) {
    console.log("No pasaste los parametros necesarios deben ser numeros");
    }
});
  // listNumbers(1,2,3,"r", false)
  // listNumbers(1,2,3,0,674)

app.get("/", (req, res) => {
    res.send("Inicio");
});

  // function operacionCompleja() {
  //   let result = 0;
  //   for (let i = 0; i < 5e9; i++) {
  //     result += i;
  //   }
  //   return result;
  // }
  // app.get("/suma", (req, res) => {
  //   const result = operacionCompleja();

  //   res.send(`El resultado de la operación es: ${result}`);
  // });
app.get("/suma", (req, res) => {
    const child = fork("./src/opComplex.js");
    child.send("Ejecuta el codigo");
    child.on("message", (result) => {
    res.send(`El resultado de la operacion es ${result} `);
    });
});

//const port = config.port;

  //console.log(config);
  //listeners
//app.listen(port, () => {
  //  console.log(`Server on port ${port}`);
//});

  //process
  // console.log("Opciones: ", program.opts());
  // console.log("Argumentos: ", program.args);






  
// MongoSingleton.getInstance();
// MongoSingleton.getInstance();
// MongoSingleton.getInstance();
// MongoSingleton.getInstance();
// MongoSingleton.getInstance();
// MongoSingleton.getInstance();
// MongoSingleton.getInstance();