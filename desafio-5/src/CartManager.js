import { promises as fs } from "fs";



//En este desafío me deshago del método loadCartsFromFile que leía el json, y creo un id autoincrementable más eficiente
//Agrego líneas de código en cada método para leer el contenido existente del json
class CartManager {
    constructor() {
        this.path = './src/carts.json';
    }

    //1)
    async createCart(length) {
        try {
            //Leo el contenido actual del json
            const existingData = await fs.readFile(this.path, 'utf-8');
            //Creo un array en json
            let existingCarts = [];
            try {
                existingCarts = JSON.parse(existingData);
            } catch (parseError) {
                console.log("El contenido existente no es un JSON válido. Se creará un nuevo array.");
            }
            //Verifico si existe el array de carritos en el JSON, si no existe lo creo
            if (!Array.isArray(existingCarts)) {
                existingCarts = [];
            }
            //Creo un conjunto de IDs existentes para comparar y evitar duplicados al manejar los carritos
            const existingIds = new Set(existingCarts.map(cart => cart.id));
            //Genero un id autoincrementable
            let newId = 1;
            while (existingIds.has(newId)) {
                newId++;
            }
            //Creo una instancia de la clase Cart utilizando el nuevo ID y el valor length proporcionado como parámetro
            const cart = new Cart(newId, length);
            existingCarts.push(cart);
            //Escribo los carritos actualizados en el archivo JSON
            await fs.writeFile(this.path, JSON.stringify(existingCarts, null, 2));
            console.log("Carrito creado exitosamente");
            return cart;
        } catch (error) {
            console.log("No se pudo crear un nuevo carrito", error);
            throw new Error("No se pudo crear un nuevo carrito", error);
        }
    }
    
    //2)
    async addProductToCart(cid, pid) {
        const existingData = await fs.readFile(this.path, 'utf-8');
        const existingCarts = JSON.parse(existingData);
        const chosenCartIndex = existingCarts.findIndex(cart => cart.id === cid);
        //Comprueba si el producto con el ID dado ya existe en el carrito elegido
        if (chosenCartIndex !== -1) {
            const chosenCart = existingCarts[chosenCartIndex];
            const prodIndex = chosenCart.products.findIndex(prod => prod.id === pid);
            //Si no existe, agrega el producto al carrito y guarda los cambios en el json
            if (prodIndex === -1) {
                chosenCart.products.push({ id: pid, quantity: 1 });
                existingCarts[chosenCartIndex] = chosenCart;
                await fs.writeFile(this.path, JSON.stringify(existingCarts, null, 2));
                console.log("Producto agregado al carrito");
            } else {
                console.log("El producto con el id:" + pid + " ya existe en el carrito");
                throw new Error("El producto con el id:" + pid + " ya existe en el carrito");
            }
        } else {
            console.log("No existe un carrito con ese ID");
            throw new Error("No existe un carrito con ese ID");
        }
    }

    //3)
    async getCartById(id) {
        const existingData = await fs.readFile(this.path, 'utf-8');
        const existingCarts = JSON.parse(existingData);

        const chosenCart = existingCarts.find(cart => Number(cart.id) === Number(id));

        if (chosenCart) {
            console.log("Mostrando los productos dentro del carrito con id:" + id , chosenCart );
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