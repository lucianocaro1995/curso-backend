import { Router } from "express"
import { CartManager } from "../dao/DB/cartsManager.js"



const cartRouter = Router()

//1) GET
//Poner esto en la ruta: localhost:4000/api/carts
cartRouter.get('/', async (req, res) => {
    const {limit} = req.query
    try {
        const carts = await CartManager.findAll(limit);
        res.status(200).send({respuesta: 'ok', mensaje: carts})
    } catch (error){
        res.status(400).send({respuesta: 'Error', mensaje: error})
    }
})

//2) GET(cid)
//Poner esto en la ruta: localhost:4000/api/carts/cid
cartRouter.get('/:id', async (req, res) => {
    const {id} = req.params
    try {
        const cart = await CartManager.findById(id);
        if (cart)
            res.status(200).send({respuesta: 'ok', mensaje: cart})
        else 
            res.status(404).send({respuesta: 'Error', mensaje: 'Product not found'})
    } catch (error){
        res.status(400).send({respuesta: 'Error getting cart by id', mensaje: error})
    }
})

//3) POST
//Poner esto en la ruta: localhost:4000/api/carts
cartRouter.post('/', async (req, res) => {
    try {
        const respuesta = await CartManager.create();
        res.status(200).send({respuesta: 'OK cart created', mensaje: respuesta})
    } catch (error){
        res.status(400).send({respuesta: 'Error at cart creation', mensaje: error})
    }
})

//4) POST(cid/pid)
//Poner esto en la ruta: localhost:4000/api/carts/cid/products/pid
cartRouter.post('/:cid/products/:pid', async (req, res) =>{
    const {cid, pid} = req.params
    const {quantity} = req.body
    
    try {
        await CartManager.addOrUpdateProductInCart(cid, pid, quantity);
        res.status(200).send({ respuesta: 'OK', mensaje: 'Cart Updated' });
    } catch (error) {
        res.status(error.message.includes("not found") ? 404 : 400).send({ respuesta: 'Error', mensaje: error.message });
    }
})

//5) PUT(cid)
//Poner esto en la ruta: localhost:4000/api/carts/cid
cartRouter.put('/:cid', async (req, res) => {
    const { cid } = req.params;
    const productsArray = req.body.products;

    if (!Array.isArray(productsArray)) {
        return res.status(400).send({ respuesta: 'Error', mensaje: 'Products should be an array' });
    }

    try {
        await CartManager.updateCartWithProducts(cid, productsArray);
        res.status(200).send({ respuesta: 'OK', mensaje: 'Cart updated successfully' });
    } catch (error) {
        res.status(error.message.includes("not found") ? 404 : 400).send({ respuesta: 'Error', mensaje: error.message });
    }
})

//6) PUT(cid/pid)
//Poner esto en la ruta: localhost:4000/api/carts/cid/products/pid
cartRouter.put('/:cid/products/:pid', async (req, res) =>{
    const {cid, pid} = req.params
    const {quantity} = req.body
    
    try {
        await CartManager.addOrUpdateProductInCart(cid, pid, quantity);
        res.status(200).send({ respuesta: 'OK', mensaje: 'Cart Updated' });
    } catch (error) {
        res.status(error.message.includes("not found") ? 404 : 400).send({ respuesta: 'Error', mensaje: error.message });
    }
})

//7) DELETE(cid)
//Poner esto en la ruta: localhost:4000/api/carts/cid
cartRouter.delete('/:id', async (req, res) => {
    const {id} = req.params
    try {
        await CartManager.cleanCart(id);
        res.status(200).send({respuesta: 'ok', mensaje: 'Cart Empty'});
    } catch (error){
        res.status(400).send({respuesta: 'Error getting cart by id', mensaje: error})
    }
})

//8) DELETE(cid/pid)
//Poner esto en la ruta: localhost:4000/api/carts/cid/products/pid
cartRouter.delete('/:cid/products/:pid', async (req, res) =>{
    const {cid, pid} = req.params
    
    try {
        await CartManager.removeProductbyId(cid, pid);
        res.status(200).send({ respuesta: 'OK', mensaje: 'Product removed' });
    } catch (error) {
        res.status(error.message.includes("not found") ? 404 : 400).send({ respuesta: 'Error', mensaje: error.message });
    }
})



export default cartRouter;