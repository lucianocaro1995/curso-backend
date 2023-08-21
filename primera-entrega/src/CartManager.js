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
            await fs.writeFile(this.path, JSON.stringify(this.carts, null, 2));
        } catch (error) {
            console.error("Error al guardar los carritos:", error);
        }
    }    
}





class Cart {
    constructor(id) {
        this.id = id;
        this.products = [];
    }

    //Asigno como parámetro un identificador único a cada producto que agregue
    addProduct(productId) {
        //Busco si ya existe un producto con el mismo "productId" en el carrito
        const productIndex = this.products.findIndex(eachProduct => eachProduct.id === productId);

        //Si no existe, findIndex me devuelve -1 y lo agrega al carrito con una cantidad inicial de 1
        //Si el producto no existe en el carrito, se agrega un nuevo objeto al array products del constructor
        if (productIndex === -1) {
            this.products.push({ product: productId, quantity: 1 });
        } else {
            //Si existe, findIndex me devuelve el índice de ese objeto, lo agrega al carrito y modifica la cantidad
            //Quantity: cada vez que se agrega un producto al carrito, se actualiza esta propiedad para mantener un registro de las cantidades
            this.products[productIndex].quantity += 1;
        }
    }
}





export default CartManager;