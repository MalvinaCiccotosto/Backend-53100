import productManager from "../dao/serives/productManager.js";
import express from "express";


const productManager = new productManager()
const router = express.Router()


router.get("/all", (req, res) =>{

    let limit = req.query
    let data = productManager.getAll(limit)
    res.json({data})

})

router.post("/add", (req, res) => {

    const newProduct = req.body

    let result = productManager.addProduct(newProduct)

    res.json({result})
})


export default router