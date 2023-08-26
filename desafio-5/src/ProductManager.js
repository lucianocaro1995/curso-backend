/*
ACLARACIÓN IMPORTANTE:
En este desafío, en el ProductManager.js realizo todo lo necesario en los métodos de la clase ProductManager
Mientras que en CartManager.js creo métodos en la clase Cart y luego los utilizo en la clase CartManager
Logro esto llamando a una nueva instancia de Cart en los métodos de CartManager
Hice los dos archivos de diferente forma para practicar y ver las diferencias
*/
import { promises as fs } from "fs";



class ProductManager {
    constructor() {
        this.path = './src/productos.json';
    }

    //1)
    async getProducts() {
        const arrayForProds = JSON.parse(await fs.readFile(this.path, "utf-8"));

        if (arrayForProds) {
            return arrayForProds;
        } else {
            console.log("No se encontraron los productos");
            throw new Error("No se encontraron los productos");
        }
    }

    //2)
    async getProductById(id) {
        const arrayForProds = JSON.parse(await fs.readFile(this.path, "utf-8"));
        const product = arrayForProds.find(prod => prod.id === id);

        if (product) {
            return product;
        } else {
            console.log("No existe un producto con ese ID");
            throw new Error("No existe un producto con ese ID");
        }
    }

    //3)
    async addProduct(product) {
        const existingData = await fs.readFile(this.path, 'utf-8');
        let arrayForProds = [];
        try {
            arrayForProds = JSON.parse(existingData);
            if (!Array.isArray(arrayForProds)) {
                arrayForProds = [];
            }
        } catch (parseError) {
            console.log("El JSON no contiene un array, se creará uno");
        }

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
            console.log("Todos los campos son obligatorios. El campo que te falta completar es: " + missingField);
            throw new Error("Todos los campos son obligatorios. El campo que te falta completar es: " + missingField);
        }

        if (product.status === false) {
            console.log("El estado del producto es false, no se puede agregar");
            throw new Error("El estado del producto es false, no se puede agregar");
        }

        const prodId = arrayForProds.find(prod => prod.id === product.id);
        const prodCode = arrayForProds.find(prod => prod.code === product.code);

        if (prodId || prodCode) {
            console.log("Ya existe un producto con ese ID o código");
            throw new Error("Ya existe un producto con ese ID o código");
        } else {
            const existingIds = new Set(arrayForProds.map(prod => prod.id));
            let newId = 1;
            while (existingIds.has(newId)) {
                newId++;
            }
            product.id = newId;
            arrayForProds.push(product);
            await fs.writeFile(this.path, JSON.stringify(arrayForProds, null, 4));
            console.log("Producto agregado exitosamente");
        }
    }

    //4)
    async updateProduct(id, product) {
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
            console.log("Todos los campos son obligatorios. El campo que te falta completar es: " + missingField);
            throw new Error("Todos los campos son obligatorios. El campo que te falta completar es: " + missingField);
        }

        const arrayForProds = JSON.parse(await fs.readFile(this.path, "utf-8"));
        const indice = arrayForProds.findIndex(prod => prod.id === id);

        if (indice !== -1) {
            const productId = arrayForProds[indice].id;
            const updatedProduct = { ...product, id: productId };
            arrayForProds[indice] = updatedProduct;
            await fs.writeFile(this.path, JSON.stringify(arrayForProds, null, 4));
            console.log("Producto actualizado");
        } else {
            console.log("No existe un producto con ese ID");
            throw new Error("No existe un producto con ese ID");
        }
    }

    //5)
    async deleteProduct(id) {
        const arrayForProds = JSON.parse(await fs.readFile(this.path, "utf-8"));
        const product = arrayForProds.find(prod => prod.id === id);

        if (product) {
            await fs.writeFile(this.path, JSON.stringify(arrayForProds.filter(prod => prod.id != id), null, 4));
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
        this.id = id;
    }

    /*
    El id autoincrementable ahora lo borré de acá. Puedo hacerlo de 2 formas:
    1) Una forma de hacerlo es no crearlo acá (como hice ahora), sino directamente incrementar el id en el método "addProduct"
    2) También puedo crear un método en esta clase para manejar el id y utilizar su función en otra clase
    ¿Cómo lo hago? Llamo a la clase Product en el método que lo necesite, en este caso "addProduct" de la clase ProductManager
    Se lo llama creando una nueva instancia, es decir "new Product"
    Explicación:
    Se crea una nueva instancia de una clase(Product) para poder utilizar sus métodos en otra clase(ProductManager)
    */
}



export default ProductManager;