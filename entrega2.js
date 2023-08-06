import { promises as fs } from "fs";
const path = "./productos.json";





class ProductManager {
    constructor() {
        this.products = [];
    }

    //1)
    async getProducts() {
        const prods = JSON.parse(await fs.readFile(path, "utf-8"));
        console.log(prods);
    }

    //2)
    async getProductById(id) {
        const prods = JSON.parse(await fs.readFile(path, "utf-8"));
        const producto = prods.find(prod => prod.id === id);

        if (producto) {
            console.log(producto);
        } else {
            console.log("Producto no encontrado");
        }
    }

    //3)
    async addProduct(product) {
        const prods = JSON.parse(await fs.readFile(path, "utf-8"));
        const producto = prods.find(prod => prod.id === product.id);

        if (producto) {
            console.log("Producto ya agregado");
        } else {
            prods.push(product);
            await fs.writeFile(path, JSON.stringify(prods));
        }
    }

    //4)
    async updateProduct(id, product) {
        const prods = JSON.parse(await fs.readFile(path, "utf-8"));
        const indice = prods.findIndex(prod => prod.id === id);

        if (indice != -1) {
            prods[indice].title = product.title;
            prods[indice].description = product.description;
            prods[indice].price = product.price;
            prods[indice].code = product.code;
            prods[indice].stock = product.stock;
            prods[indice].thumbnail = product.thumbnail;

            await fs.writeFile(path, JSON.stringify(prods));
        } else {
            console.log("Producto no encontrado");
        }
    }

    //5)
    async deleteProduct(id) {
        const prods = JSON.parse(await fs.readFile(path, "utf-8"));
        const producto = prods.find(prod => prod.id === id);

        if (producto) {
            await fs.writeFile(path, JSON.stringify(prods.filter(prod => prod.id != id)));
        } else {
            console.log("Producto no encontrado");
        }
    }
}





//Creo los productos
const producto1 = new Product("Producto 1", "Este es el producto 1", 300, "PROD001", 10, [])
const producto2 = new Product("Producto 2", "Este es el producto 2", 600, "PROD002", 30, [])
const producto3 = new Product("Producto 3", "Este es el producto 3", 400, "PROD003", 15, [])

class Product {
    constructor(title, description, price, code, stock, thumbnail) {
        this.title = title
        this.description = description
        this.price = price
        this.code = code
        this.stock = stock
        this.thumbnail = thumbnail
        this.id = Product.incrementarId()
    }

    static incrementarId() {
        if (this.idIncrement) {
            this.idIncrement++;
        } else {
            this.idIncrement = 1;
        }
        return this.idIncrement
    }
}





//Creo un nuevo objeto de la clase "productManager". Al ser una clase tengo que generar un objeto de la misma
const productManager = new ProductManager()

//Utilizo los 5 métodos creados
//Para ver en la terminal escribo node nombre_del_archivo. En este caso node ejemplo.js
//1)
productManager.getProducts();

//2) Llamo a la función con un parámetro indicado para saber si existe ese producto
productManager.getProductById(3);

//3) Creo un producto que no existe, por lo tanto se va a agregar al json
const producto4 = new Product("Producto 4", "Este es el producto 4", 900, "PROD004", 25, [])
productManager.addProduct(producto4);

//4) Actualizo un producto gracias a la función updateProduct
productManager.updateProduct(1, { title: "Producto 50" });

//5) Elimino un producto
productManager.deleteProduct(1);