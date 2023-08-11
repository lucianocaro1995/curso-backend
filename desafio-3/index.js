import { promises as fs } from "fs";
const path = "./productos.json";





class ProductManager {
    constructor() {}

    async getProducts() {
        const prods = JSON.parse(await fs.readFile(path, "utf-8"));
        console.log(prods);
    }

    async getProductById(id) {
        const prods = JSON.parse(await fs.readFile(path, "utf-8"));
        const producto = prods.find(prod => prod.id === id);

        if (producto) {
            console.log(producto);
        } else {
            console.log("Producto no encontrado");
        }
    }

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

const producto1 = new Product("Producto 1", "Este es el producto 1", 300, "PROD001", 10, "ejemploImagen1.jpg");
const producto2 = new Product("Producto 2", "Este es el producto 2", 600, "PROD002", 30, "ejemploImagen2.jpg");
const producto3 = new Product("Producto 3", "Este es el producto 3", 400, "PROD003", 15, "ejemploImagen3.jpg");





const productManager = new ProductManager();

async function metodos() {
    await productManager.getProducts();

    await productManager.getProductById(2);

    for (let x of [producto1, producto2, producto3]) {
        await productManager.addProduct(x);
    }

    await productManager.updateProduct(2, { "title":"Producto title cambiado", "description":"Este es el producto 2", "price":600, "code":"PROD002", "stock":30, "thumbnail":"ejemploImagen2.jpg" });

    await productManager.deleteProduct(3);
}

metodos();