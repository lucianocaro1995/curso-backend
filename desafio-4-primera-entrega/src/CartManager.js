import { promises as fs } from "fs";



//En esta clase detallo el array de carritos. Con esto manejo TODOS los carritos, aunque sólo vamos a utilizar un carrito
class CartManager {
    constructor(filePath) {
        this.path = filePath;
        this.loadCartsFromFile();
    }

    //Este método solamente lo utilizo acá. No en './routes/carts.routes.js'
    //Este método sirve para 3 cosas:
    //Lee el contenido de la ruta especificada (this.path), lo analiza como JSON y almacena el resultado en la ruta especificada (this.carts)
    //Sin esto, utilizo el método para crear un carrito y se crea 1 pero se borran todos los demás
    //Sin esto, no encuentra ningún ID de ningún carrito
    async loadCartsFromFile() {
        try {
            const data = await fs.readFile(this.path, 'utf-8');//Leo el contenido de la ruta
            this.carts = JSON.parse(data);                     //Almaceno en this.carts en formato json
            if (!Array.isArray(this.carts)) {                  //Verifico si this.carts es un array
                this.carts = [];                               //Si no es un array (puede ser un objeto, etc), establezco que sea un array vacío
            }
        } catch (error) {
            this.carts = [];                                   //Ante cualquier error ocurrido, establezco que sea un array vacío
        }
    }

    //1)
    //Método para crear un nuevo carrito. Sólo vamos a usar uno
    async createCart() {
        try {
            //Con esto genero el id autoincrementable
            const cart = new Cart(this.carts.length + 1);
            this.carts.push(cart);
            //Los parámetros null y 2 se utilizan para mejorar la legibilidad del json
            //Utilizando estos parámetros no tengo que clickear "format document" cada vez que actualice el json
            await fs.writeFile(this.path, JSON.stringify(this.carts, null, 2));
            console.log("Carrito creado exitosamente");
            return cart;
        } catch (error) {
            console.log("No se pudo crear un nuevo carrito", error);
            throw new Error("No se pudo crear un nuevo carrito", error);
        }
    }

    //2)
    //Método para agregar un nuevo producto al carrito seleccionado, utilizando su id
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
    //Método para mostrar los productos del carrito seleccionado, utilizando su id
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



//En esta clase detallo la información que tendrá cada carrito
//Cada carrito tendrá un id único y una lista vacía de productos (que el cliente llenará con lo que desee comprar)
class Cart {
    constructor(id) {
        this.id = id;
        this.products = [];
    }

    //Asigno como parámetro un identificador único a cada producto que agregue
    cartContent(productId) {
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