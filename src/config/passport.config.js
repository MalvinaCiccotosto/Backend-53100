import passport from "passport";
import local from "passport-local"; //estrategia local
import GitHubStrategy from "passport-github2"; //estrategia github
import userService from "../dao/models/Users.model.js";
import { createHash, isValidPassword } from "../utils.js";
import jwt, { ExtractJwt } from "passport-jwt";
import { userService } from "../repositories/services.js";
import config from "./config.js";



const LocalStrategy = local.Strategy;
const JWTStrategy = jwt.Strategy;
const ExtracJWT = jwt.ExtractJwt;

const initializePassport = async () => {
  //función que extrae las cookies
  const cookieExtractor = (req) => {
    //lógica a implementar

    let token = null;
    if (req && req.cookies) {
      token = req.cookies["practica-integradora"];
    }
    return token;
  };
  //Estrategia para jwt
  passport.use(
    "jwt",
    new JWTStrategy(
      {
        jwtFromRequest: ExtracJWT.fromExtractors([cookieExtractor]),
        secretOrKey: "practica-integradora",
      },
      async (jwt_payload, done) => {
        try {
          return done(null, jwt_payload);
        } catch (error) {
          return done(error);
        }
      }
    )
  );
  
  //Registrar ususario loclamente
    passport.use(
    "register",
    new LocalStrategy(
        { passReqToCallback: true, usernameField: "email" },
        async (req, username, password, done) => {
        const { first_name, last_name, email, age } = req.body;

        try {
        const user = await userService.findOne({ email: username });
        if (user) {
            console.log("el usuario ya existe");
            return done(null, false); // Indica que el usuario existe (sin error)
        }

        const newUser = {
            first_name,
            last_name,
            email,
            age,
            password: createHash(password), // Hashear la contraseña
        };

          // Guardar el usuario
        const result = await userService.create(newUser);
          return done(null, result); // Pasar el usuario creado al éxito
        } catch (error) {
          return done(error); // Pasar el error si hay alguno
        }
    }
    )
);

  //estrategia local para iniciar sesión
passport.use(
    "login",
    new LocalStrategy(
    { usernameField: "email" },
    async (username, password, done) => {
        try {
        const user = await userService.findOne({ email: username });
        if (!user) return done(null, false);
        const valid = isValidPassword(user, password);
        if (!valid) return done(null, false);

        return done(null, user);
        } catch (error) {
        return done(error);
        }
    }
    )
);

  //Estrategia para iniciar sesión con github
passport.use(
    "github",
    new GitHubStrategy(
    {
        clientID: "Iv1.352ce04a002c0f77",//id de la app en github
        clientSecret: "c998725e3e9fe01ef42d3c9a4b898e17f80e06d1",//clave secreta de github
        callbackURL: "http://localhost:3030/api/sessions/githubcallback",//url callback de github
    },
    async (accessToken, refreshToken, profile, done) => {
        try {
        console.log(profile);//obtenemos el objeto del perfil
          //buscamos en la db el email
        const user = await userService.findOne({
            email: profile._json.email,
        });
          //si no existe lo creamos
        if (!user) {
            //contruimos el objeto según el modelo (los datos no pertenecientes al modelo lo seteamos por default)
            const newUser = {
            first_name: profile._json.name,
            last_name: "",
            age: 20,
            email: profile._json.email,
            password: "",
            };
            //guardamos el usuario en la database
            let createdUser = await userService.create(newUser);
            done(null, createdUser);
        } else {
            done(null, user);
        }
        } catch (error) {
        return done(error);
        }
    }
    )
);

  //Serializar y deserializar usuario
passport.serializeUser((user, done) => {
    done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
    try {
    let user = await userService.findById(id);
    done(null, user);
    } catch (error) {
    done(error);
    }
});
};

export default initializePassport;