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
const app = express();

//seteamos el puerto
app.set("PORT", process.env.PORT || 3030);

const DBURL =
"mongodb://127.0.0.1:27017/ecommerce?retryWrites=true&w=majority";
const connection = mongoose.connect(DBURL); //migrar a otro archivo
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
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