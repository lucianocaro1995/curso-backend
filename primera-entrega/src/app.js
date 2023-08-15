import express from "express"
const PORT = 4000
const app = express()



import ProductManager from "./ProductManager.js";
const productManager = new ProductManager();



//Voy a generar la ruta inicial de mi app con "/"
app.get("/", (req, res) => {
    res.send("Hola, buenos días")
})

//Genero una ruta para definir mis productos, con un límite de resultados
//Poner esto en la ruta: localhost:4000/products/?limit=1
app.get("/products/", async (req, res) => {
    const products = await productManager.getProducts();
    const limit = req.query.limit;

    if (limit) {
        const limitedProducts = products.slice(0, parseInt(limit));
        res.send({ products: limitedProducts });
    } else {
        res.send({ products });
    }
})

//Genero una ruta la cual debe recibir por req.params el pid (product Id) y devolver sólo el producto solicitado
//Poner esto en la ruta: localhost:4000/products/1
app.get('/products/:pid', async (req, res) => {
    const { pid } = req.params;

    const product = await productManager.getProductById(parseInt(pid));
    if (!product) {
        res.status(404).send({});
        return;
    }

    res.send(product);
})

//Inicializo el servidor
try {
    app.listen(PORT, () => {
        console.log(`Servidor escuchando en el puerto ${PORT}`);
    });
} catch (error) {
    console.error("Error al intentar iniciar el servidor:", error);
}
//Debo ejecutar npm run dev en la terminal para poder ver el localhost:4000 en mi navegador