import { Router } from "express"
import { cartModel } from "../dao/models/carts.models.js";



const cartRouter = Router()

//1) GET
//Poner esto en la ruta: localhost:4000/api/carts?limit=5
cartRouter.get('/', async (req, res) => {
    const { limit } = req.query;
    try {
        const carts = await cartModel.find().limit(limit);
        res.status(200).send({ respuesta: 'ok', mensaje: carts });
    } catch (error) {
        res.status(400).send({ respuesta: 'Error', mensaje: error });
    }
});

//2) GET(cid)
//Poner esto en la ruta: localhost:4000/api/carts/650634b0d93e20a1d2393a17
cartRouter.get('/:id', async (req, res) => {
    const {id} = req.params
    try {
        const cart = await cartModel.findById(id);
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
        const respuesta = await cartModel.create();
        res.status(200).send({respuesta: 'OK cart created', mensaje: respuesta})
    } catch (error){
        res.status(400).send({respuesta: 'Error at cart creation', mensaje: error})
    }
})

//4) POST(cid/pid)
//Poner esto en la ruta: localhost:4000/api/carts/650634b0d93e20a1d2393a17/products/650636d0d3c359de670f30a8
cartRouter.post('/:cid/products/:pid', async (req, res) => {
    const { cid, pid } = req.params;
    const { quantity } = req.body;
    try {
        const cart = await cartModel.findById(cid);
        if (!cart) {
            throw new Error("Cart not found");
        }
        const product = await cartModel.findById(pid);
        if (!product) {
            throw new Error("Product not found");
        }
        const index = cart.products.findIndex(prod => prod.id_prod._id.toString() === pid);
        if (index !== -1) {
            cart.products[index].quantity = quantity;
        } else {
            cart.products.push({ id_prod: pid, quantity: quantity });
        }
        await cart.save();
        res.status(200).send({ respuesta: 'OK', mensaje: 'Cart Updated' });
    } catch (error) {
        res.status(error.message.includes("not found") ? 404 : 400).send({ respuesta: 'Error', mensaje: error.message });
    }
});

//5) PUT(cid)
//Poner esto en la ruta: localhost:4000/api/carts/650634b0d93e20a1d2393a17
cartRouter.put('/:cid', async (req, res) => {
    const { cid } = req.params;
    const productsArray = req.body.products;
    if (!Array.isArray(productsArray)) {
        return res.status(400).send({ respuesta: 'Error', mensaje: 'Products should be an array' });
    }
    try {
        const cart = await cartModel.findById(cid);
        if (!cart) {
            throw new Error("Cart not found");
        }
        for (let prod of productsArray) {
            const index = cart.products.findIndex(cartProduct => cartProduct.id_prod.toString() === prod.id_prod);
            if (index !== -1) {
                cart.products[index].quantity = prod.quantity;
            } else {
                const exists = await cartModel.findById(prod.id_prod);
                if (!exists) {
                    throw new Error(`Product with ID ${prod.id_prod} not found`);
                }
                cart.products.push(prod);
            }
        }
        await cart.save();
        res.status(200).send({ respuesta: 'OK', mensaje: 'Cart updated successfully' });
    } catch (error) {
        res.status(error.message.includes("not found") ? 404 : 400).send({ respuesta: 'Error', mensaje: error.message });
    }
});

//6) PUT(cid/pid)
//Poner esto en la ruta: localhost:4000/api/carts/650634b0d93e20a1d2393a17/products/650636d0d3c359de670f30a8
cartRouter.put('/:cid/products/:pid', async (req, res) => {
    const { cid, pid } = req.params;
    const { quantity } = req.body;
    try {
        const cart = await cartModel.findById(cid);
        if (!cart) {
            throw new Error("Cart not found");
        }
        const index = cart.products.findIndex(prod => prod.id_prod._id.toString() === pid);
        if (index !== -1) {
            cart.products[index].quantity = quantity;
        } else {
            cart.products.push({ id_prod: pid, quantity: quantity });
        }
        await cart.save();
        res.status(200).send({ respuesta: 'OK', mensaje: 'Cart Updated' });
    } catch (error) {
        res.status(error.message.includes("not found") ? 404 : 400).send({ respuesta: 'Error', mensaje: error.message });
    }
});

//7) DELETE(cid)
//Poner esto en la ruta: localhost:4000/api/carts/650634b0d93e20a1d2393a17
cartRouter.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const cart = await cartModel.findById(id);
        if (!cart) {
            throw new Error("Cart not found");
        }
        cart.products = [];
        await cart.save();
        res.status(200).send({ respuesta: 'ok', mensaje: 'Cart Empty' });
    } catch (error) {
        res.status(error.message.includes("not found") ? 404 : 400).send({ respuesta: 'Error', mensaje: error.message });
    }
});

//8) DELETE(cid/pid)
//Poner esto en la ruta: localhost:4000/api/carts/650634b0d93e20a1d2393a17/products/650636d0d3c359de670f30a8
cartRouter.delete('/:cid/products/:pid', async (req, res) => {
    const { cid, pid } = req.params;
    try {
        const cart = await cartModel.findById(cid);
        if (!cart) {
            throw new Error("Cart not found");
        }
        const index = cart.products.findIndex(prod => prod.id_prod._id.toString() === pid);
        if (index !== -1) {
            cart.products.splice(index, 1);
            await cart.save();
            res.status(200).send({ respuesta: 'OK', mensaje: 'Product removed' });
        } else {
            throw new Error("Product not found in the cart");
        }
    } catch (error) {
        res.status(error.message.includes("not found") ? 404 : 400).send({ respuesta: 'Error', mensaje: error.message });
    }
});



export default cartRouter;