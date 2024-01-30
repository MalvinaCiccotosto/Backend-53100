class ProductManager {
    constructor() {
        this.products = [];
    }

    static id = 0

    addProduct(title, description, price, image, code, stock) {
        ProductManager.id++
        this.products.push({ title, description, price, image, stock, id:ProductManager.id });
    }

    getProduct(){
        return this.products;
    }

    getProductById(id){
        if(!this.products.find((producto) => producto.id === id)){
            console.log("Not Found")
        } else{
            console.log("Existe")
        }
    }
}

const productos = new ProductManager();
//Primera llamada = arreglo vacio
console.log (productos.getProduct());

//Agregamos producto
productos.addProduct('titulo1', 'description1', 1000, "imagen1", "abc123", 5);
productos.addProduct('titulo2', 'description2', 1000, "imagen2", "abc124", 5);

//Segunda llamada = arreglo con producto
console.log (productos.getProduct());

productos.getProductById(2)