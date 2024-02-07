import { cartModel } from "../models/carts.models.js";
import { productModel } from "../models/products.models.js";
import { ticketModel } from "../models/ticket.models.js";
import { mailer } from "../config/nodemailer.js"
//Lo necesito para poder usar el id autogenerado por mongo en 5)
import mongoose from 'mongoose';

//1)
const getCarts = async (req, res) => {
    const { limit } = req.query;
    try {
        const carts = await cartModel.find().limit(limit);
        res.status(200).send({ respuesta: "ok", mensaje: carts });
    } catch (error) {
        res.status(400).send({ respuesta: "Error", mensaje: error });
    }
};

//2)
const getCartById = async (req, res) => {
    const { cid } = req.params;
    try {
        // Busca el carrito por su _id
        const cart = await cartModel.findById(cid);
        if (cart) {
            res.status(200).send({ respuesta: "OK", mensaje: cart });
        } else {
            res.status(404).send({ respuesta: "Error en consultar el carrito", mensaje: "Not Found" });
        }
    } catch (error) {
        res.status(400).send({ respuesta: "Error en consultar el carrito", mensaje: error });
    }
};

//3)
const updateCartsProducts = async (req, res) => {
    const { cid } = req.params;
    const productsArray = req.body;
    try {
        const cart = await cartModel.findById(cid);
        if (!cart) {
            return res.status(404).send({ respuesta: "Error", mensaje: "Carrito no encontrado" });
        }
        if (!Array.isArray(productsArray)) {
            return res.status(400).send({ respuesta: "Error", mensaje: "Los productos deben estar en un arreglo" });
        }
        const updatedProducts = [];
        for (const prod of productsArray) {
            const productId = prod.productId;
            const quantity = prod.quantity;
            const product = await productModel.findById(productId);
            if (!product) {
                return res.status(404).send({ respuesta: "Error", mensaje: `Producto con ID ${productId} no encontrado` });
            }
            const existingProductIndex = cart.products.findIndex((cartProduct) => cartProduct._id.toString() === productId);
            if (existingProductIndex !== -1) {
                cart.products[existingProductIndex].quantity = quantity;
            } else {
                cart.products.push({ _id: productId, quantity: quantity });
            }
            updatedProducts.push({ _id: productId, quantity: quantity });
        }
        const updatedCart = await cartModel.findByIdAndUpdate(cid, { products: cart.products }, { new: true });
        res.status(200).send({ respuesta: "OK", mensaje: "Carrito actualizado exitosamente", productosActualizados: updatedProducts, carrito: updatedCart });
    } catch (error) {
        console.error(error);
        res.status(500).send({ respuesta: "Error", mensaje: "Ha ocurrido un error en el servidor" });
    }
};

//4)
const deleteCartProducts = async (req, res) => {
    const { cid } = req.params;

    try {
        const cart = await cartModel.findById(cid);
        if (!cart) {
            return res.status(404).send({ respuesta: "Error al eliminar productos del carrito", mensaje: "Carrito no encontrado" });
        }

        cart.products = [];
        const updatedCart = await cart.save();

        return res.status(200).send({ respuesta: "OK", mensaje: "Productos eliminados del carrito", carrito: updatedCart });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ respuesta: "Error", mensaje: "Ha ocurrido un error en el servidor" });
    }
};

//5)
const deleteCartProduct = async (req, res) => {
    const { cid, pid } = req.params;

    try {
        const cart = await cartModel.findById(cid);
        if (!cart) {
            console.log("Carrito no encontrado:", cid);
            return res.status(404).send({ respuesta: "Carrito no encontrado", mensaje: "Not Found" });
        }

        // Convertir el pid a ObjectId
        const productId = new mongoose.Types.ObjectId(pid);

        // Encuentra el índice del producto en el carrito
        const index = cart.products.findIndex((prod) => prod._id.equals(productId));
        if (index !== -1) {
            // Elimina el producto del carrito
            cart.products.splice(index, 1);
            console.log("Producto eliminado del carrito:", pid);
        } else {
            console.log("Producto no encontrado en carrito:", pid);
            return res.status(404).send({ respuesta: "Producto no encontrado en carrito", mensaje: "Not Found" });
        }

        // Guarda los cambios en el carrito
        await cart.save();
        console.log("Cambios guardados en el carrito:", cid);
        return res.status(200).send({ respuesta: "OK", mensaje: "Producto eliminado del carrito" });
    } catch (error) {
        console.error("Error en deleteCartProduct:", error);
        return res.status(500).send({ respuesta: "Error", mensaje: error.message });
    }
};

//6)
const addProductCart = async (req, res) => {
    const { cid, pid } = req.params;
    let { quantity } = req.body;

    try {
        // Verificar si quantity está definido y es un número válido
        if (quantity === undefined || isNaN(quantity) || quantity <= 0) {
            // Si no se especifica la cantidad o no es válida, establecerla en 1 por defecto
            quantity = 1;
        }

        const updatedCart = await cartModel.findOneAndUpdate(
            { _id: cid, 'products._id': pid }, // Filtrar por el id del carrito y del producto
            { $inc: { 'products.$.quantity': quantity } }, // Incrementar la cantidad del producto
            { new: true } // Devolver el documento actualizado
        );

        if (!updatedCart) {
            // Si no se actualiza ningún documento, significa que el producto no existía en el carrito
            // Agregar el nuevo producto al carrito
            const addedProductCart = await cartModel.findByIdAndUpdate(
                cid,
                { $push: { products: { _id: pid, quantity } } },
                { new: true }
            );

            if (!addedProductCart) {
                return res.status(404).send({ respuesta: "Error al agregar producto al carrito", mensaje: "Carrito no encontrado" });
            }

            res.status(200).send({ respuesta: "OK", mensaje: "Producto agregado al carrito", carrito: addedProductCart });
        } else {
            res.status(200).send({ respuesta: "OK", mensaje: "Cantidad de producto actualizada en el carrito", carrito: updatedCart });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({ respuesta: "Error", mensaje: "Ha ocurrido un error en el servidor" });
    }
};

//7)
const createTicket = async (req, res) => {
    const { cid } = req.params;
    const purchaser = req.user.user.email;
    try {
        //Obtengo el carrito
        const cart = await cartModel.findById(cid);
        //Si no existe el carrito, que me avise
        if (!cart) {
            res.status(404).send({ res: 'Error en finalización de compra', message: `El carrito con el ID ${cid} no existe` });
        }
        let montoTotal = 0;
        const productosConStock = [];
        const productosSinStock = [];
        //Recorro todos los productos del carrito
        for (const cartProduct of cart.products) {
            //Obtengo el id del producto actual
            const product = await productModel.findById(cartProduct._id);
            if (!product) {
                return res.status(404).send({ respuesta: "Error", mensaje: `Producto con ID ${cartProduct._id} no encontrado` });
            }
            //Si hay suficiente stock en la base de datos: actualiza monto y stock, guarda producto, agrega a productos con stock
            //Si no: agrega a productos sin stock
            if (cartProduct.quantity <= product.stock) {
                montoTotal += product.price * cartProduct.quantity;
                product.stock -= cartProduct.quantity;
                cartProduct.quantity = 0;
                await productModel.findByIdAndUpdate(cartProduct._id, product);
                productosConStock.push(cartProduct);
            } else {
                productosSinStock.push(cartProduct);
            }
        }
        //Creo el ticket
        const ticket = await ticketModel.create({ amount: montoTotal, purchaser: purchaser });
        if (ticket) {
            //Actualizo el carrito con los productos que tienen stock
            cart.products = productosConStock;
            const updatedCart = await cartModel.findByIdAndUpdate(cid, { products: cart.products }, { new: true });
            //Envío el correo al usuario
            await mailer.sendPurchaseConfirmation(purchaser, ticket._id);
            if (updatedCart) {
                return res.status(200).send({ message: "exito" });
            }
        }
        console.log("Productos sin stock:", productosSinStock);
        res.status(500).send({ respuesta: "Error", mensaje: "Ha ocurrido un error en el servidor" });
    } catch (error) {
        res.status(400).send({ res: 'Error en finalización del carrito', message: error });
    }
};

//8)
const updateProductQuantity = async (req, res) => {
    const { cid, pid } = req.params;
    const { quantity } = req.body;
    try {
        // Verifica si el carrito existe
        const existingCart = await cartModel.findById(cid);
        if (!existingCart) {
            return res.status(404).send({ error: "Carrito no encontrado" });
        }
        // Busca el producto en la base de datos por su id
        const existingProduct = await productModel.findById(pid);
        if (!existingProduct) {
            return res.status(404).send({ error: "Producto no encontrado" });
        }
        // Verifica si el producto ya está en el carrito
        const existingProductIndex = existingCart.products.findIndex(product => product._id === pid);
        if (existingProductIndex !== -1) {
            // Si el producto ya está en el carrito, actualiza la cantidad
            existingCart.products[existingProductIndex].quantity = quantity;
        } else {
            // Si el producto no está en el carrito, agrégalo con la cantidad proporcionada
            existingCart.products.push({
                _id: pid,
                quantity: quantity
            });
        }
        // Guarda los cambios en el carrito en la base de datos
        const updatedCart = await cartModel.findByIdAndUpdate(cid, { products: existingCart.products }, { new: true });
        return res.status(200).send(updatedCart);
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: "Error al actualizar la cantidad del producto en el carrito", mensaje: "Ha ocurrido un error en el servidor" });
    }
};

//Exportar todas las funciones juntas
export const cartController = {
    getCarts,
    getCartById,
    updateCartsProducts,
    deleteCartProducts,
    deleteCartProduct,
    addProductCart,
    createTicket,
    updateProductQuantity
};