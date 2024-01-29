/*
IMPORTANTE: Debo ejecutar "npm run dev" en la terminal para poder ver el localhost:4000 en mi navegador

Para este desafío sólo vamos a practicar en utilizar una base de datos, así que nos vamos a olvidar de las vistas (handlebars) y public (css-img-js) por el momento
Hay 2 formas de utilizar una base de datos: local y remota

Para utilizar una base de datos local vamos a la página de Mongo e instalamos 2 herramientas:
1) MongoDB Community Edition: sirve para instalar MongoDB
2) MongoDB Shell: sirve para poder utilizar MongoDB desde la terminal
Todo esto lo vimos e instalamos en la clase 7 para practicar

Sin embargo, nosotros durante todo el curso vamos a utilizar una base de datos de manera remota llamada MongoDB Atlas
Para esto debemos instalar la dependencia Mongoose:
npm i mongoose
Esta dependencia nos permite manipular las colecciones y documentos de la base de datos remota de MongoDB Atlas
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
import { productModel } from './dao/models/products.models.js';
//Servidor
const PORT = 4000
const app = express()



//Inicializo el servidor
const serverExpress = app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`)
})



/*
Conectar Mongodb Atlas con mi aplicación de visual studio code:

Debo conseguir 2 cosas para lograr la conexión:
1) URL de mi base de datos
2) Contraseña de mi base de datos (no es la misma contraseña que utilizo para entrar a MongoDB Atlas) 
Para conseguir la URL hago lo siguiente:
En la página web de MongoDB Atlas clickeo la pestaña "database", clickeo "Connect", clickeo "Drivers" y se me va a abrir una ventana con mi URL
Debo modificar esa URL, pongo mi contraseña donde dice "<password>". Luego de entregar este desafío cambio la contraseña
En la línea 52 pego mi URL y contraseña

¿Cómo cambio mi contraseña?
Clickeo la pestaña "Database Access" y clickeo "Edit" sobre el usuario que desea cambiarle la contraseña
Cuando inicie la conexión con "npm run dev" me va a aparecer en la pestaña "browseCollections" la colección "users" que yo creé

¿Cómo accedo a las colecciones de mi base de datos?
Clickeo "database" y luego clickeo "browse collections"
*/
mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log('Base de datos conectada'))
    .catch(() => console.log('Error al conectarse a la base de datos'))



//Middlewares:
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/static', express.static(path.join(__dirname, '/public'))) //Path.join: unir rutas en una sola concatenandolas
//Configuración de handlebars:
app.engine('handlebars', engine()) //Defino que motor de plantillas voy a utilizar y su configuración
app.set('view engine', 'handlebars') //Configuración de mi aplicación de handlebars
app.set('views', path.resolve(__dirname, './views')) //Path.resolve: resolver rutas absolutas a través de rutas relativas



//Declaro la variable para el servidor Socket.io
const io = new Server(serverExpress)
//Establezco la conexión con el servidor Socket.io
//Socket.io sirve para enviar datos y eventos desde un cliente a un servidor (o entre diferentes clientes) en una aplicación web en tiempo real
//Sintaxis: se utiliza socket.on y socket.emit
//Sintaxis de socket.emit: socket.emit('nombreEvento', variable);
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

//Genero una ruta utilizando "home.handlebars" como body
//Acá va a haber una lista de los productos agregados. Esta va a a ser una ruta estática
app.get('/home', (req, res) => {
    res.render('home', {
        css: "style.css",
        title: "Home",
        js: "home.js"
    })
})

//Genero una ruta utilizando "realTimeProducts.handlebars" como body
//Acá va a haber un formulario para agregar y eliminar productos, y poder ver los cambios en tiempo real gracias a socket io
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