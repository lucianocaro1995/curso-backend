//La clase ProductManager va a gestionar una cantidad de productos
class ProductManager {
    constructor() {
        //En este desafío sí necesito crear un array vacío
        //En el desafío 2 no porque trabajamos con variables que consultan los productos que tenemos en el JSON
        this.products = []
    }

    //1) Método para agregar un producto
    async addProduct(product) {
        //Validar campos obligatorios
        if (
            !product.title ||
            !product.description ||
            !product.price ||
            !product.code ||
            !product.stock ||
            !product.thumbnail
        ) {
            console.log("Todos los campos son obligatorios");
            return;
        }

        //El método find te devuelve el objeto si existe, y undefined si no existe
        //Buscame en mi array si existe un objeto cuyo "id" sea igual al ingresado
        const prodId = this.products.find(prod => prod.id === product.id);
        //Buscame en mi array si existe un objeto cuyo "code" sea igual al ingresado
        const prodCode = this.products.find(prod => prod.code === product.code);
        
        //Si el id o el código ya existe, decímelo en la terminal, sino agrega el producto
        if (prodId || prodCode) {
            console.log("Ya existe un producto con este id/código");
        } else {
            //Si no existe lo pusheo a ese array
            this.products.push(product);
        }
    }

    //2) Método para consultar por todos los productos
    getProducts() {
        console.log(this.products)
    }

    //3) Método para saber si existe un producto en particular. Recibo un id como parámetro
    getProductById(id) {
        const prod = this.products.find(prod => prod.id === id)

        if (prod) {
            console.log(prod);
        } else {
            console.log("Producto no encontrado");
        }
    }
}

//Podemos crear una clase "Product" para hacer más simple la creación de productos (ya que todos los productos comparten las mismas propiedades)
class Product {
    constructor(title, description, price, code, stock, thumbnail) {
        this.title = title
        this.description = description
        this.price = price
        this.code = code
        this.stock = stock
        this.thumbnail = thumbnail
        this.id = Product.incrementarId() //Mi ID es el resultado de lo que devuelva este método
    }

    /*
    Método static es un método de la clase. Si es método de la clase no lo pueden ejecutar los objetos, lo ejecuta la clase. Por eso lo llamo aquí
    No incremento el id en la clase "ProductManager" porque si haría eso, le estaría enviando productos que no tienen id
    Los productos no conocen los atributos de los otros productos aunque sean de la misma clase, por eso el id autoincrementable lo hacemos con la clase "Product" y no con un método para agregar id
    La clase "Product" debe generar el id autoincrementable, con el id que ya conoce de los productos creados
    El id autoincrementable lo puedo generar con ++ pero también hay otras formas de lograrlo
    */
    static incrementarId() {
        //Si el contador de id existe, la aumento en 1. Sino la creo con id 1
        //Esta propiedad id es propia del método static, no la conoce el objeto
        if (this.idIncrement) {
            this.idIncrement++;
        } else {
            this.idIncrement = 1;
        }
        return this.idIncrement
    }
}

/*
Diferencia entre id y code: son dos cosas distintas
El id es de la base de datos. Primero lo hacemos autoincrementable, luego cuando trabajemos con base de datos este id va a ser generado automáticamente. Ej: 1
El código es algo que yo mismo voy a generar para identificar ese producto, no necesariamente es un número. Ej: AA123LE
*/

//Creo los productos
const producto1 = new Product("Producto 1", "Este es el producto 1", 300, "PROD001", 10, "ejemploImagen1.jpg")
const producto2 = new Product("Producto 2", "Este es el producto 2", 600, "PROD002", 30, "ejemploImagen1.jpg")
const producto3 = new Product("Producto 3", "Este es el producto 3", 400, "PROD003", 15, "ejemploImagen1.jpg")

//Creo un nuevo objeto de la clase "productManager". Al ser una clase tengo que generar un objeto de la misma
//Esto es necesario para inicializar y crear una instancia de la clase ProductManager
//Sin esta línea, no tendría una instancia de ProductManager con la que trabajar y no podría usar sus funcionalidades(los métodos creados)
const productManager = new ProductManager()

//Utilizo los 3 métodos creados en ProductManager
//Para ver en la terminal escribo node nombre_del_archivo. En este caso node ProductManager.js
//1)
productManager.addProduct(producto1)
productManager.addProduct(producto2)
productManager.addProduct(producto3)

//2)
productManager.getProducts()

//3)
productManager.getProductById(2)