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
import contactRoutes from "./routes/contacts.route.js";
import { connection } from "./config/database.js";
import cors from "cors";
import businessRouter from './routes/business.router.js'
import ordersRouter from './routes/orders.router.js'
import { config } from "dotenv";
import nodemailer from "nodemailer";
import twilio from "twilio";
import usersRouter from './routes/user.route.js'
import { addLogger } from './utils/logger.js';
//import { addLogger } from './utils/logger-env.js';


const app = express();
const port = entorno.port;

config();


//setting
app.set("PORT", process.env.PORT || 3030);


//twilio
const client = twilio(process.env.TWILIO_SSID, process.env.AUTH_TOKEN);
//nodemailer
const mailOptions = {
  service: "gmail",
  host: "smtp.gmail.com",
  secure: false,
  port: 587,
  auth: {
    user: process.env.MAIL_USERNAME,
    pass: process.env.MAIL_PASSWORD,
  },
};
const transport = nodemailer.createTransport(mailOptions);


const DBURL =
"mongodb://127.0.0.1:27017/ecommerce?retryWrites=true&w=majority";
const connection = mongoose.connect(DBURL); //migrar a otro archivo

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
app.use(cors());
app.use(addLogger)

//mail route
app.get("/mail", async (req, res) => {
  const result = await transport.sendMail({
    from: `Correo de prueba <${process.env.MAIL_USERNAME}>`,
    to: `${process.env.MAIL_USERNAME}`,
    subject: "Correo de prueba",
    html: `<div>
              <h1>CORREO TEST</h1>
              <p>Correo sin adjunto</p>
          </div>`,
  });
  res.send("Correo enviado");
});
app.get("/mail-adjunto", async (req, res) => {
  const result = await transport.sendMail({
    from: `Correo de prueba <${process.env.MAIL_USERNAME}>`,
    to: `${process.env.MAIL_USERNAME}`,
    subject: "Correo de prueba",
    html: `<div>
              <h1>CORREO TEST</h1>
              <p>Correo con adjunto</p>
          </div>`,
    attachments: [
      {
        filename: "img1.jpg",
        path: __dirname + "/public/img/img1.jpg",
        cid: "img1",
      },
    ],
  });
  res.send("Correo enviado");
});

//sms
app.get("/sms", async (req, res) => {
  const { message } = req.body;
  const result = await client.messages.create({
    body: message,
    to: process.env.PHONE_NUMBER_TO, //cliente
    from: process.env.PHONE_NUMBER, //numero de twilio
  });

  res.send("Mensaje enviado");
});

//
app.get('/', (req, res)=>{
  req.logger.info('Alerta')
  console.log("Alerta")
  res.send({message:"Esto es un logger"})
})

app.get('/opsencilla', (req,res)=>{
  let sum =0
  for (let i = 0; i < 100000; i++) {
      sum+=i
      
  }
  res.send({sum})
})
app.get('/opcompleja', (req,res)=>{
  let sum =0
  for (let i = 0; i < 5e8; i++) {
      sum+=i
      
  }
  res.send({sum})
})


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
app.use("/contacts", contactRoutes);
app.use('/api/users', usersRouter)
app.use('/api/business', businessRouter)
app.use('/api/orders', ordersRouter)
//ruta principal
app.get("/", (req, res) => {
  res.send("Inicio");
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


connection()
app.listen(3030, () => {
  console.log("Server on port 3030");
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