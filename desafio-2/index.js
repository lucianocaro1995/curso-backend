//Importo las promesas de file system y las llamo fs
import { promises as fs } from "fs";
//Creo una constante con la ruta al archivo json así no lo tengo que copiar todo el tiempo y simplemente pongo "path"
const path = "./productos.json";




//Genero 5 métodos para la clase ProductManager que hagan lo que yo necesito hacer: consultar, agregar y modificar mi proyecto
//Estos 5 se pueden crear como funciones separadas, o también como métodos de una clase
//JSON.parse: de json a objeto
//JSON.stringify: de objeto a json
class ProductManager {
    constructor() {
        this.products = [];
    }

    //1) Método getProducts: consulto TODOS los productos en mi archivo json
    async getProducts() {
        const prods = JSON.parse(await fs.readFile(path, "utf-8"));
        console.log(prods);
    }

    //2) Método getProductByID: recibo un id de parámetro, y consulto por un sólo producto dado su id
    async getProductById(id) {
        const prods = JSON.parse(await fs.readFile(path, "utf-8"));
        const producto = prods.find(prod => prod.id === id);

        if (producto) {
            console.log(producto);
        } else {
            console.log("Producto no encontrado");
        }
    }

    //3) Método addProduct: si existe este producto no lo agrego. Si no existe entonces sí lo agrego
    async addProduct(product) {
        const prods = JSON.parse(await fs.readFile(path, "utf-8"));
        const producto = prods.find(prod => prod.id === product.id);

        if (producto) {
            console.log("Producto ya agregado");
        } else {
            //Si no existe lo pusheo a ese array
            prods.push(product);
            //Modifico el json con el nuevo contenido
            //Para modificar un array, debo pisar el anterior contenido porque ahora tengo un contenido nuevo
            await fs.writeFile(path, JSON.stringify(prods));
        }
    }

    //4) Método updateProduct para modificar: pide 2 parámetros, un id para consultar y un producto para modificar. FindIndex me devuelve la posición del elemento en el array
    async updateProduct(id, product) {
        const prods = JSON.parse(await fs.readFile(path, "utf-8"));
        const indice = prods.findIndex(prod => prod.id === id);

        //Consulto si existe o no. findIndex me devuelve -1 si no encuentra nada
        if (indice != -1) {
            prods[indice].title = product.title;
            prods[indice].description = product.description;
            prods[indice].price = product.price;
            prods[indice].code = product.code;
            prods[indice].stock = product.stock;
            prods[indice].thumbnail = product.thumbnail;

            //Modifico el json con el nuevo contenido
            await fs.writeFile(path, JSON.stringify(prods));
        } else {
            console.log("Producto no encontrado");
        }
    }

    //5) Método deleteProduct para eliminar: pide 1 parámetro, el id
    async deleteProduct(id) {
        const prods = JSON.parse(await fs.readFile(path, "utf-8"));
        const producto = prods.find(prod => prod.id === id);

        //Si encuentra al producto que lo borre del JSON, sino poneme producto no encontrado
        if (producto) {
            await fs.writeFile(path, JSON.stringify(prods.filter(prod => prod.id != id)));
        } else {
            console.log("Producto no encontrado");
        }
    }
}





//Creo la clase de los productos y autoincremento el id
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

//Creo los productos
const producto1 = new Product("Producto 1", "Este es el producto 1", 300, "PROD001", 10, "ejemploImagen1.jpg")
const producto2 = new Product("Producto 2", "Este es el producto 2", 600, "PROD002", 30, "ejemploImagen2.jpg")
const producto3 = new Product("Producto 3", "Este es el producto 3", 400, "PROD003", 15, "ejemploImagen3.jpg")





//Creo un nuevo objeto de la clase "productManager". Al ser una clase tengo que generar un objeto de la misma
const productManager = new ProductManager()

//Utilizo los 5 métodos creados
//Para ver en la terminal escribo node nombre_del_archivo, en este caso node index.js
//Tengo que hacerlo 1 vez para que se agreguen los productos, y 2 para verlo reflejado en consola
async function metodos() {
    //1) Consulto por todos los productos
    await productManager.getProducts();

    //2) Llamo a la función con un parámetro indicado para saber si existe ese producto en particular
    await productManager.getProductById(2);

    //3) Yo cree los productos en la línea 114 (que no existen en el json), por lo tanto con addProduct los agrego al json
    await productManager.addProduct(producto1, producto2, producto3);

    //4) Actualizo un producto gracias a la función updateProduct. Solamente modifico el title
    await productManager.updateProduct(2, { "title":"Producto title cambiado", "description":"Este es el producto 2", "price":600, "code":"PROD002", "stock":30, "thumbnail":"ejemploImagen2.jpg" });

    //5) Elimino un producto
    await productManager.deleteProduct(3);
}

//Ejecuto
metodos();