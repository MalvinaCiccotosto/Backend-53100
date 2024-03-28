import express from "express";
import studentsModel from "../models/estudiantes.js";

const router = express.Router();


router.get("/students", async (req, res) => {
    let result = await studentsModel.find();
    res.json({ result });
});


router.get("/students/:id", async (req, res) => {
    let id = req.params.id;
    let result = await studentsModel.findOne({ _id: id })
    res.json({ result })
});

router.post("/students/insertion", async (req, res) => {
    let result = await studentsModel.insertMany(req.body.students)
    res.json({ result });
});


router.post("/students/create", async (req, res) => {
    const { nombre, apellido, edad, dni, curso, nota } = req.body;
    let user = { nombre, apellido, edad, dni, curso, nota }
    let result = await studentsModel.create(user)
    res.json({ result })
});


router.put("/students/edit/:id", async (req, res) => {
    let id = req.params.id;
    let updateUser = req.body;
    let result = await studentsModel.updateOne({ _id: id }, { $set: updateUser })
    res.json({ result });
});


router.delete("/students/delete/:id", async (req, res) => {
    let id = req.params.id;
    let result = await studentsModel.deleteOne({ _id: id })
    res.json({ result });
});

export default router;



const students = [{
    "nombre": "Malvina",
    "apellido": "Ciccotosto",
    "edad": 25,
    "dni": "41462794",
    "curso": "Backend",
    "nota": "10"
}, {
    "nombre": "Oscar",
    "apellido": "Gomez",
    "edad": 45,
    "dni": "52526262",
    "curso": "Backend",
    "nota": "9"
}, {
    "nombre": "Nicolas",
    "apellido": "Roldan",
    "edad": 19,
    "dni": "48485252",
    "curso": "Backend",
    "nota": "9"
}, {
    "nombre": "Juan Ignacio",
    "apellido": "Cuenca",
    "edad": 50,
    "dni": "84852252",
    "curso": "Backend",
    "nota": "7"
}]


module.exports = router