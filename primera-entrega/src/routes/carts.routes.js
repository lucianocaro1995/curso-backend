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
    try {
        const newCart = await cartManager.createCart();

        if (newCart) {
            res.status(200).json({ message: "Carrito creado exitosamente", newCart })
        } else {
            res.status(404).json({ message: "No se pudo crear un carrito" })
        }
    } catch (error) {
        console.error("Hubo un error al procesar la solicitud:", error);
        res.status(500).json({ error: "Hubo un error al procesar la solicitud" });
    }
})



//2) POST(cid = cart id)
//Método para agregar un nuevo producto al carrito seleccionado, utilizando su id
//Poner esto en la ruta: localhost:8080/api/carts/1/product/3
cartsRouter.post('/:cid/product/:pid', async (req, res) => {
    try {
        const cid = parseInt(req.params.cid);
        const pid = parseInt(req.params.pid);
        const product = await cartManager.addProductToCart(cid, pid);

        if (!product) {
            res.status(200).json({ message: "Producto agregado al carrito", product });
        } else {
            res.status(404).json({ message: "No se pudo agregar el producto al carrito" });
        }
    } catch (error) {
        console.error("Hubo un error al procesar la solicitud:", error);
        res.status(500).json({ error: "Hubo un error al procesar la solicitud" });
    }
});



//3) GET(cid = cart id)
//Método para mostrar los productos del carrito seleccionado, utilizando su id
//Poner esto en la ruta: localhost:8080/api/carts/1
cartsRouter.get('/:cid', async (req, res) => {
    try {
        const cid = parseInt(req.params.cid);
        const productsInCart = await cartManager.getCartById(cid);

        if (productsInCart) {
            res.status(200).json(productsInCart);
        } else {
            res.status(404).json({ message: "No existe un carrito con ese ID" });
        }
    } catch (error) {
        console.error("Hubo un error al procesar la solicitud:", error);
        res.status(500).json({ error: "Hubo un error al procesar la solicitud" });
    }
});





//Cuando es un único elemento de todo el archivo, se utiliza export default. Sino se utiliza export
export default cartsRouter