//No necesito importar todo el módulo de express en este archivo. Solamente necesito para trabajar las rutas
import { Router } from 'express';

//En vez de crear una variable app, solamente creo la variable de mis rutas
const prodsRouter = Router()

//Importo rutas de mi aplicación
import ProductManager from '../ProductManager.js';
const productManager = new ProductManager('./src/productos.json');



//1) GET
//Método para ver todos los productos. Debo incluir la req.query "?limit" por pedido de la consigna
//Poner esto en la ruta: localhost:8080/api/products?limit=1
prodsRouter.get('/', async (req, res) => {
    try {
        const { limit } = req.query;

        //Verificar si se proporciona un límite
        if (limit) {
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
            return res.status(200).json(limitedProducts);
        }

        //Si no se proporciona ningún límite, devolver todos los productos
        const allProducts = await productManager.getProducts();
        res.status(200).json(allProducts);
    } catch (error) {
        res.status(500).json(error.message);
    }
});


//2) GET(pid = product id)
//Método para consultar por un producto, utilizando su id
//Poner esto en la ruta: localhost:8080/api/products/1
prodsRouter.get('/:pid', async (req, res) => {
    try {
        //Como yo tengo el id como número en el json, tengo que parsear acá para que Postman me tome el id como número y no como string
        //Cuando utilicemos base de datos, el id lo va a autogenerar esa base. En ese caso el id va a ser un string
        //Las bases de datos les ponen tanto números como letras al id, por eso va a ser un string
        const pid = parseInt(req.params.pid);
        const product = await productManager.getProductById(pid);
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json(error.message);
    }
})

//3) POST
//Método para agregar un producto desde Postman. Debo escribir el producto entero con todos sus atributos en Postman
//Poner esto en la ruta: localhost:8080/api/products
prodsRouter.post('/', async (req, res) => {
    try {
        //Creo una variable newProduct y le envío los datos estándar del cuerpo (Es decir, los datos que tendrán TODOS los productos)
        //Tengo que crear esta variable newProduct porque estoy agregando el nuevo producto desde afuera, desde Postman
        const newProduct = req.body;
        await productManager.addProduct(newProduct);
        res.status(201).json("Producto agregado exitosamente");
    } catch (error) {
        res.status(500).json(error.message);
    }
});

//4) PUT(pid = product id)
//Método para actualizar todos los atributos de un producto, utilizando su id
//Poner esto en la ruta: localhost:8080/api/products/1
prodsRouter.put('/:pid', async (req, res) => {
    try {
        const pid = parseInt(req.params.pid);
        //Le paso 2 parámetros: el id para identificar al producto, y el body (resto de los atributos) que va a ser actualizado
        await productManager.updateProduct(pid, req.body);
        res.status(200).json("Producto actualizado");
    } catch (error) {
        res.status(500).json(error.message);
    }
});

//5) DELETE(pid = product id)
//Método para eliminar un producto, utilizando su id
//Poner esto en la ruta: localhost:8080/api/products/1
prodsRouter.delete('/:pid', async (req, res) => {
    try {
        const pid = parseInt(req.params.pid);
        await productManager.deleteProduct(pid);
        res.status(200).json("Producto eliminado");
    } catch (error) {
        res.status(500).json(error.message);
    }
});



//Cuando es un único elemento de todo el archivo, se utiliza export default. Sino se utiliza export
export default prodsRouter