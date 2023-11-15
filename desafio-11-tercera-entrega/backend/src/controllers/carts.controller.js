import { cartModel } from "../models/carts.models.js";
import { productModel } from "../models/products.models.js";

// Crear los controlers de los carritos 
export const getCarts = async (req, res) => {
    const {limit} = req.query;
    try {
        const carts = await cartModel.find().limit(limit);
        res.status(200).send({respuesta: 'ok', mensaje: carts})
    } catch (error){
        res.status(400).send({respuesta: 'Error', mensaje: error})
    }
}

export const getCart = async (req, res) => {
    const {id} = req.params
    console.log('id', id)
    try {
        const cart = await cartModel.findById(id);
        if (cart) {
            const totalQuantity = cart.products.reduce((acc, product) => acc + product.quantity, 0);
            const totalAmount = cart.products.reduce((acc, product) => acc + (product.quantity * product.id_prod.price) , 0);
            res.status(200).send({respuesta: 'ok', payload: {cart, totalQuantity, totalAmount}})
        } else 
            res.status(404).send({respuesta: 'Error', err: 'Product not found'})
    } catch (error){
        res.status(400).send({respuesta: 'Error', mensaje: error})
    }
}

export const createCartLogic = async () => {
    try {
        console.log('Creating cart');
        const cart = await cartModel.create({});
        console.log('Cart created: ', cart);
        return cart;
        } catch (error) {
        console.log('error created', error);
        throw error;
        }
    };
    
    export const createCart = async (req, res) => {
        try {
        const cart = await createCartLogic();
        return res.status(201).send({respuesta: 'ok', mensaje: cart});
        } catch (error) {
        console.log('error created', error);
        res.status(400).send({respuesta: 'Error', mensaje: error});
        }
    };
    

export const cleanCart = async (req, res) => {
    const {id} = req.params
    try {
        const cart = await cartModel.findById(id);
        if (cart) {
            cart.products = [];
            await cart.save();
            res.status(200).send({respuesta: 'ok', mensaje: cart})
        }
        else 
            res.status(404).send({respuesta: 'Error', mensaje: 'Cart not found'})
    } catch (error){
        console.log('error', error)
        res.status(400).send({respuesta: 'Error', mensaje: error})
    }
}

export const restartCart = async (cartId, products) => {
    try {
        const cart = await cartModel.findById(cartId);
        if (cart) {
            products.forEach(async (product) => {
                const index = cart.products.findIndex(prod => prod.id_prod._id.toString() === product.id.toString());
                if (index !== -1) {
                    cart.products.splice(index, 1);
                }
            });
            await cart.save();
            console.log('cart final', cart)
        }
        else 
            console.log("Cart not found for cleaning");
    } catch (error){
        console.log("Error cleaning cart:", error);
    }
}

export const addOrUpdateProductInCart = async (req, res) => {
    const {cid, pid} = req.params
    const {quantity} = req.body

    try {
        const cart = await cartModel.findById(cid);
        if (cart) {
            const product = await productModel.findById(pid);
            if (product) {
                const index = cart.products.findIndex(prod => prod.id_prod._id.toString() === pid);
                if (index !== -1) {
                    cart.products[index].quantity = quantity;
                } else {
                    cart.products.push({ id_prod: pid, quantity: quantity });
                }
                await cart.save();
                res.status(200).send({respuesta: 'ok', mensaje: cart})
            }
            else 
                res.status(404).send({respuesta: 'Error', mensaje: 'Product not found'})
        }
        else 
            res.status(404).send({respuesta: 'Error', mensaje: 'Cart not found'})
    } catch (error){
        res.status(error.message.includes("not found") ? 404 : 400).send({ respuesta: 'Error', mensaje: error.message });
    }
}

export const removeProductbyId = async (req, res) => {
    const {cid, pid} = req.params
    try {
        const cart = await cartModel.findById(cid);
        if (cart) {
            const product = await productModel.findById(pid);
            if (product) {
                const index = cart.products.findIndex(prod => prod.id_prod._id.toString() === pid);
                if (index !== -1) {
                    cart.products.splice(index, 1);
                    await cart.save();
                    res.status(200).send({respuesta: 'ok', mensaje: cart})
                } else {
                    res.status(404).send({respuesta: 'Error', mensaje: `Product ${pid} not found in the cart ${cid}`})
                }
            }
            else 
                res.status(404).send({respuesta: 'Error', mensaje: 'Product not found'})
        }
        else 
            res.status(404).send({respuesta: 'Error', mensaje: 'Cart not found'})
    } catch (error){
        res.status(400).send({respuesta: 'Error', mensaje: error})
    }
}

/**
 * Actualiza el carrito con los productos especificados en el cuerpo de la solicitud.
 * @param {Object} req - Objeto de solicitud de Express.
 * @param {Object} res - Objeto de respuesta de Express.
 * @returns {Promise<void>} - Promesa que resuelve una respuesta HTTP.
 * @throws {Error} - Si el carrito no se encuentra o si un producto no existe en la base de datos.
 */
export const updateCartWithProducts = async (req, res) => {
    const {cid} = req.params
    const {products} = req.body
    try {
        const cart = await cartModel.findById(cid);
        if (!cart) {
            throw new Error("Cart not found");
        }
        for (let prod of products) {
            // Verifica si el producto ya existe en el carrito
            const index = cart.products.findIndex(cartProduct => cartProduct.id_prod._id.toString() === prod.id_prod);
            if (index !== -1) {
                // Si ya existe, actualizamos la cantidad
                cart.products[index].quantity = prod.quantity;
            } else {
                // Si no existe, primero validamos que el producto exista en la base de datos
                const exists = await productModel.findById(prod.id_prod);
                if (!exists) {
                    throw new Error(`Product with ID ${prod.id_prod} not found`);
                }
                // Añade el producto al carrito
                cart.products.push(prod);
            }
        }
        await cart.save();
        res.status(200).send({ respuesta: 'OK', mensaje: 'Cart updated successfully' });
    } catch (error){
        res.status(400).send({respuesta: 'Error', mensaje: error})
    }
}

//Exportar todas las funciones juntas como cartController   
export const cartController = { 
    getCarts,
    getCart,
    createCart,
    cleanCart,
    addOrUpdateProductInCart,
    removeProductbyId,
    updateCartWithProducts,
    restartCart
}