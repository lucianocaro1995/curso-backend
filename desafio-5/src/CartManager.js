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
            //Leo el contenido actual del json
            const existingData = await fs.readFile(this.path, 'utf-8');
            //Creo un array vacío en json
            let arrayForCarts = [];
            try {
                arrayForCarts = JSON.parse(existingData);
                //Verifico si ya existe un array en el JSON, si no existe lo creo
                if (!Array.isArray(arrayForCarts)) {
                    arrayForCarts = [];
                }
            } catch (parseError) {
                console.log("El JSON no contiene un array, se creará uno");
            }
            //Creo un conjunto de IDs existentes para comparar y evitar duplicados al manejar los carritos
            //Set es palabra reservada de Javascript
            const existingIds = new Set(arrayForCarts.map(cart => cart.id));
            //Genero un id autoincrementable
            let newId = 1;
            while (existingIds.has(newId)) {
                newId++;
            }
            //Creo una instancia de la clase Cart utilizando el nuevo ID proporcionado como parámetro
            const cart = new Cart(newId);
            arrayForCarts.push(cart);
            //Escribo los carritos actualizados en el archivo JSON
            await fs.writeFile(this.path, JSON.stringify(arrayForCarts, null, 4));
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
        const arrayForCarts = JSON.parse(existingData);
        const chosenCartIndex = arrayForCarts.findIndex(cart => cart.id === cid);
        //Busco el carrito elegido
        if (chosenCartIndex !== -1) {
            const chosenCart = arrayForCarts[chosenCartIndex];
            const prodIndex = chosenCart.products.findIndex(prod => prod.id === pid);
            //Si el producto ya existe, incremento la cantidad
            if (prodIndex !== -1) {
                chosenCart.products[prodIndex].quantity++;
            } else {
                //Si no existe, agrego el producto al carrito
                chosenCart.products.push({ id: pid, quantity: 1 });
            }
            //Actualizo el carrito en el array y guardo en el archivo json
            arrayForCarts[chosenCartIndex] = chosenCart;
            await fs.writeFile(this.path, JSON.stringify(arrayForCarts, null, 4));
            console.log("Producto agregado al carrito");
        } else {
            console.log("No existe un carrito con ese ID");
            throw new Error("No existe un carrito con ese ID");
        }
    }

    // En esta otra forma de hacerlo, creo una nueva instancia de Cart para utilizar el método cartContent acá
    // async addProductToCart(cid, pid) {
    //     try {
    //         const existingData = await fs.readFile(this.path, 'utf-8');
    //         const arrayForCarts = JSON.parse(existingData);
    //         const chosenCartIndex = arrayForCarts.findIndex(cart => cart.id === cid);
    
    //         if (chosenCartIndex !== -1) {
    //             //Agarro el carrito elegido dentro del array de carritos
    //             const chosenCart = arrayForCarts[chosenCartIndex];
    //             //Creo una instancia de la clase Cart para poder utilizar el método cartContent
    //             const cartInstance = new Cart(chosenCart.id);
    //             //Copio los productos existentes del carrito dentro de la nueva instancia
    //             cartInstance.products = chosenCart.products.slice();
    //             //Utilizo el método cartContent
    //             cartInstance.cartContent(pid);
    //             //Actualizo la variable cartInstance en el array
    //             arrayForCarts[chosenCartIndex] = cartInstance;
    //             await fs.writeFile(this.path, JSON.stringify(arrayForCarts, null, 4));
    //             console.log("Producto agregado al carrito");
    //         } else {
    //             console.log("No existe un carrito con ese ID");
    //             throw new Error("No existe un carrito con ese ID");
    //         }
    //     } catch (error) {
    //         console.error("Error al agregar producto al carrito:", error);
    //         throw error;
    //     }
    // }

    //3)
    async getCartById(id) {
        const existingData = await fs.readFile(this.path, 'utf-8');
        const arrayForCarts = JSON.parse(existingData);

        const chosenCart = arrayForCarts.find(cart => Number(cart.id) === Number(id));

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

    //Puedo pushear un producto con su id y cantidad desde acá
    //Y luego crear una nueva instancia de Cart(new Cart) en los métodos de cartManager para utilizar este método cartContent
    //O simplemente puedo borrar esto y pushear(con los atributos id y quantity) en los métodos de cartManager
    // cartContent(productId) {
    //     const productIndex = this.products.findIndex(eachProduct => eachProduct.id === productId);

    //     if (productIndex === -1) {
    //         this.products.push({ id: productId, quantity: 1 });
    //     } else {
    //         this.products[productIndex].quantity += 1;
    //     }
    // }
}



export default CartManager;