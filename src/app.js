import dotenv from 'dotenv';

dotenv.config()
import express from "express";
import session from "express-session";
import MongoStore from "connect-mongo";
import mongoose from "mongoose";
import handlebars from "express-handlebars";
import __dirname from "./utils.js";
import viewsRouter from "./routes/views.router.js";
import sessionsRouter from "./routes/sessions.router.js";
import passport from "passport";
import initializePassport from "./config/passport.config.js";
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
//import cors from "cors";
import businessRouter from './routes/business.router.js'
import ordersRouter from './routes/orders.router.js'
//import { config } from "dotenv";
import nodemailer from "nodemailer";
import twilio from "twilio";
import usersRouter from './routes/user.route.js'
import { addLogger } from './utils/logger.js';
//import { addLogger } from './utils/logger-env.js';
import cookieParser from 'cookie-parser';
import petsRouter from './routes/pets.router.js';
import adoptionsRouter from './routes/adoption.router.js';
import sessionsRouter from './routes/sessions.router.js';

const app = express();
const port = entorno.port;

//setting
app.set("PORT", process.env.PORT || 3030);

const connection = mongoose.connect(process.env.MONGO_URL)
// Debugging: Log environment variables
console.log('TWILIO_SSID:', process.env.TWILIO_SSID);
console.log('AUTH_TOKEN:', process.env.AUTH_TOKEN);

if (!process.env.TWILIO_SSID || !process.env.AUTH_TOKEN) {
  console.error('Twilio credentials are missing in environment variables');
  // You may want to throw an error or handle this case as needed
  process.exit(1); // Exit the process with an error code
}

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

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
app.use(cors());
app.use(addLogger)
app.use(cookieParser());

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
      sum+=i;
      
  }
  res.send({sum});
})
app.get('/opcompleja', (req,res)=>{
  let sum =0
  for (let i = 0; i < 5e8; i++) {
      sum+=i
      
  }
  res.send({sum})
})


//logica de la sesión
app.use(session({
    store: MongoStore.create({
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
app.use('/api/pets',petsRouter);
app.use('/api/adoptions',adoptionsRouter);
app.use('/api/sessions',sessionsRouter);
//ruta principal
app.get("/", (req, res) => {
  res.send("Inicio");
});

app.get('/test',(req, res)=>{
  res.json({message:"Respuesta del servidor"})
})

//usando passport
initializePassport()
app.use(passport.initialize());
app.use(passport.session());


//platilla
app.engine('handlebars', handlebars.engine());
app.set('views', new URL('./views', import.meta.url).pathname);
app.set('view engine', 'handlebars');

app.use('/', viewsRouter);
app.use('/api/sessions', sessionsRouter);

//listener
app.listen(PORT,()=>console.log(`Listening on ${PORT}`))

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

app.get("/", (req, res) => {
    res.send("Inicio");
});

app.get("/suma", (req, res) => {
    const child = fork("./src/opComplex.js");
    child.send("Ejecuta el codigo");
    child.on("message", (result) => {
    res.send(`El resultado de la operacion es ${result} `);
    });
});
