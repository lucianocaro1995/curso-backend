import { promises as fs } from "fs";



class CartManager {
    constructor() {
        this.path = './carts.json';
    }

    //1)
    async createCart() {
        try {
            const readJson = await fs.readFile(this.path, 'utf-8');
            let arrayForCarts = JSON.parse(readJson);
            
            const findNextId = Cart.generateId(arrayForCarts);
            const newCart = new Cart(findNextId);
            arrayForCarts.push(newCart);
            
            await fs.writeFile(this.path, JSON.stringify(arrayForCarts, null, 4));
            console.log("Carrito creado exitosamente");
            return newCart;
        } catch (error) {
            console.log("No se pudo crear un nuevo carrito");
            return false;
        }
    }

    //2)
    async addProductToCart(cid, pid) {
        const readJson = await fs.readFile(this.path, 'utf-8');
        const arrayForCarts = JSON.parse(readJson);
        const chosenCartIndex = arrayForCarts.findIndex(cart => cart.id === cid);

        if (chosenCartIndex !== -1) {
            const chosenCart = new Cart(arrayForCarts[chosenCartIndex].id);
            chosenCart.products = [...arrayForCarts[chosenCartIndex].products];
            chosenCart.incrementQuantity(pid);
            arrayForCarts[chosenCartIndex] = chosenCart;

            await fs.writeFile(this.path, JSON.stringify(arrayForCarts, null, 4));
            console.log("Producto agregado al carrito");
            return true;
        } else {
            console.log("No existe un carrito con ese ID");
            return false;
        }
    }

    //3)
    async getCartById(id) {
        const readJson = await fs.readFile(this.path, 'utf-8');
        const arrayForCarts = JSON.parse(readJson);
        const chosenCart = arrayForCarts.find(cart => cart.id === id);

        if (chosenCart) {
            console.log("Mostrando los productos dentro del carrito con id:" + id, chosenCart);
            return chosenCart;
        } else {
            console.log("No existe un carrito con ese ID");
            return false;
        }
    }
}



class Cart {
    constructor(id, products = []) {
        this.id = id;
        this.products = products;
    }

    static generateId(allCarts) {
        let newId = 1;
        const existingIds = new Set(allCarts.map(cart => cart.id));

        while (existingIds.has(newId)) {
            newId++;
        }
        return newId;
    }

    incrementQuantity(productId) {
        const productIndex = this.products.findIndex(eachProduct => eachProduct.id === productId);

        if (productIndex === -1) {
            this.products.push({ id: productId, quantity: 1 });
        } else {
            this.products[productIndex].quantity += 1;
        }
    }
}



export default CartManager;