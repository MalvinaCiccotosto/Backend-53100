import productsModel from "../models/products.js";


export default class ProductManager {

    constructor(){
        console.log("Trabajando con productManager")
    }


    getAll = async () => {

        let result = await productsModel.find()
        return result
    }


    getById = async (id) => {

        let result = await productsModel.findById(id)
        return result
    }


    geyByBrand = async (brand) => {

        let result = await productsModel.find({brand: brand})
        return result
    }


    addProduct = async (product) => {

        let result = await productsModel.create(product)
        return result
    }


    updateProduct = async (id, product) => {

        let result = await productsModel.updateOne({_id:id}, {$set: productData})
        return result
    }   


    deleteProduct = async (id) => {
        
        let result = await productsModel.deleteOne({_id:id})
        return result
    }
}


getAll(10)