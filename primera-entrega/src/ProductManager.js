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
            console.log("Ya existe un producto con ese ID o código");
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
    constructor(title, description, price, code, stock, category, thumbnail, status = false) {
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





export default ProductManager;