import dotenv from "dotenv";
import { Command } from "commander";

const program= new Command()
program
.option('--mode <modo>', 'Modo de desarrollo o produccion')
.parse()


//constante
const environemt= program.opts().mode;
dotenv.config({
path: environemt === "development" ? "./.env.development" : "./.env.production",
});

export default {
port: process.env.PORT,
mongo_url: process.env.MONGO_URL,
adminUser: process.env.ADMIN_USER,
secretJWT: process.env.SECRET_JWT,
};


dotenv.config();

export const entorno= {
port: process.env.PORT,
mongoUrl: process.env.MONGO_URL,
secretJWT: process.env.SECRET_URL,
};