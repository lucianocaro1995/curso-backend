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





ESTO SIRVE PARA CREAR UN SERVIDOR DE LA FORMA ANTIGUA, SIN EL MÓDULO EXPRESS:
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




//ESTO SIRVE PARA CREAR UN SERVIDOR UTILIZANDO EXPRESS:
//Ahora genero un servidor, pero utilizando express (es un framework): esto simplifica la creación de servidores
//Antes tenemos que instalarlo poniendo en la terminal npm i express. Luego lo importo
import express from "express"
const PORT = 4000
//Genero una instancia de express en app
const app = express()

//Importo el ProductManager
import ProductManager from "./ProductManager.js";
//Esta línea de código está creando una nueva instancia de la clase ProductManager y almacenándola en la constante productManager
//Lo que me permitirá trabajar con métodos y propiedades definidos en la clase ProductManager
const productManager = new ProductManager();



/*
Si yo consulto una base de datos o un file system asincrónico, la ruta también debe ser asincrónica
Para trabajar con asincronía siempre debo utilizar async y await

Req: request, pedido
Res: response, respuesta

res.status(número): sirve para devolverme una respuesta, ya sea producto no encontrado(404), producto encontrado(200), etc
req.query: se utiliza para consultar por los parámetros mediante el método GET
Estos son los valores que se encuentran después del signo de interrogación en una URL, como "?nombre=Juan&edad=25"
Se puede acceder a estos valores utilizando req.query.nombre, req.query.edad, etc
req.params: se utiliza para consultar por un sólo un parámetro, comúnmente el id
req.body: se utiliza para pedir todo el contenido de mi producto
*/



//1) GET
//Método para ver todos los productos. Acá genero la primera ruta de mi aplicación con "/"
//Poner esto en la ruta: localhost:4000
app.get("/", (req, res) => {
    res.send("Hola, buenos días")
})

//2) GET(id)
//Método para consultar por un producto, utilizando su id
//Poner esto en la ruta: localhost:4000/products/1
app.get('/products/:pid', async (req, res) => {
    const { pid } = req.params;

    //Todo lo que me ingrese desde el cliente va a ser un string, entonces lo tenemos que convertir a número. Por eso el parseInt
    const product = await productManager.getProductById(parseInt(pid));
    if (product) {
        res.send(product)
    } else {
        res.send("Producto no existente")
    }
})

//3) GET, agregando un req.query (o query param)
//Genero una ruta para ver mis productos y le agrego un límite de resultados con req.query
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

/*
COMENTO LOS MÉTODOS RESTANTES PORQUE FUE VISTO EN CLASE, PERO NO SE PIDIÓ PARA EL DESAFÍO 3
//4) POST
//Método para agregar un producto
//Post no necesita un id, porque un producto cuando se crea y agrega no necesita un id. Post necesita el código
//El código me ayuda a verificar si el producto existe o no en un método post
app.post('/products', (req, res) => {
    //No puedo utilizar params porque estoy enviando todo el contenido de mi producto
    //No puedo utilizar query porque eso se utiliza para hacer consultas
    //Por eso se utiliza el body para método POST
    const producto = prods.find(prod => prod.code === req.body.code)

    if (producto) {
        res.status(400).send("Producto ya existente")
    } else {
        prods.push(req.body)
        res.status(200).send("Producto creado")
    }
})

//5) PUT(id)
//Método para actualizar todos los atributos de un producto, utilizando su id
app.put('/products/:id', (req, res) => {
    //Primero consulto por el id (que no se modifica) y luego consulto por todos los otros atributos que SÍ puedo modificar
    const { id } = req.params
    const { title, description, price, code, stock, thumbnail } = req.body

    //FindIndex me devuelve la posición del elemento en el array
    const productIndex = prods.findIndex(prod => prod.id === parseInt(id))

    if (productIndex != -1) {
        prods[productIndex].title = title
        prods[productIndex].description = description
        prods[productIndex].price = price
        prods[productIndex].code = code
        prods[productIndex].stock = stock
        prods[productIndex].thumbnail = thumbnail
        res.status(200).send(`Producto ${title} actualizado`)
    } else {
        res.status(404).send("Producto no encontrado")
    }
})

//6) DELETE(id)
//Método para eliminar un producto, utilizando su id
app.delete('/products/:id', (req, res) => {
    const { id } = req.params

    const productIndex = prods.findIndex(prod => prod.id === parseInt(id))

    if (productIndex != -1) {
        prods = prods.filter(prod => prod.id != parseInt(id))
        res.status(200).send(`Producto eliminado`)
    } else {
        res.status(404).send("Producto no encontrado")
    }
})
*/

//Inicializo el servidor
try {
    app.listen(PORT, () => {
        console.log(`Servidor escuchando en el puerto ${PORT}`);
    });
} catch (error) {
    console.error("Error al intentar iniciar el servidor:", error);
}



//IMPORTANTE: Debo ejecutar "npm run dev" en la terminal para poder ver el localhost:4000 en mi navegador