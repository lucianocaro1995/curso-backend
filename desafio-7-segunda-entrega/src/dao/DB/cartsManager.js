//Acá creo métodos que voy a utilizar en "routes"



import { cartModel } from "../models/carts.models.js";
import { productModel } from "../models/products.models.js";

class CartDAO {
    //1)
    async findAll(limit) {
        return await cartModel.find().limit(limit);
    }

    //2)
    async findById(id) {
        return await cartModel.findById(id);
    }

    //3)
    async create() {
        return await cartModel.create({});
    }

    //4)
    async cleanCart(id) {
        const cart = await this.findById(id);
        if (!cart) {
            throw new Error("Cart not found");
        }

        cart.products = [];
        return await cart.save();
    }

    //5)
    async addOrUpdateProductInCart(cartId, productId, quantity) {
        const cart = await this.findById(cartId); //Busco si existe el carrito en la base de datos
        if (!cart) {
            throw new Error("Cart not found");
        }

        const product = await productModel.findById(productId); //Busco si existe el producto en la base de datos
        if (!product) {
            throw new Error("Product not found");
        }

        const index = cart.products.findIndex(prod => prod.id_prod._id.toString() === productId); //Busco si ya existe ese producto en el carrito
        if (index !== -1) {
            cart.products[index].quantity = quantity; //Si existe en el carrito modifico la cantidad
        } else {
            cart.products.push({ id_prod: productId, quantity: quantity }); //Si no existe, lo agrego al carrito
        }

        return await cart.save();
    }

    //6)
    async removeProductbyId(cartId, productId) {
        const cart = await this.findById(cartId);
        if (!cart) {
            throw new Error("Cart not found");
        }

        const product = await productModel.findById(productId);
        if (!product) {
            throw new Error("Product not found");
        }

        const index = cart.products.findIndex(prod => prod.id_prod._id.toString() === productId);
        if (index !== -1) {
            cart.products.splice(index, 1);

        } else {
            throw new Error("Product not found in the cart");
        }

        return await cart.save();
    }

    //7)
    async updateCartWithProducts(cartId, productsArray) {
        console.log("Updating cart with products:", productsArray);
        const cart = await this.findById(cartId);
        if (!cart) {
            throw new Error("Cart not found");
        }

        //Para cada producto en el array de entrada
        for (let prod of productsArray) {
            //Verifica si el producto ya existe en el carrito
            const index = cart.products.findIndex(cartProduct => cartProduct.id_prod.toString() === prod.id_prod);

            if (index !== -1) {
                //Si ya existe, actualizamos la cantidad
                cart.products[index].quantity = prod.quantity;
            } else {
                //Si no existe, primero validamos que el producto exista en la base de datos
                const exists = await productModel.findById(prod.id_prod);
                if (!exists) {
                    throw new Error(`Product with ID ${prod.id_prod} not found`);
                }
                //Añade el producto al carrito
                cart.products.push(prod);
            }
        }
        return await cart.save();
    }
}



export const CartManager = new CartDAO();