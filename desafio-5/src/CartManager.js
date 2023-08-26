/*
ACLARACIÓN IMPORTANTE:
En este desafío, en el ProductManager.js realizo todo lo necesario en los métodos de la clase ProductManager
Mientras que en CartManager.js creo métodos en la clase Cart y luego los utilizo en la clase CartManager
Logro esto llamando a una nueva instancia de Cart en los métodos de CartManager
Hice los dos archivos de diferente forma para practicar y ver las diferencias
*/
import { promises as fs } from "fs";



//En este desafío me deshago del método loadCartsFromFile que leía el json, y creo un id autoincrementable más eficiente
//Agrego líneas de código en cada método para leer el contenido existente del json
class CartManager {
    constructor() {
        this.path = './src/carts.json';
    }

    //1)
    async createCart() {
        try {
            const readJson = await fs.readFile(this.path, 'utf-8');
            let arrayForCarts = [];
            try {
                arrayForCarts = JSON.parse(readJson);
                if (!Array.isArray(arrayForCarts)) {
                    arrayForCarts = [];
                }
            } catch (parseError) {
                console.log("El JSON no contiene un array, se creará uno");
            }
            
            //Creo una nueva instancia de la clase Cart para poder usar el método generateId en esta clase
            const findId = Cart.generateId(arrayForCarts);
            const newCart = new Cart(findId);
            arrayForCarts.push(newCart);
            
            await fs.writeFile(this.path, JSON.stringify(arrayForCarts, null, 4));
            console.log("Carrito creado exitosamente");
            return newCart;
        } catch (error) {
            console.log("No se pudo crear un nuevo carrito", error);
            throw new Error("No se pudo crear un nuevo carrito", error);
        }
    }

    //2)
    async addProductToCart(cid, pid) {
        const readJson = await fs.readFile(this.path, 'utf-8');
        const arrayForCarts = JSON.parse(readJson);
        const chosenCartIndex = arrayForCarts.findIndex(cart => cart.id === cid);

        if (chosenCartIndex !== -1) {
            //Creo una nueva instancia de la clase Cart para poder usar el método incrementQuantity en esta clase
            const chosenCart = new Cart(arrayForCarts[chosenCartIndex].id);
            //Copio los productos existentes al nuevo carrito y utilizo el método incrementQuantity
            chosenCart.products = [...arrayForCarts[chosenCartIndex].products];
            chosenCart.incrementQuantity(pid);
            //Actualizo el carrito en el array y guardo en el archivo json
            arrayForCarts[chosenCartIndex] = chosenCart;
            await fs.writeFile(this.path, JSON.stringify(arrayForCarts, null, 4));
            console.log("Producto agregado al carrito");
        } else {
            console.log("No existe un carrito con ese ID");
            throw new Error("No existe un carrito con ese ID");
        }
    }

    //3)
    async getCartById(id) {
        const readJson = await fs.readFile(this.path, 'utf-8');
        const arrayForCarts = JSON.parse(readJson);
        const chosenCart = arrayForCarts.find(eachCart => Number(eachCart.id) === Number(id));

        if (chosenCart) {
            console.log("Mostrando los productos dentro del carrito con id:" + id, chosenCart);
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

    //En caso de que el último ID sea nulo, undefined, o no exista el campo ID, se asigna al nuevo carrito el siguiente valor numérico
    //En caso de que haya un carrito con id:2, la próxima vez que ejecute createCart se creará un carrito con id:1, y luego id:3
    static generateId(allCarts) {
        let newId = 1;
        //Creo un conjunto de IDs existentes para comparar y evitar duplicados al manejar los carritos
        //Set es palabra reservada de Javascript
        const existingIds = new Set(allCarts.map(cart => cart.id));

        while (existingIds.has(newId)) {
            newId++;
        }
        return newId;
    }

    //Incremento la cantidad en caso de que haya más de un producto con el mismo ID en el carrito
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