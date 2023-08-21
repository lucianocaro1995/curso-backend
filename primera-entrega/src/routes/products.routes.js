//No necesito importar todo el módulo de express en este archivo. Solamente necesito para trabajar las rutas
import { Router } from 'express';

//En vez de crear una variable app, solamente creo la variable de mis rutas
const prodsRouter = Router()

//Importo rutas de mi aplicación
import ProductManager from '../ProductManager.js';
const productManager = new ProductManager('./src/productos.json');





//1) GET
//Método para ver todos los productos. Acá genero la primera ruta de mi aplicación. Debo incluir la limitación ?limit por pedido de la consigna
//Poner esto en la ruta: localhost:8080/api/products?limit=1
prodsRouter.get('/', async (req, res) => {
    try {
        const { limit } = req.query;

        //Validar y asegurarse de que limit sea un número positivo
        const parsedLimit = parseInt(limit);
        if (isNaN(parsedLimit) || parsedLimit <= 0) {
            return res.status(400).json({ error: "El parámetro 'limit' debe ser un número positivo válido" });
        }

        //Obtener la lista completa de productos
        const allProducts = await productManager.getProducts();

        //Limitar la lista de productos según el valor proporcionado
        const limitedProducts = allProducts.slice(0, parsedLimit);

        //Enviar la respuesta con los productos limitados
        res.status(200).json(limitedProducts);
    } catch (error) {
        console.error("Error al obtener los productos:", error);
        res.status(500).json({ error: "Hubo un error al procesar la solicitud" });
    }
});


//2) GET(pid = product id)
//Método para consultar por un producto, utilizando su id
//Poner esto en la ruta: localhost:8080/api/products/1
prodsRouter.get('/:pid', async (req, res) => {
    const id = parseInt(req.params.pid);
    const product = await productManager.getProductById(id);

    if (product) {
        res.status(200).json(product)
    } else {
        res.status(404).json({ message: "Producto no existente" })
    }
})

//3) POST
//Método para agregar un producto, utilizando su code
//Poner esto en la ruta: localhost:8080/api/products
prodsRouter.post('/', async (req, res) => {
    const { code } = req.body;
    const prodCode = await productManager.getProductByCode(code)

    if (prodCode) {
        res.status(400).send("Producto ya existente");
    } else {
        const product = req.body;
        await productManager.addProduct(product);
        res.status(201).json({ message: "Producto agregado" });
    }
})

//4) PUT(pid = product id)
//Método para actualizar todos los atributos de un producto, utilizando su id
//Poner esto en la ruta: localhost:8080/api/products/1
prodsRouter.put('/:pid', async (req, res) => {
    const id = parseInt(req.params.pid);
    const product = await productManager.getProductById(id);

    if (product) {
        await productManager.updateProduct(id, req.body)
        res.status(200).json({ message: "Producto actualizado" })
    } else {
        res.status(404).json({ message: "Producto no encontrado" })
    }
})

//5) DELETE(pid = product id)
//Método para eliminar un producto, utilizando su id
//Poner esto en la ruta: localhost:8080/api/products/1
prodsRouter.delete('/:pid', async (req, res) => {
    const id = parseInt(req.params.pid);
    const product = await productManager.getProductById(id);

    if (product) {
        await productManager.deleteProduct(id)
        res.status(200).json({ message: "Producto eliminado" })
    } else {
        res.status(404).json({ message: "Producto no encontrado" })
    }
})





//Cuando es un único elemento de todo el archivo, se utiliza export default. Sino se utiliza export
export default prodsRouter