/*
Desafio 3:
Para este desafío instalamos 2 dependencias: nodemon y express
Comandos para poner en la terminal:
1) npm init --yes: genero un package.json. A este package.json le agregamos/modificamos 3 cosas:
"type": "module",
"main": "app.js",
"scripts": {
    "dev": "nodemon src/app.js"
},
2) npm i nodemon -D: instalo nodemon. Esto me agrega el package-lock.json y node_modules
3) npm i express: instalo express

//Importo el módulo http:
import http from "http"

//Genero el puerto del servidor:
//Vas a poder acceder a una aplicación que yo cree, a través del siguiente puerto definido:
//Los servidores tienen puertos para definir dónde puedo ingresar a mi aplicación
const PORT = 4000

//Genero el servidor:
//req = request y res = response. Se puede escribir de ambas formas
const server = http.createServer((request, response) => {
    response.send("Hola, buenos días")
})

//Inicializo mi servidor:
server.listen(PORT, () => {
    console.log(`Server on port ${PORT}`)
})

//Haciendo todo esto, escribo en la terminal "npm run dev" para ejecutar. Abro el navegador, escribo localhost:4000 en la ruta y me va a llevar a mi página
*/





//Ahora genero un servidor, pero utilizando express (es un framework): esto simplifica la creación de servidores
//Antes tenemos que instalarlo poniendo en la terminal npm i express. Luego lo importo
import express from "express"
const PORT = 4000
//Genero una instancia de express en app
const app = express()

//Importo el ProductManager
import ProductManager from "./ProductManager.js";
const productManager = new ProductManager();



//Genero un array de productos para practicar. Pero luego utilizo los productos de mi json
// const prods = [
//     { id: 1, nombre: "Zapatillas", categoria: "Calzado" },
//     { id: 2, nombre: "Botas", categoria: "Calzado" },
//     { id: 3, nombre: "Remera", categoria: "Indumentaria" }
// ]

//Voy a generar la ruta inicial de mi app con "/"
app.get("/", (req, res) => {
    res.send("Hola, buenos días")
})

//Genero una ruta para definir mis productos, filtrando por categoria
// app.get("/products", (req, res) => {
//     //Consulto por los querys de mi url
//     //console.log(req.query)
//     const { categoria } = req.query
//     //Filtro por categoria, sino mostrame todo
//     if (categoria) {
//         const products = prods.filter(prod => prod.categoria === categoria)
//         res.send(products) //Siempre retorna en formato string, es decir cadena de texto. Lo pasa de objeto a JSON
//     } else {
//         res.send(prods)
//     }
// })

//Ahora consulto un producto por su id
// app.get("/products/:id", (req, res) => {
//     //Todo lo que me ingrese desde el cliente va a ser un string, entonces lo tenemos que convertir a número. Por eso el parseInt
//     const prod = prods.find(prod => prod.id === parseInt(req.params.id))

//     if (prod) {
//         res.send(prod)
//     } else {
//         res.send("Producto no existente")
//     }
// })

//Genero una ruta para definir mis productos, con un límite de resultados
//Poner esto en la ruta: localhost:4000/products/?limit=1
app.get("/products/", async (req, res) => {
    const products = await productManager.getProducts();
    const limit = req.query.limit;

    //Aplicar el límite si se proporciona, sino mostrar todos los productos
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
//Debo ejecutar "npm run dev" en la terminal para poder ver el localhost:4000 en mi navegador





/*
Cómo identificar un query param: tiene un signo de pregunta en la ruta
Para definir un query param, tengo que poner en la ruta "?" y luego busco un elemento
Ejemplo buscando por su categoria:
localhost:4000/products?categoria=Calzado
*/