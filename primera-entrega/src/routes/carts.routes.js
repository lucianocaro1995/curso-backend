//No necesito importar todo el módulo de express en este archivo. Solamente necesito para trabajar las rutas
import { Router } from 'express';

//En vez de crear una variable app, solamente creo la variable de mis rutas
const cartsRouter = Router()

//Importo rutas
import CartManager from '../CartManager.js';
const cartManager = new CartManager('./src/carts.json');





//1) POST
//Método para crear un nuevo carrito. Sólo voy a crear uno
cartsRouter.post('/', async (req, res) => {
    const cart = await cartManager.createCart();
    res.status(200).send(cart)
})

//2) POST(cid = cart id)
//Método para agregar un nuevo producto al carrito seleccionado, utilizando su id
cartsRouter.post('/:cid/product/:pid', async (req, res) => {
    const product = await cartManager.addProductToCart(req.params.cid,req.params.pid);

    if (product) {
        res.status(400).send("Producto ya existente")
    } else {
        prods.push(req.body)
        res.status(200).send("Producto creado")
    }
})

//3) GET(cid = cart id)
//Método para mostrar los productos del carrito seleccionado, utilizando su id
cartsRouter.get('/:cid', async (req, res) => {
    const prods = await cartManager.getCartById(req.params.cid);
    res.status(200).send(prods)
})





//Cuando es un único elemento de todo el archivo, se utiliza export default. Sino se utiliza export
export default cartsRouter