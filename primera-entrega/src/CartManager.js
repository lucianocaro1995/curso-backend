import { promises as fs } from "fs";





//En esta clase detallo la información de los carritos
class CartManager {
    constructor(filePath) {
        this.path = filePath;
        this.nextId = 1;
        this.carts = []
    }

    //1) MAL
    //Método para crear un nuevo carrito. Sólo voy a crear uno
    async createCart() {
        await this.getAllCarts();
        const newCart = new Cart(this.nextId);
        this.carts.push(newCart);
        this.saveToFile();
        return newCart;
    }

    //2) BIEN
    //Método para agregar un nuevo producto al carrito seleccionado, utilizando su id
    async addProductToCart(cartId, productId) {
        const chosenCart = await this.getCartById(cartId);

        // Si el carrito elegido por el id existe, agrégale el producto
        if (chosenCart) {
            // Al carrito, agrégale o asígnale un objeto (el producto)
            const cart = Object.assign(new Cart(), chosenCart);
            // Al carrito, le agrego lo que se detalla en el addProduct de la clase Cart
            cart.addProduct(productId);
            // Guardar en el archivo JSON
            await this.saveToFile();
        } else {
            console.log("Carrito no encontrado");
        }
    }


    //3) BIEN
    //Método para mostrar los productos del carrito seleccionado, utilizando su id
    async getCartById(id) {
        //Primero consigo todos los carritos. Luego busco en el array el carrito con el id que ingresé
        await this.getAllCarts();
        const chosenCart = this.carts.find(cart => Number(cart.id) === Number(id));

        if (chosenCart) {
            return chosenCart;
        } else {
            console.log("No existe un carrito con ese ID");
        }
    }

    // BIEN
    //Estos 2 métodos solamente los utilizo acá. No en './routes/carts.routes.js'
    //Guardo datos de carritos en el json. El tercer parámetro que es el 2, es para mejorar la legibilidad del json
    async saveToFile() {
        try {
            await fs.writeFile(this.path, JSON.stringify(this.carts, null, 2));
        } catch (error) {
            console.error("Error al guardar los carritos:", error);
        }
    }

    // MAL
    //Verifico cuántos carritos tengo en el array, y les asigno a cada uno un id único
    async getAllCarts() {
        try {
            const arrayCarts = await fs.readFile(this.path, 'utf-8');

            //Calcular si la cantidad de carritos es mayor a 0, y asignar un id autoincrementable cada vez que se sume un carrito nuevo al array
            if (arrayCarts.length > 0) {
                this.carts = JSON.parse(arrayCarts);
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
}




//En esta clase detallo la información de los productos (que van dentro del carrito)
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
        //Acá le pusheo solamente el id y quantity por pedido de la consigna
        if (productIndex === -1) {
            this.products.push({ id: productId, quantity: 1 });
        } else {
            //Si existe, findIndex me devuelve el índice de ese objeto, lo agrega al carrito y modifica la cantidad
            //Quantity: cada vez que se agrega un producto al carrito, se actualiza esta propiedad para mantener un registro de las cantidades
            this.products[productIndex].quantity += 1;
        }
    }
}





export default CartManager;