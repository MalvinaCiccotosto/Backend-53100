import { Router } from "express";
import studentsModel from "../models/students.js";

const router = Router();

router.get("/", (req, res) => {
    res.render("index", {title: "Listado de alumnos"});
});

router.get("/students", async (req, res)=> {
    //implementar logica
    let page= parseInt(req, query.page)

    if(!page)page=1
const result = await studentsModel.paginate({}, {page, limit: 4, lean:true})
console.log(result);

result.isValid = page >= 1 && page <= result.
totalPages; //variable booleana
result.nextLink = result.hasNextPage
? `http://localhost:3030/students?page=${result.nextPage}`
:"";
result.prevLink = result.hasPrevPage
? `http://localhost:3030/students?page=${result.prevPage}`
:"";




    res.render('students',result)
});

export default router;
