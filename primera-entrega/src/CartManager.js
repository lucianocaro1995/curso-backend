import { promises as fs } from "fs";





class CartManager {
    constructor(filePath) {
        this.path = filePath;
        this.nextId = 1;
        this.carts = []
    }

    //Estos 2 métodos solamente los utilizo acá. No en './routes/carts.routes.js'
    //Guardo datos de carritos en el json. El tercer parámetro que es el 2, es para mejorar la legibilidad del json
    saveToFile = async() => {
        try {
            await fs.writeFile(this.path, JSON.stringify(this.carts, null, 2));
        } catch (error) {
            console.error("Error al guardar los carritos:", error);
        }
    }

    //Consigo todas las cartas
    getAllCarts = async() => {
        try {
            const data = await fs.readFile(this.path, 'utf-8');
            if (data.length > 0) {
                this.carts = JSON.parse(data);
                const maxIdCart = this.carts.reduce((prev, curr) => (prev.id > curr.id) ? prev : curr);
                this.nextId = maxIdCart.id + 1;
            }
            return this.carts;
        } catch (error) {
            if (error.code === 'ENOENT') {
                console.log("Archivo de carritos no encontrado. Se creará uno nuevo.");
                return [];
            } else {
                console.error("Error al leer el archivo de carritos:", error);
            }
        }
    }

    //1)
    //Método para crear un nuevo carrito. Sólo voy a crear uno
    createCart = async() => {
        await this.getAllCarts();
        const newCart = new Cart(this.nextId);
        this.carts.push(newCart);
        this.saveToFile();
        return newCart;
    }

    //2)
    //Método para mostrar los productos del carrito seleccionado, utilizando su id
    addProductToCart = async(cartId, productId) => {
        const cartData = await this.getCartById(cartId);
        if(!cartData) {
            throw new Error('Carrito no encontrado');
        } else {
        const cart = Object.assign(new Cart(), cartData);
        cart.addProduct(productId);
        await this.saveToFile();
        }
    }

    //3)
    //Método para agregar un nuevo producto al carrito seleccionado, utilizando su id
    getCartById = async(id) => {
        await this.getAllCarts();
        const cart = this.carts.find(cart => Number(cart.id) === Number(id));
        if (cart) {
            return cart;
        } else {
            console.log('Carrito no encontrado');
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