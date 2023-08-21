import { promises as fs } from "fs";





class ProductManager {
    //Paso filePath como parámetro
    constructor(filePath) {
    /*
    Ubico el path como argumento de la clase ProductManager, y no fuera de la clase como hacía antes
    La diferencia es que haciendo esto, puedo utilizar varios path para distintas clases en el mismo archivo
    Estoy definiendo que este path le pertenece a esta clase. filePath es una variable
    Puedo utilizar esto:
    const productManager = new ProductManager("./src/productos.json");
    O esto:
    const filePath = "./src/productos.json";
    const productManager = new ProductManager(filePath);
    O también se puede poner como argumento this.path = "./src/productos.json" y no pasarle parámetro al constructor
    */
        this.path = filePath;
    }

    //1)
    async getProducts() {
        const prods = JSON.parse(await fs.readFile(this.path, "utf-8"));
        return prods;
    }

    //2)
    async getProductById(id) {
        const prods = JSON.parse(await fs.readFile(this.path, "utf-8"));
        const producto = prods.find(prod => prod.id === id);

        if (producto) {
            return producto;
        } else {
            return null;
        }
    }

    //3)
    async getProductByCode(code) {
        const prods = JSON.parse(await fs.readFile(this.path, "utf-8"));
        const producto = prods.find(prod => prod.code === code);

        if (producto) {
            return producto;
        } else {
            return null;
        }
    }

    //4)
    async addProduct(product) {
        if (
            !product.title ||
            !product.description ||
            !product.price ||
            !product.code ||
            !product.status ||
            !product.stock ||
            !product.category ||
            !product.thumbnail
        ) {
            console.log("Todos los campos son obligatorios");
            return;
        }

        const prods = JSON.parse(await fs.readFile(this.path, "utf-8"));
        const prodId = prods.find(prod => prod.id === product.id);
        const prodCode = prods.find(prod => prod.code === product.code);

        if (prodId || prodCode) {
            console.log("Ya existe un producto con este id/código");
        } else {
            prods.push(product);
            await fs.writeFile(this.path, JSON.stringify(prods));
        }
    }

    //5)
    async updateProduct(id, product) {
        const prods = JSON.parse(await fs.readFile(this.path, "utf-8"));
        const indice = prods.findIndex(prod => prod.id === id);

        if (indice != -1) {
            prods[indice] = product;
            await fs.writeFile(this.path, JSON.stringify(prods));
        } else {
            console.log("Producto no encontrado");
        }
    }

    //6)
    async deleteProduct(id) {
        const prods = JSON.parse(await fs.readFile(this.path, "utf-8"));
        const productoIndex = prods.findIndex(prod => prod.id === id);

        if (productoIndex !== -1) {
            prods.splice(productoIndex, 1);
            await fs.writeFile(this.path, JSON.stringify(prods));
        } else {
            console.log("Producto no encontrado");
        }
    }
}





class Product {
    constructor(title, description, price, code, status, stock, category, thumbnail) {
        this.title = title;
        this.description = description;
        this.price = price;
        this.code = code;
        this.status = status;
        this.stock = stock;
        this.category = category;
        this.thumbnail = thumbnail;
        this.id = Product.incrementarId();
    }

    static incrementarId() {
        if (this.idIncrement) {
            this.idIncrement++;
        } else {
            this.idIncrement = 1;
        }
        return this.idIncrement;
    }
}





const producto1 = new Product("Producto 1", "Este es el producto 1", 300, "PROD001", false, 10, "Indumentaria", "ejemploImagen1.jpg");
const producto2 = new Product("Producto 2", "Este es el producto 2", 600, "PROD002", true, 30, "Calzado", "ejemploImagen2.jpg");
const producto3 = new Product("Producto 3", "Este es el producto 3", 400, "PROD003", true, 15, "Ropa deportiva", "ejemploImagen3.jpg");
const producto4 = new Product("Producto 4", "Este es el producto 4", 1200, "PROD004", true, 2, "Calzado", "ejemploImagen4.jpg");



export default ProductManager;