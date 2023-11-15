import { OrderModel } from '../models/orders.models.js';
import { cartController } from './cart.controller.js';
import { sendOrderConfirmationEmail } from '../config/mailer.js';
import { productModel } from '../models/products.models.js';

//Generar un código unico de 6 digitos que se usará como código de orden en el parametro "code" de la orden
const generateUniqueCode = async () => {
    while (true) {
        console.log('Generating unique code...');
        const code = Math.floor(100000 + Math.random() * 900000).toString(); // Genera un código de 6 dígitos
        console.log('Generated code: ', code);
        const existingOrder = await OrderModel.findOne({ orderCode: code });
        if (!existingOrder) {
            return code;
        }
    }
};

// Crear una función para verificar y reducir el stock de cada producto
const verifyAndReduceStock = async (products) => {
    let verifiedProducts = [];

    for (let product of products) {
        const productInDb = await productModel.findById(product.id);
        if (product.quantity <= productInDb.stock) {
            productInDb.stock -= product.quantity;
            await productInDb.save();
            verifiedProducts.push(product);
        }
    }

    return verifiedProducts;
};

// Crear una orden nueva
/**
 * Creates a new order with the given cartId, products, and totalAmount.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} The saved order.
 */
const createOrder = async (req, res) => {
    const {cartId} = req.params;
    try {
        const orderCode = await generateUniqueCode();
        console.log('req.body', req.body)
        let products = req.body.products;
        products = await verifyAndReduceStock(products);
        const totalAmount = req.body.totalAmount;
        console.log('products', products)
        console.log('totalAmount', totalAmount)
        const newOrder = new OrderModel({...req.body, orderCode, products});
        const savedOrder = await newOrder.save();
        if (savedOrder) {
            try {
                await cartController.restartCart(cartId, products);
                await sendOrderConfirmationEmail(orderCode, products, totalAmount);
            } catch (error) {
                console.log(error);
            }
        }
        res.status(201).json({ payload: savedOrder });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Consultar una orden especifica en base al id
const getOrderById = async (req, res) => {
    try {
        const order = await OrderModel.findById(req.params.id);
        if (!order) {
        return res.status(404).json({ message: 'Order not found' });
        }
        res.json({ payload: order });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Consultar todas las ordenes en base al id de user
const getAllOrdersByUserId = async (req, res) => {
    try {
        const orders = await OrderModel.find({ userId: req.params.userId });
        res.json({ payload: orders });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Modificar el campo Status de una orden especifica en base al id
const updateOrderStatusById = async (req, res) => {
    try {
        const updatedOrder = await OrderModel.findByIdAndUpdate(
        req.params.id,
        { status: req.body.status },
        { new: true }
        );
        if (!updatedOrder) {
        return res.status(404).json({ message: 'Order not found' });
        }
        res.json({ payload: updatedOrder });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const orderController = {
    createOrder,
    getOrderById,
    getAllOrdersByUserId,
    updateOrderStatusById,
};