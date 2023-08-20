import { promises as fs } from "fs";





class CartManager {
    constructor(filePath) {
        this.path = filePath;
        this.carts = [];
    }

    //1)
    //Método para crear un nuevo carrito. Sólo voy a crear uno
    async createCart() {
        const newId = await this.generateUniqueId();
        const cart = new Cart(newId);
        this.carts.push(cart);
        await this.saveCartsToFile();
        return cart.id;
    }

    //2)
    //Método para agregar un nuevo producto al carrito seleccionado, utilizando su id
    async addProductToCart(cartId, productId) {
        const oneCart = this.carts.find(oneCart => oneCart.id === cartId);

        if (oneCart) {
            oneCart.addProduct(productId);
            await this.saveCartsToFile();
            return true;
        } else {
            return false;
        }
    }

    //3)
    //Método para mostrar los productos del carrito seleccionado, utilizando su id
    async getCartById(cartId) {
        const oneCart = this.carts.find(oneCart => oneCart.id === cartId);

        if (oneCart) {
            return oneCart;
        } else {
            return null;
        }
    }

    //Estos 2 métodos solamente los utilizo acá. No en './routes/carts.routes.js'
    //Genero un id único
    async generateUniqueId() {
        const usedIds = this.carts.map(cart => cart.id);
        let newId = 1;
        while (usedIds.includes(newId)) {
            newId++;
        }
        return newId;
    }

    //Guardo datos de carritos en el json. El tercer parámetro que es el 2, es para mejorar la legibilidad del json
    async saveCartsToFile() {
        try {
            const cartData = JSON.stringify(this.carts, null, 2);
            await fs.promises.writeFile(this.path, cartData);
        } catch (error) {
            console.error("Error guardando datos de carritos en el json:", error);
        }
    }    
}





class Cart {
    constructor(id) {
        this.id = id;
        this.products = [];
    }

    addProduct(productId) {
        const productIndex = this.products.findIndex(p => p.product === productId);

        if (productIndex === -1) {
            this.products.push({ product: productId, quantity: 1 });
        } else {
            this.products[productIndex].quantity += 1;
        }
    }
}





export default CartManager;