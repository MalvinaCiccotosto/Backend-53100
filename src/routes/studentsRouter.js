import { Express } from "express";
import { Router } from "express";
import studentsModel from "../models/estudiantes.js";




const router =  express.Router()

export default router

//Todos los students
Router.get("/students", async (req, res)=>{

    let result = await studentsModel.find()

    res.json({result})
})


//Students by id
router.get("/students/:id", async (req, res)=>{

    let id = req.params.id

    let result = await studentsModel.findOne({_id:id})

    res.json({result})
})


//Insert student
router.post("/students/insertion", async (req, res)=>{

    let result = await studentsModel.insertMany(students)

    res.json({result})
})


//Create student
router.post("/students/create", async (req, res)=>{

    const {nombre, apellido, edad, dni, curso, nota} = req.body

    let user = {
        nombre, apellido, edad, dni, curso, nota
    }

    let result = await studentsModel.create(user)

    res.json({result})
})


//Update student
router.put("/students/edit/:id", async (req, res)=>{

    let id = req.params.id
    let updateUser = req.body
    let result = await studentsModel.updateOne({_id:id}, {$set:updateUser})

    res.json({result})
}) 


//Delete student
router.delete("/students/delete/:id", async (req, res)=>{

    let id = req.params.id

    let result = await studentsModel.deleteOne({_id:id})

    res.json({result})
})


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