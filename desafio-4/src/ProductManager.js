import { promises as fs } from "fs";



class ProductManager {
    constructor() {
        this.path = './src/productos.json';
    }

    //1)
    async getProducts() {
        const prods = JSON.parse(await fs.readFile(this.path, "utf-8"));

        if (prods) {
            return prods;
        } else {
            console.log("No se encontraron los productos");
            throw new Error("No se encontraron los productos");
        }
    }

    //2)
    async getProductById(id) {
        const prods = JSON.parse(await fs.readFile(this.path, "utf-8"));
        const producto = prods.find(prod => prod.id === id);

        if (producto) {
            return producto;
        } else {
            console.log("No existe un producto con ese ID");
            throw new Error("No existe un producto con ese ID");
        }
    }

    //3)
    async addProduct(product) {
        const requiredFields = [
            "title",
            "description",
            "price",
            "code",
            "status",
            "stock",
            "category",
            "thumbnail"
        ];

        const missingField = requiredFields.find(field => !product[field]);

        if (missingField) {
            console.log("Todos los campos son obligatorios. El campo que te falta completar es: ", missingField);
            throw new Error("Todos los campos son obligatorios. El campo que te falta completar es: " + missingField);
        }

        if (product.status === false) {
            console.log("El estado del producto es false, no se puede agregar");
            throw new Error("El estado del producto es false, no se puede agregar");
        }

        const prods = JSON.parse(await fs.readFile(this.path, "utf-8"));
        const prodId = prods.find(prod => prod.id === product.id);
        const prodCode = prods.find(prod => prod.code === product.code);

        if (prodId || prodCode) {
            console.log("Ya existe un producto con ese ID o código");
            throw new Error("Ya existe un producto con ese ID o código");
        } else {
            prods.push(product);
            await fs.writeFile(this.path, JSON.stringify(prods));
            console.log("Producto agregado exitosamente");
        }
    }

    //4)
    async updateProduct(id, product) {
        const prods = JSON.parse(await fs.readFile(this.path, "utf-8"));
        const indice = prods.findIndex(prod => prod.id === id);

        if (indice !== -1) {
            const productId = prods[indice].id;
            const updatedProduct = { ...product, id: productId };
            prods[indice] = updatedProduct;

            await fs.writeFile(this.path, JSON.stringify(prods));
            console.log("Producto actualizado");
        } else {
            console.log("No existe un producto con ese ID");
            throw new Error("No existe un producto con ese ID");
        }
    }

    //5)
    async deleteProduct(id) {
        const prods = JSON.parse(await fs.readFile(this.path, "utf-8"));
        const producto = prods.find(prod => prod.id === id);

        if (producto) {
            await fs.writeFile(this.path, JSON.stringify(prods.filter(prod => prod.id != id)));
            console.log("Producto eliminado");
        } else {
            console.log("No existe un producto con ese ID");
            throw new Error("No existe un producto con ese ID");
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



export default ProductManager;