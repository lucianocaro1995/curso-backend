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
        this.path = './src/products.json';
    }

    //1)
    async getProducts() {
        const readJson = await fs.readFile(this.path, 'utf-8');
        const arrayForProds = JSON.parse(readJson);
        return arrayForProds;
    }

    //2)
    async getProductById(id) {
        const readJson = await fs.readFile(this.path, 'utf-8');
        const arrayForProds = JSON.parse(readJson);
        const product = arrayForProds.find(prod => prod.id === id);

        if (product) {
            return product;
        } else {
            console.log("No existe un producto con ese ID");
        }
    }

    //3)
    async addProduct(title, description, category, thumbnail, price, stock, code) {
        try {
            //Leer el archivo JSON
            const readJson = await fs.readFile(this.path, 'utf-8');
            let arrayForProds = JSON.parse(readJson);

            //Verificar si todos los campos requeridos tienen valores
            const requiredFields = [
                title,
                description,
                category,
                thumbnail,
                price,
                stock,
                code,
            ];

            const missingField = requiredFields.find(field => !field);

            if (missingField) {
                console.log("Todos los campos son obligatorios. El campo que te falta completar es: " + missingField);
            }

            //Verificar si el código ya existe en la lista de productos
            const codeExists = arrayForProds.some(prod => prod.code === code);
            if (codeExists) {
                console.log("Ya existe un producto con ese código");
            }

            //Generar un nuevo ID único
            const existingIds = new Set(arrayForProds.map(prod => prod.id));
            let newId = 1;
            while (existingIds.has(newId)) {
                newId++;
            }

            //Crear un nuevo producto y agregarlo al array de productos
            const newProduct = {
                status: "disponible",
                title,
                description,
                category,
                thumbnail,
                price,
                stock,
                code,
                id: newId
            };
            arrayForProds.push(newProduct);

            //Guardar el nuevo array de productos en el archivo JSON
            await fs.writeFile(this.path, JSON.stringify(arrayForProds, null, 4));
            console.log("Producto agregado exitosamente.");
        } catch (error) {
            console.log("Error al agregar el producto");
        }
    }

    //4)
    async updateProduct(id, product) {
        const readJson = await fs.readFile(this.path, 'utf-8');
        let arrayForProds = JSON.parse(readJson);

        const requiredFields = [
            title,
            description,
            category,
            thumbnail,
            price,
            stock,
            code,
        ];

        const missingField = requiredFields.find(field => !product[field]);

        if (missingField) {
            console.log("Todos los campos son obligatorios. El campo que te falta completar es: " + missingField);
        }

        const indice = arrayForProds.findIndex(prod => prod.id == id);
        if (indice !== -1) {
            const productId = arrayForProds[indice].id;
            const updatedProduct = { ...product, id: productId };
            arrayForProds[indice] = updatedProduct;
            await fs.writeFile(this.path, JSON.stringify(arrayForProds, null, 4));
            console.log("Producto actualizado");
        } else {
            console.log("No existe un producto con ese ID");
        }
    }

    //5)
    async deleteProduct(id) {
        const readJson = await fs.readFile(this.path, 'utf-8');
        let arrayForProds = JSON.parse(readJson);
        //El "eliminar producto" no me funcionaba porque puse 3 iguales en vez de 2. Estar atento a eso
        const product = arrayForProds.find(prod => prod.id == id);

        if (product) {
            await fs.writeFile(this.path, JSON.stringify(arrayForProds.filter(prod => prod.id != id), null, 4));
            console.log("Producto eliminado");
        } else {
            console.log("No existe un producto con ese ID");
        }
    }
}



class Product {
    constructor(title, description, category, thumbnail, price, stock, code, id) {
        this.title = title;
        this.description = description;
        this.category = category;
        this.thumbnail = thumbnail;
        this.price = price;
        this.stock = stock;
        this.code = code;
        this.id = id;
        this.status = "disponible";
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