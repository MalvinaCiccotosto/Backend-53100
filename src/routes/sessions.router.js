import { Router } from "express";
import userModel from "../dao/models/Users.model.js";
import { createHash, isValidPassword } from "../utils.js";
import passport from "passport";
import sessionsController from '../controllers/sessions.controller.js';

const router = Router();

// Registrar usando passport
router.post(
  "/register",
  passport.authenticate("register", { failureRedirect: "/failregister" }),
  async (req, res) => {
    res.status(201).send({ status: "success", message: "Usuario registrado" });
  }
);

router.get("/failregister", async (req, res) => {
  console.log("error");
  res.send({ error: "Falló" });
});



// Iniciar sesion usando de passport
router.post(
  "/login",
  passport.authenticate("login", { failureRedirect: "/faillogin" }),
  async (req, res) => {
    if (!req.user) return res.status(400).send("error");
    req.session.user = {
      first_name: req.user.first_name,
      last_name: req.user.last_name,
      email: req.user.email,
      age: req.user.age,
    };
    res.status(200).send({ status: "success", payload: req.user });
  }
);

router.get("/faillogin", async (req, res) => {
  console.log("error");
  res.send({ error: "Fallo" });
});

// Iniciar sesión usando Github
//ruta a la que nos dirigimos para iniciar sesión
router.get(
  "/github",
  passport.authenticate("github", { scope: ["user:email"] }),
  async (req, res) => {
    //podemos enviar una respuesta
  }
);
//ruta que nos lleva a github login
router.get(
  "/githubcallback",
  passport.authenticate("github", { failureRedirect: "/login" }),
  async (req, res) => {
    req.session.user = req.user;
  
    res.redirect("/"); //ruta a la que redirigimos luego de iniciar sesión
  }
);
// Restaurar contraseña
router.post("/restore", async (req, res) => {
  const { email, password } = req.body;
  //validar
  const user = await userModel.findOne({ email });
  console.log(user);
  if (!user)
    return res
      .status(400)
      .send({ status: "error", message: "No se encuentra el user" });
  const newPass = createHash(password);

  await userModel.updateOne({ _id: user._id }, { $set: { password: newPass } });

  res.send({ status: "success", message: "Password actualizado" });
});



router.post('/register',sessionsController.register);
router.post('/login',sessionsController.login);
router.get('/current',sessionsController.current);
router.get('/unprotectedLogin',sessionsController.unprotectedLogin);
router.get('/unprotectedCurrent',sessionsController.unprotectedCurrent);

export default router;