//No necesito importar todo el módulo de express en este archivo. Solamente necesito para trabajar las rutas
import { Router } from "express";

//En vez de crear una variable app, solamente creo la variable de mis rutas
const prodsRouter = Router()

//Importo rutas de mi aplicación
import ProductManager from "./ProductManager.js";
//Tengo que pasar la dirección del json acá porque ahora utilizo el path como argumento de la clase ProductManager
const productManager = new ProductManager("./src/productos.json");





//1) GET
//Método para ver todos los productos. Acá genero la primera ruta de mi aplicación
prodsRouter.get("/", async (req, res) => {
    //Genero un límite
    const { limit } = req.query

    //Obtengo todos los productos
    //Utilizo el await cuando el código de la derecha es asincrónico (en este caso, el productManager.getProducts)
    const prods = await productManager.getProducts()

    //Slice pide 2 parámetros: inicio y fin
    const products = prods.slice(0, limit)

    //Respondo
    res.status(200).send(products)
})

//2) GET(id)
//Método para consultar por un producto gracias a su id
prodsRouter.get("/:id", async (req, res) => {
    //Genero el parámetro
    const { id } = req.params

    //Obtengo un producto gracias a su id
    const prod = await productManager.getProductById(parseInt(id))

    if (prod) {
        res.status(200).send(prod)
    } else {
        res.status(404).send("Producto no encontrado")
    }
})

//3) POST
//Método para agregar un producto
//Post no necesita un id, porque un producto cuando se crea y agrega no necesita un id. Post necesita el código
//El código me ayuda a verificar si el producto existe o no en un método post
prodsRouter.post('/products', (req, res) => {
    //No puedo utilizar params porque estoy enviando todo el contenido de mi producto
    //No puedo utilizar query porque eso se utiliza para hacer consultas
    //Por eso se utiliza el body para método POST
    const producto = prods.find(prod => prod.code === req.body.code)

    if (producto) {
        res.status(400).send("Producto ya existente")
    } else {
        prods.push(req.body)
        res.status(200).send("Producto creado")
    }
})

//4) PUT
//Método para actualizar todo el producto con todos sus atributos
prodsRouter.put('/products/:id', (req, res) => {
    //Primero consulto por el id (que no se modifica) y luego consulto por todos los otros atributos que SÍ puedo modificar
    const { id } = req.params
    const { title, description, price, code, stock, thumbnail } = req.body

    //FindIndex me devuelve la posición del elemento en el array
    const productIndex = prods.findIndex(prod => prod.id === parseInt(id))

    if (productIndex != -1) {
        prods[productIndex].title = title
        prods[productIndex].description = description
        prods[productIndex].price = price
        prods[productIndex].code = code
        prods[productIndex].stock = stock
        prods[productIndex].thumbnail = thumbnail
        res.status(200).send(`Producto ${title} actualizado`)
    } else {
        res.status(404).send("Producto no encontrado")
    }
})

//5) DELETE
prodsRouter.delete('/products/:id', (req, res) => {
    const { id } = req.params

    const productIndex = prods.findIndex(prod => prod.id === parseInt(id))

    if (productIndex != -1) {
        prods = prods.filter(prod => prod.id != parseInt(id))
        res.status(200).send(`Producto eliminado`)
    } else {
        res.status(404).send("Producto no encontrado")
    }
})





//Cuando es un único elemento de todo el archivo, se utiliza export default. Sino se utiliza export
export default prodsRouter
//IMPORTANTE: Debo ejecutar "npm run dev" en la terminal para poder ver el localhost:4000 en mi navegador