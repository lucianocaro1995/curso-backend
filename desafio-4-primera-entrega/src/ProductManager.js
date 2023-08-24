import { promises as fs } from "fs";



class ProductManager {
    //Paso filePath como parámetro
    constructor(filePath) {
        /*
        Ubico el path como argumento de la clase ProductManager, y no fuera de la clase como hacía antes
        La diferencia es que haciendo esto, puedo utilizar varios path para distintas clases en el mismo archivo
        Estoy definiendo que este path le pertenece a esta clase. filePath es una variable
        1) Puedo utilizar esto:
        const productManager = new ProductManager("./src/productos.json");
        2) O esto:
        const filePath = "./src/productos.json";
        const productManager = new ProductManager(filePath);
        3) O también se puede poner como argumento this.path = "./src/productos.json" y no pasarle parámetro al constructor
        4) O como hice en este código: this.path = filePath y paso el parámetro filePath al constructor
        */
        this.path = filePath;
    }

    /*
    IMPORTANTE:
    Console.error es para la terminal de vsc - Throw new error es para la terminal de Postman
    trow new Error me envía el mensaje a los "res.status(500).json(error.message)" del archivo de rutas
    Pero las respuestas exitosas como "res.status(200).json" no pueden recibir mensajes de nadie
    En esos casos, hay que poner "res.status(200).json" en el archivo de rutas, y "console.log" acá
    */
    
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
            "thumbnail",
            "id"
        ];

        const missingField = requiredFields.find(field => !product[field]);

        if (missingField) {
            console.log("Todos los campos son obligatorios. El campo que te falta completar es: " + missingField);
            throw new Error("Todos los campos son obligatorios. El campo que te falta completar es: " + missingField);
        }

        //Cuando creo un nuevo producto desde Postman con todos sus atributos, si pongo "status = false" por defecto Postman no me deja agregar el producto
        //Es por esta razón que tengo que agregar una verificación en caso de que el status sea false
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
            //Los parámetros null y 2 se utilizan para mejorar la legibilidad del json
            await fs.writeFile(this.path, JSON.stringify(prods, null, 2));
            console.log("Producto agregado exitosamente");
        }
    }

    //4)
    async updateProduct(id, product) {
        const prods = JSON.parse(await fs.readFile(this.path, "utf-8"));
        const indice = prods.findIndex(prod => prod.id === id);

        if (indice !== -1) {
            //Guarda el valor del id antes de actualizar el producto
            const productId = prods[indice].id;

            //Actualiza los campos del producto, excepto el id
            const updatedProduct = { ...product, id: productId };
            prods[indice] = updatedProduct;

            await fs.writeFile(this.path, JSON.stringify(prods, null, 2));
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
            await fs.writeFile(this.path, JSON.stringify(prods.filter(prod => prod.id != id), null, 2));
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