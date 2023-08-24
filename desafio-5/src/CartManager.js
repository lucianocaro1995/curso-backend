import { promises as fs } from "fs";



class CartManager {
    constructor() {
        this.path = './src/carts.json';
        this.loadCartsFromFile();
    }

    async loadCartsFromFile() {
        try {
            const data = await fs.readFile(this.path, 'utf-8');
            this.carts = JSON.parse(data);                     
            if (!Array.isArray(this.carts)) {                  
                this.carts = [];                               
            }
        } catch (error) {
            this.carts = [];                                   
        }
    }

    //1)
    async createCart() {
        try {
            const cart = new Cart(this.carts.length + 1);
            this.carts.push(cart);
            await fs.writeFile(this.path, JSON.stringify(this.carts, null, 2));
            console.log("Carrito creado exitosamente");
            return cart;
        } catch (error) {
            console.log("No se pudo crear un nuevo carrito:", error);
            throw new Error("No se pudo crear un nuevo carrito", error);
        }
    }

    //2)
    async addProductToCart(cid, pid) {
        const chosenCart = await this.getCartById(cid);
        const prodIndex = chosenCart.products.findIndex(prod => prod.id === pid);

        if (prodIndex == -1) {
            chosenCart.products.push({ id: pid, quantity: 1 });
            await fs.writeFile(this.path, JSON.stringify(this.carts, null, 2));
            console.log("Producto agregado al carrito");
        } else {
            console.log("No existe un carrito con ese ID");
            throw new Error("No existe un carrito con ese ID");
        }
    }

    //3)
    async getCartById(id) {
        const chosenCart = this.carts.find(cart => Number(cart.id) === Number(id));

        if (chosenCart) {
            return chosenCart;
        } else {
            console.log("No existe un carrito con ese ID");
            throw new Error("No existe un carrito con ese ID");
        }
    }
}



class Cart {
    constructor(id) {
        this.id = id;
        this.products = [];
    }

    cartContent(productId) {
        const productIndex = this.products.findIndex(eachProduct => eachProduct.id === productId);

        if (productIndex === -1) {
            this.products.push({ id: productId, quantity: 1 });
        } else {
            this.products[productIndex].quantity += 1;
        }
    }
}



export default CartManager;