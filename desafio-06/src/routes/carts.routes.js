import { Router } from "express"
import { CartManager } from "../dao/DB/cartsManager.js"



const cartRouter = Router()

//1) GET
cartRouter.get('/', async (req, res) => {
    const {limit} = req.query
    try {
        const carts = await CartManager.findAll(limit);
        res.status(200).send({respuesta: 'ok', mensaje: carts})
    } catch (error){
        res.status(400).send({respuesta: 'Error', mensaje: error})
    }
})

//2) GET(id)
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
cartRouter.post('/', async (req, res) => {
    try {
        const respuesta = await CartManager.create();
        res.status(200).send({respuesta: 'OK cart created', mensaje: respuesta})
    } catch (error){
        res.status(400).send({respuesta: 'Error at cart creation', mensaje: error})
    }
})

//4) POST(cid/pid)
cartRouter.post('/:cid/products/:pid', async (req, res) =>{
    const {cid, pid} = req.params
    const {quantity} = req.body
    
    try {
        await CartManager.addProductInCart(cid, pid, quantity);
        res.status(200).send({ respuesta: 'OK', mensaje: 'Cart Updated' });
    } catch (error) {
        res.status(error.message.includes("not found") ? 404 : 400).send({ respuesta: 'Error', mensaje: error.message });
    }
})



export default cartRouter;