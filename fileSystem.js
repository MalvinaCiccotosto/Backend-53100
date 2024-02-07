import { promises as fs } from "fs";


class ProductManager {
    constructor() {
        this.patch = "./productos.txt";
        this.products = []
    }

    static id = 0;

    addProduct = async (title, description, price, imagen, code, stock) => {

        ProductManager.id++;

        let newProduct = {
            title,
            description,
            price,
            imagen,
            code,
            stock,
            id: ProductManager.id,
        };

            this.products.push(newProduct)

            await fs.writeFile(this.patch, JSON.stringify(this.products));
    };

    readProducts = async () => {
        let respuesta = await fs.readFile(this.patch, "utf-8")
        return JSON.parse(respuesta)
    }


    getProducts = async () => {
        let respuesta2 = await this.readProducts()
        return console.log(respuesta2)
    }

    getProductsById = async (id) => {
        let respuesta3 = await this.readProducts();
        if (!respuesta3.find((product) => product.id === id)) {
            console.log("Producto no Encontrado");
        } else {
            console.log(respuesta3.find((product) => product.id === id));
        }
    }

    deleteProductsById = async (id) => {
        let respuesta3 = await this.readProducts();
        let productFilter = respuesta3.filter(products => products.id != id)
        await fs.writeFile(this.patch, JSON.stringify(productFilter));
        console.log("Producto Eliminado");
    };

    updateProducts = async ({id, ...producto}) => {
        await this.deleteProductsById(id);
        let productOld = await this.readProducts();
        let productsModif = [{...producto, id}, ...productOld];
            await fs.writeFile(this.patch, JSON.stringify(productsModif));
    };
}

const productos = new ProductManager();

/*productos.addProduct("Titulo1", "Description1", 1000, "Imagen1", "abc123", 5);
productos.addProduct("Titulo2", "Description2", 2000, "Imagen2", "abc123", 10);
productos.addProduct("Titulo3", "Description3", 3000, "Imagen3", "abc123", 20)*/

//productos.getProducts()

//productos.getProductsById(2)

//productos.deleteProductsById(2)

productos.updateProducts({ 
    title: 'Titulo3',
    description: 'Description3',
    price: 3500,
    imagen: 'Imagen3',
    code: 'abc123',
    stock: 20,
    id: 3
})
