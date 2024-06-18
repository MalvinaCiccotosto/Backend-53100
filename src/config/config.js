import dotenv from "dotenv";
import { Command } from "commander";
dotenv.config();
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
    mailing: {
        SERVICE: process.env.MAILING_SERVICE,
        HOST: process.env.MAILING_HOST,
        USER: process.env.MAILING_USER,
        PASSWORD: process.env.MAILING_PASSWORD,
    },
    mongo: { URL: process.env.MONGO_URL },
    jwt: {
        COOKIE: process.env.JWT_COOKIE,
        SECRET: process.env.JWT_SECRET,
    },
    };


export const entorno= {
port: process.env.PORT,
mongoUrl: process.env.MONGO_URL,
secretJWT: process.env.SECRET_JWT,
persistence:process.env.PERSISTENCE
};