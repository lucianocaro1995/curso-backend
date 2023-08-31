import express from 'express';
import multer from 'multer';
import { engine } from 'express-handlebars';
import { Server } from 'socket.io';
import { __dirname } from './path.js';
import path from 'path';
import prodsRouter from './routes/products.routes.js';
import cartsRouter from './routes/carts.routes.js';
import ProductManager from './ProductManager.js';
const manager = new ProductManager();
const PORT = 8080
const app = express()



//Configuración de multer:
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'src/public/img')
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}${file.originalname}`)
    }
})



//Inicializo el servidor:
const serverExpress = app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`)
})



//Middlewares:
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/static', express.static(path.join(__dirname, '/public')))
app.engine('handlebars', engine())
app.set('view engine', 'handlebars')
app.set('views', path.resolve(__dirname, './views'))
app.use('/realtimeproducts', express.static(path.join(__dirname, '/public')))
const upload = multer({ storage: storage })



//Establezco la conexión con el servidor Socket.io
const io = new Server(serverExpress)

io.on('connection', (socket) => {
    console.log('Servidor de socket io conectado')



    //1) Obtiene los productos y envía la lista actualizada en el cliente. Esto lo uso en ambas páginas, "home.js" y "realTimeProducts.js"
    socket.on('actualizarProductos', async () => {
        const products = await manager.getProducts();
        socket.emit('products-data', products);
    });



    //2) Agrega un producto y envía la lista actualizada al cliente. Esto lo uso en "realTimeProducts.js"
    socket.on('nuevoProducto', async (nuevoProd) => {
        const { title, description, category, thumbnail, price, stock, code } = nuevoProd;

        const codeAlreadyExists = await manager.getProductByCode(code);
        if (codeAlreadyExists) {
            socket.emit('code-exists', 'Ya existe un producto con ese código');
            return;
        }

        try {
            await manager.addProduct(title, description, category, thumbnail, price, stock, code);
            const products = await manager.getProducts();
            socket.emit('products-data', products);
            socket.emit('product-added', 'Producto agregado exitosamente');
        } catch (error) {
            socket.emit('product-add-error', 'Error al agregar producto');
            console.error(error);
        }
    });



    //3) Elimina un producto y envía la lista actualizada al cliente. Esto lo uso en "realTimeProducts.js"
    socket.on('eliminarProducto', async (id) => {
        try {
            const idNotFound = await manager.deleteProduct(id);
            
            if (idNotFound) {
                socket.emit('product-removed', 'Producto eliminado exitosamente');
            } else {
                socket.emit('product-not-found', 'No existe un producto con ese ID');
            }
            
            const products = await manager.getProducts();
            socket.emit('products-data', products);
        } catch (error) {
            socket.emit('product-remove-error', 'Error al eliminar producto');
            console.error(error);
        }
    });
    
})



//Rutas:
app.use('/api/products', prodsRouter)
app.use('/api/carts', cartsRouter)
app.use('/home', express.static(path.join(__dirname, '/public')))

app.get('/home', (req, res) => {
    res.render('home', {
        css: "style.css",
        title: "Home",
        js: "home.js"
    })
})

app.get('/realtimeproducts', (req, res) => {
    res.render('realTimeProducts', {
        css: "style.css",
        title: "Products",
        js: "realTimeProducts.js"
    })
})

app.post('/upload', upload.single('product'), (req, res) => {
    console.log(req.file)
    console.log(req.body)
    res.status(200).send("Imagen cargada")
})