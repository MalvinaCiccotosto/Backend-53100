import express from "express";
import ProductRouter from "./router/product.routes.js";
import CartRouter from "./router/carts.routes.js";
import { engine } from "express-handlebars";
import { __dirname } from "./utils.js";
import * as path from "path";
import ProductManager from "./controllers/ProductManager.js";
import { Server } from "socket.io";


const app = express(); 
const PORT = 3030;
const product = new ProductManager();

const server = app.listen(PORT, () => {
    console.log(`Server run Express port: ${PORT}`);
});

const io = new Server(server);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine("handlebars", engine());
app.set ("view engine", "handlebars")
app.set ("views", path.resolve(__dirname + "/views"))

app.use("/", express.static(__dirname + "/public"))

/*app.get("/", async (req, res) => {
    let allProducts = await product.getProducts()
    res.render("home",{
    title: "Express Avanzado | Handlebars",
    products: allProducts
})
}) */



app.get("/", (req, res) => {
    res.render("index");
});

const message = [];

io.on("connection", (socket) => {
    console.log(`User ${socket.id} Connection`);

app.use("/api/products", ProductRouter);
app.use("/api/cart", CartRouter);

let userName = "";

socket.on("userConnection", (data) => {
userName = data.user;
message.push({
    id: data.id,
    info: "connection",
    name: data.user,
    message: `${data.user} Connectado`,
    date: new Date().toTimeString(),
});
io.sockets.emit("userConnection", message);
});

socket.on("userMessage", (data) => {
message.push({
    id: io.id,
    info: "message",
    name: userName,
    message: data.message,
    date: new Date().toTimeString(),
});
io.sockets.emit("userMessage", message);
});

socket.on("typing", (data) => {
socket.broadcast.emit("typing", data);
});
})

