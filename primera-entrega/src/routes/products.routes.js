//No necesito importar todo el módulo de express en este archivo. Solamente necesito para trabajar las rutas
import { Router } from 'express';

//En vez de crear una variable app, solamente creo la variable de mis rutas
const prodsRouter = Router()

//Importo rutas de mi aplicación
import ProductManager from '../ProductManager.js';
const productManager = new ProductManager('./src/productos.json');





//1) GET
//Método para ver todos los productos. Acá genero la primera ruta de mi aplicación
prodsRouter.get('/', async (req, res) => {
    const prods = await productManager.getProducts();
    res.status(200).send(prods)
})

//2) GET(pid = product id)
//Método para consultar por un producto, utilizando su id
prodsRouter.get('/:pid', async (req, res) => {
    const { id } = req.params;
    const product = await productManager.getProductById(parseInt(id));

    if (product) {
        res.status(200).send(product)
    } else {
        res.status(404).send("Producto no existente")
    }
})

//3) POST
//Método para agregar un producto
prodsRouter.post('/', async (req, res) => {
    const product = await productManager.addProduct();

    if (product) {
        res.status(400).send("Producto ya existente")
    } else {
        prods.push(req.body)
        res.status(200).send("Producto creado")
    }
})

//4) PUT(pid = product id)
//Método para actualizar todos los atributos de un producto, utilizando su id
prodsRouter.put('/:pid', async (req, res) => {
    const { id } = req.params;
    const product = await productManager.getProductById(parseInt(req.params.id));

    if(product) {
        await productManager.updateProduct(parseInt(id), req.body)
        res.status(200).send("Producto actualizado")
    } else {
        res.status(404).send("Producto no encontrado")
    }
})

//5) DELETE(pid = product id)
//Método para eliminar un producto, utilizando su id
prodsRouter.delete('/:pid', async (req, res) => {
    const { id } = req.params;
    const product = await productManager.getProductById(parseInt(req.params.id));

    if(product) {
        await productManager.deleteProduct(parseInt(id))
        res.status(200).send("Producto eliminado")
    } else {
        res.status(404).send("Producto no encontrado")
    }
})





//Cuando es un único elemento de todo el archivo, se utiliza export default. Sino se utiliza export
export default prodsRouter