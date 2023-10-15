//Acá creo métodos que voy a utilizar en "routes"
//Importante a saber: yo acá utilizo algunos métodos ya creados por Mongoose. Puedo ver todos los métodos que crearon en la página web de Mongoose



import { cartModel } from "../models/carts.models.js";
import { productModel } from "../models/products.models.js";

class CartDAO {
    async findAll(limit) {
        return await cartModel.find().limit(limit);
    }

    async findById(id) {
        return await cartModel.findById(id);
    }

    async create() {
        return await cartModel.create({});
    }

    async addProductInCart(cartId, productId, quantity) {

        const cart = await this.findById(cartId); //Busco si existe el carrito en la base de datos
        if (!cart) {
            throw new Error("Cart not found");
        }

        const product = await productModel.findById(productId); //Busco si existe el producto en la base de datos
        if (!product) {
            throw new Error("Product not found");
        }

        const index = cart.products.findIndex(prod => prod.id_prod.toString() === productId); //Busco si ya existe ese producto en el carrito
        if (index !== -1) {
            cart.products[index].quantity = quantity; //Si existe en el carrito modifico la cantidad
        } else {
            cart.products.push({ id_prod: productId, quantity: quantity }); //Si no existe, lo agrego al carrito
        }

        return await cart.save();
    }
}

export const CartManager = new CartDAO();