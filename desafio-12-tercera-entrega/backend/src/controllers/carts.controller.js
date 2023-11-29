import { cartModel } from "../models/carts.models.js";
import { productModel } from "../models/products.models.js";
import { ticketModel } from "../models/ticket.models.js";

//1)
const getCarrito = async (req, res) => {
    const { limit } = req.query;
    try {
        const carts = await cartModel.find().limit(limit);
        res.status(200).send({ respuesta: "ok", mensaje: carts });
    } catch (error) {
        res.status(400).send({ respuesta: "Error", mensaje: error });
    }
};

//2)
const getCarritoById = async (req, res) => {
    const { id } = req.params;
    try {
        const cart = await cartModel.findById(id);
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
const postCarrito = async (req, res) => {
    try {
        const cart = await cartModel.create({});
        res.status(200).send({ respuesta: "OK", mensaje: cart });
    } catch (error) {
        res.status(400).send({ respuesta: "Error en crear el carrito", mensaje: error });
    }
};

//4)
const postCarritoByProductId = async (req, res) => {
    const { cid, pid } = req.params;
    const { quantity } = req.body;

    try {
        const cart = await cartModel.findById(cid);
        if (!cart) {
            res.status(404).json({ respuesta: "Error al agregar producto al carrito", mensaje: "Carrito no encontrado" });
        }

        const product = await productModel.findById(pid);
        if (!product) {
            res.status(404).send({ respuesta: "Error al agregar producto al carrito", mensaje: "Producto no encontrado" });
        }

        const indice = cart.products.findIndex((prod) => prod.id_prod === pid);
        if (indice !== -1) {
            cart.products[indice].quantity = quantity;
        } else {
            cart.products.push({ id_prod: pid, quantity: quantity });
        }

        const response = await cartModel.findByIdAndUpdate(cid, cart);
        res.status(200).send({ respuesta: "OK", mensaje: "Producto agregado al carrito", carrito: response });
    } catch (error) {
        console.error(error);
        res.status(500).send({ respuesta: "Error", mensaje: "Ha ocurrido un error en el servidor" });
    }
};

//5)
const deleteById = async (req, res) => {
    const { id } = req.params;

    try {
        const cart = await cartModel.findById(id);
        if (!cart) {
            res.status(404).send({ respuesta: "Error al agregar producto al carrito", mensaje: "Carrito no encontrado" });
        }

        cart.products = [];
        await cart.save();
        res.status(200).send({ respuesta: "OK", mensaje: "Productos eliminados del carrito", carrito: cart });
    } catch (error) {
        res.status(500).send({ respuesta: "Error", mensaje: "Ha ocurrido un error en el servidor" });
    }
};

//6)
const putCarritoByProductId = async (reque, res) => {
    try {
        const { cid, pid } = req.params;
        const { quantity } = req.body;
        const cart = await cartModel.findById(cid);

        if (!cart) {
            res.status(404).send({ respuesta: "Carrito no encontrado", mensaje: "Not Found" });
        }

        const product = await productModel.findById(pid);
        if (!product) {
            res.status(404).send({ respuesta: "Producto no encontrado", mensaje: "Not Found" });
        }

        const indice = cart.products.findIndex((prod) => prod.id_prod._id.toString() === pid);
        if (indice !== -1) {
            cart.products[indice].quantity = quantity;
        } else {
            cart.products.push({ id_prod: pid, quantity: quantity });
        }

        await cart.save();
        res.status(200).send({ respuesta: "OK", mensaje: "Carrito actualizado", carrito: cart });
    } catch (error) {
        console.error(error);
        res.status(500).send({ respuesta: "Error", mensaje: "Ha ocurrido un error en el servidor" });
    }
};

//7)
const deleteProductById = async (req, res) => {
    const { cid, pid } = req.params;

    try {
        const cart = await this.findById(cid);
        if (!cart) {
            res.status(404).send({ respuesta: "Carrito no encontrado", mensaje: "Not Found" });
        }

        const product = await productModel.findById(pid);
        if (!product) {
            res.status(404).send({ respuesta: "Producto no encontrado", mensaje: "Not Found" });
        }

        const index = cart.products.findIndex((prod) => prod.id_prod._id.toString() === pid);
        if (index !== -1) {
            cart.products.splice(index, 1);
        } else {
            res.status(404).send({ respuesta: "Producto no encontrado en carrito", mensaje: "Not Found" });
        }

        await cart.save();
        res.status(200).send({ respuesta: "OK", mensaje: "Product removed" });
    } catch (error) {
        res.status(error.message.includes("not found") ? 404 : 400).send({ respuesta: "Error", mensaje: error.message });
    }
};

//8)
const putCarrito = async (req, res) => {
    const { cid } = req.params;
    const productsArray = req.body.products;

    try {
        const cart = await cartModel.findById(cid);
        if (!cart) {
            return res.status(404).json({ respuesta: "Error", mensaje: "Carrito no encontrado" });
        }

        if (!Array.isArray(productsArray)) {
            return res.status(400).json({ respuesta: "Error", mensaje: "Los productos deben estar en un arreglo" });
        }

        const updatedProducts = [];

        for (let prod of productsArray) {
            const product = await productModel.findById(prod.id_prod);

            if (!product) {
                return res.status(404).json({ respuesta: "Error", mensaje: `Producto con ID ${prod.id_prod} no encontrado` });
            }

            const existingProductIndex = cart.products.findIndex((cartProduct) => cartProduct.id_prod.toString() === prod.id_prod);
            if (existingProductIndex !== -1) {
                cart.products[existingProductIndex].quantity = prod.quantity;
            } else {
                cart.products.push({ id_prod: prod.id_prod, quantity: prod.quantity });
            }

            updatedProducts.push({ id_prod: prod.id_prod, quantity: prod.quantity });
        }

        await cart.save();
        return res.status(200).json({ respuesta: "OK", mensaje: "Carrito actualizado exitosamente", productosActualizados: updatedProducts });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ respuesta: "Error", mensaje: "Ha ocurrido un error en el servidor" });
    }
};

//9)
const postCompra = async (req, res) => {
    const cartId = req.params.cid;

    try {
        const cart = await cartModel.findById(cartId).populate("items.product");
        if (!cart) {
            return res.status(404).json({ message: "Carrito no encontrado" });
        }

        const productsNotProcessed = []; //Acá se almacenan los productos que no se pudieron procesar

        for (const item of cart.items) {
            const product = item.product;
            const requestedQuantity = item.quantity;

            if (product.stock >= requestedQuantity) {
                //El producto tiene suficiente stock, restarlo
                product.stock -= requestedQuantity;
                await product.save();
            } else {
                //Si el producto no tiene suficiente stock se almacenan en los no procesados
                productsNotProcessed.push(product._id);
            }
        }

        //Se actualiza el carrito con los productos no procesados
        cart.items = cart.items.filter((cartItem) => !productsNotProcessed.includes(cartItem.product._id));
        await cart.save();

        //Se crea un ticket con los datos de la compra
        const ticket = new ticketModel({
            amount: cart.total, //Supongo que el carrito tiene un campo total
            purchaser: cart.userEmail, //O donde se almacena el correo del usuario
        });
        await ticket.save();

        return res.status(200).json({ mensaje: "Compra finalizada exitosamente", productsNotProcessed: productsNotProcessed });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error al procesar la compra" });
    }
};

//Exportar todas las funciones juntas
export const cartController = {
    getCarrito,
    getCarritoById,
    postCarrito,
    postCarritoByProductId,
    deleteById,
    putCarritoByProductId,
    deleteProductById,
    putCarrito,
    postCompra
};