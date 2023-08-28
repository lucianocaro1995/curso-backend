/*
IMPORTANTE: Debo ejecutar "npm run dev" en la terminal para poder ver el localhost:8080 en mi navegador
Para este desafío instalamos 3 dependencias:
Instalo multer con: "npm i multer" para poder subir imágenes a nuestro servidor. Ya que json no maneja imágenes
Instalo express-handlebars con: "npm i express-handlebars"
Instalo socket.io con: "npm i socket.io"
*/

//Importo módulos:
import express from 'express';
import multer from 'multer';
import { engine } from 'express-handlebars';
import { Server } from 'socket.io';
//Importo path:
import { __dirname } from './path.js';
import path from 'path';
//Importo rutas de mi aplicación:
import prodsRouter from './routes/products.routes.js';
import cartsRouter from './routes/carts.routes.js';
import ProductManager from './ProductManager.js';
//Constantes:
const manager = new ProductManager();
//Constantes del servidor:
const PORT = 8080
const app = express()



//Configuración de multer:
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        //Null hace referencia a que callback(cb) no devuelva errores. Pongo ruta donde quiero que se guarden las imágenes
        cb(null, 'src/public/img')
    },
    filename: (req, file, cb) => {
        //Concateno el nombre original de mi archivo con milisegundos con Date.now()
        cb(null, `${Date.now()}${file.originalname}`)
    }
})



//Inicializo el servidor y lo guardo en una constante:
//Antes tenía este código abajo de todo. Ahora con socket.io necesito inicializar antes de los middlewares y rutas
const serverExpress = app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`)
})



//Middlewares:
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/static', express.static(path.join(__dirname, '/public'))) //Path.join: unir rutas en una sola concatenandolas
//Configuración de handlebars:
app.engine('handlebars', engine()) //Defino que motor de plantillas voy a utilizar y su configuración
app.set('view engine', 'handlebars') //Configuración de mi aplicación de handlebars
app.set('views', path.resolve(__dirname, './views')) //Path.resolve: resolver rutas absolutas a través de rutas relativas
app.use('/realtimeproducts', express.static(path.join(__dirname, '/public')))
//Configuración de multer (genero una constante que va a contener la configuración de multer):
const upload = multer({ storage: storage })



//Declaro la variable para el servidor Socket.io
const io = new Server(serverExpress)
//Establezco la conexión con el servidor Socket.io
//Socket.io sirve para enviar datos y eventos desde un cliente a un servidor (o entre diferentes clientes) en una aplicación web en tiempo real
//Sintaxis: se utiliza socket.on y socket.emit
//Sintaxis de socket.emit: socket.emit('nombreEvento', variable);
io.on('connection', (socket) => {
    console.log('Servidor de socket io conectado')

    //Obtiene los productos y envía la lista actualizada en el cliente. Esto lo uso en "home.js"
    socket.on('update-products', async () => {
        const products = await manager.getProducts();
        socket.emit('products-data', products);
    });

    //Agrega un producto y envía la lista actualizada al cliente. Esto lo uso en "realTimeProducts.js"
    socket.on('nuevoProducto', async (nuevoProd) => {
        const { title, description, category, thumbnail, price, stock, code } = nuevoProd;
        await manager.addProduct(title, description, category, thumbnail, price, stock, code);
        const products = await manager.getProducts();
        socket.emit('products-data', products);
    })

    //Elimina un producto y envía la lista actualizada al cliente. Esto lo uso en "realTimeProducts.js"
    socket.on('remove-product', async (id) => {
        await manager.deleteProduct(id);
        const products = await manager.getProducts();
        socket.emit('products-data', products);
        console.log('Producto eliminado exitosamente');
    });
})



//Rutas:
app.use('/api/products', prodsRouter)
app.use('/api/carts', cartsRouter)
app.use('/static', express.static(path.join(__dirname, '/public')))

//Genero una ruta utilizando "home" como body
//Acá va a haber una lista de los productos agregados. Esta va a a ser una ruta estática
app.get('/static', (req, res) => {
    res.render('home', {
        css: "style.css",
        title: "Home",
        js: "home.js"
    })
})

//Genero una ruta utilizando "realTimeProducts" como body
//Acá va a haber un formulario para agregar productos y verlos en tiempo real gracias a websocket(socket.on y socket.emit)
app.get('/realtimeproducts', (req, res) => {
    res.render('realTimeProducts', {
        css: "style.css",
        title: "Products",
        js: "realTimeProducts.js"
    })
})

//Genero una ruta para que se suban imágenes gracias a multer
app.post('/upload', upload.single('product'), (req, res) => {
    console.log(req.file)
    console.log(req.body)
    res.status(200).send("Imagen cargada")
})