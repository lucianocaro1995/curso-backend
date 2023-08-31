import { Router } from 'express';
const cartsRouter = Router()
import CartManager from '../CartManager.js';
const cartManager = new CartManager();



//1) POST
//Método para crear un nuevo carrito. Sólo vamos a usar uno
//Poner esto en la ruta: localhost:8080/api/carts
cartsRouter.post('/', async (req, res) => {
    try {
        const newCart = await cartManager.createCart();
        res.status(200).json({ message: "Carrito creado exitosamente", newCart });
    } catch (error) {
        res.status(500).json(error.message);
    }
})

//2) POST(cid = cart id)
//Método para agregar un nuevo producto al carrito seleccionado, utilizando su id
//Poner esto en la ruta: localhost:8080/api/carts/1/product/3
cartsRouter.post('/:cid/product/:pid', async (req, res) => {
    try {
        const cid = parseInt(req.params.cid);
        const pid = parseInt(req.params.pid);
        await cartManager.addProductToCart(cid, pid);
        const chosenCart = await cartManager.getCartById(cid);    
        const cartContent = chosenCart.products;
        res.status(200).json({ message: "Producto agregado al carrito", cartContent });
    } catch (error) {
        res.status(500).json(error.message);
    }
});

//3) GET(cid = cart id)
//Método para mostrar los productos del carrito seleccionado, utilizando su id
//Poner esto en la ruta: localhost:8080/api/carts/1
cartsRouter.get('/:cid', async (req, res) => {
    try {
        const cid = parseInt(req.params.cid);
        const chosenCart = await cartManager.getCartById(cid);
        const cartContent = chosenCart.products;
        res.status(200).json({ message: "Mostrando los productos dentro del carrito con id:" + cid , cartContent });
    } catch (error) {
        res.status(500).json(error.message);
    }
});



export default cartsRouter