//No necesito importar todo el módulo de express en este archivo. Solamente necesito para trabajar las rutas
import { Router } from 'express';

//En vez de crear una variable app, solamente creo la variable de mis rutas
const cartsRouter = Router()

//Importo rutas
import CartManager from '../CartManager.js';
const cartManager = new CartManager('./src/carts.json');





//1) POST
//Método para crear un nuevo carrito. Sólo vamos a usar uno
//Poner esto en la ruta: localhost:8080/api/carts
cartsRouter.post('/', async (req, res) => {
    const newCart = await cartManager.createCart();

    if (newCart) {
        res.status(201).json({ message: "Carrito creado exitosamente", cartId });
    } else {
        res.status(404).json({ message: "No se pudo crear el carrito" });
    }
});

//2) POST(cid = cart id) NO FUNCIONA
//Método para agregar un nuevo producto al carrito seleccionado, utilizando su id
//Poner esto en la ruta: localhost:8080/api/carts/:1/product/:3
cartsRouter.post('/:cid/product/:pid', async (req, res) => {
    const { cid, pid } = req.params;
    const success = await cartManager.addProductToCart(parseInt(cid), parseInt(pid));
    
    if (success) {
        res.status(200).json({ message: "Producto agregado exitosamente" });
    } else {
        res.status(404).json({ message: "No se encontró el carrito especificado" });
    }
});

//3) GET(cid = cart id) NO FUNCIONA
//Método para mostrar los productos del carrito seleccionado, utilizando su id
//Poner esto en la ruta: localhost:8080/api/carts/1
cartsRouter.get('/:cid', async (req, res) => {
    const cartId = parseInt(req.params.cid);
    const cart = await cartManager.getCartById(cartId);
    
    if (cart) {
        res.status(200).json(cart);
    } else {
        res.status(404).json({ message: "No se encontró el carrito especificado" });
    }
});





//Cuando es un único elemento de todo el archivo, se utiliza export default. Sino se utiliza export
export default cartsRouter