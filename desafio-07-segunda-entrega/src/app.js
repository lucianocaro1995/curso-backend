/*
IMPORTANTE: Debo ejecutar "npm run dev" en la terminal para poder ver el localhost:4000 en mi navegador
Para este desafío instalamos 1 dependencia:
Instalo paginación con: "npm i mongoose-paginate-v2"
La paginación nos permite segmentar los resultados en pequeños trozos de información, brindándonos una referencia de en qué página estamos, cuál es la página anterior y cuál es la siguiente
*/



//Módulos
import 'dotenv/config'
import express from 'express';
import mongoose from 'mongoose';
import { engine } from 'express-handlebars';
import { Server } from 'socket.io';
//Path
import { __dirname } from './path.js';
import path from 'path'
//Rutas
import userRouter from './routes/users.routes.js'
import productRouter from './routes/products.routes.js'
import cartRouter from './routes/carts.routes.js'
import messageRouter from './routes/messages.routes.js'
//Modelos
import { messageModel } from './dao/models/messages.models.js'
import { productModel } from './dao/models/products.models.js'
import { userModel } from './dao/models/users.models.js' //Llamo a los usuarios y utilizo paginación/paginate
//Servidor
const PORT = 4000
const app = express()



//Inicializo el servidor
const serverExpress = app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`)
})


//Conectar Mongodb Atlas con mi aplicación de visual studio code:
mongoose.connect(process.env.MONGO_URL)
.then(async () => {
    console.log('Base de datos conectada');
    /*
    Paginate:
    En los paréntesis agregamos 2 filtros al paginate, separados con llaves
    Primer filtro: es un filtro de algún atributo, como el password de los usuarios
    Segundo filtro: tiene varias opciones a elegir, acá puse limit y sort (hay también page, populate, projection, etc)

    Parámetro limit: la cantidad de elementos por página
    Parámetro sort: ordenar los resultados de forma ascendente o descendente según un atributo dado, como la edad
    
    const resultado = await userModel.paginate({ password: '1234' }, { limit: 20, page: 1, sort: { edad: 'asc' } });
    console.log(resultado);
    */
})
.catch((error) => {
    console.log('Error al conectarse a la base de datos:', error);
});



//Middlewares:
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/static', express.static(path.join(__dirname, '/public')))
//Configuración de handlebars:
app.engine('handlebars', engine())
app.set('view engine', 'handlebars')
app.set('views', path.resolve(__dirname, './views')) 



//Socket.io:
const io = new Server(serverExpress)

io.on('connection', (socket)=> {
    console.log('servidor de socket io conectado')
    //chat.js
    socket.on('add-message', async ({email, mensaje}) => {
        console.log(mensaje);
        await messageModel.create({email: email, message: mensaje});
        const messages = await messageModel.find();
        socket.emit('show-messages', messages);
    });
    //chat.js
    socket.on('load-chat', async() =>{
        const messages = await messageModel.find();
        socket.emit('show-messages', messages);
    })
    //realTimeProducts.js
    socket.on('add-product', async (nuevoProd) => {
        const { title, description, category, thumbnail, price, stock, code } = nuevoProd;
        await productModel.create({title: title, description: description, category: category, thumbnail: thumbnail, price: price, stock: stock, code: code});
        const products = await productModel.find();
        socket.emit('show-products', products);
    })
    //realTimeProducts.js - home.js
    socket.on('update-products', async () => {
        const products = await productModel.find();
        socket.emit('show-products', products);
    });
    //realTimeProducts.js
    socket.on('remove-product', async ({ code }) => {
        try {
            await productModel.deleteOne({ code: code });
            const products = await productModel.find();
            socket.emit('show-products', products);
        } catch (error) {
            console.error('Error al eliminar producto:', error);
        }
    })
})



//Rutas:
app.use('/home', express.static(path.join(__dirname, '/public')))
app.use('/realtimeproducts', express.static(path.join(__dirname, '/public')))
app.use('/chat', express.static(path.join(__dirname, '/public')))
app.use('/api/users', userRouter)
app.use('/api/products', productRouter)
app.use('/api/carts', cartRouter)
app.use('/api/messages', messageRouter)

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

app.get('/chat', (req, res) => {
    res.render('chat', {
        css: "style.css",
        title: "Chat",
        js: "chat.js"
    })
})