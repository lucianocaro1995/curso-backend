/*
IMPORTANTE: Debo ejecutar "npm run dev" en la terminal para poder ver el localhost:4000 en mi navegador
Para este desafío instalamos 4 dependencias:
1) Instalo "npm i dotenv"
Nos permite manejar variables de entorno dentro de nuestra aplicación. Sirve para ocultar contraseñas y no subirlas a github
Copio toda la URL que escribí en la conexión con MongoDB Atlas y la pego en el archivo ".env". Luego donde estaba la URL pongo "process.env.MONGO_URL"
En la versión nueva de node lo tenemos de forma nativa, pero en esta versión tengo que instalando desde la terminal
2) Instalo "npm i cookie-parser"
Nos permite trabajar con cookies. Cookies: formas de guardar información en el cliente
3) Instalo "npm i express-session"
Nos permite manejar las sesiones de mi aplicación que se guardan en el servidor, no en la base de datos. No tiene nada que ver con las cookies
4) Instalo "npm i connect-mongo"
Nos permite trabajar con sesiones guardadas en la base de datos MongoDB (ya que guardarlas en un servidor no es recomendable porque se caen seguido)
*/



//1) Imports
//Módulos
import 'dotenv/config'
import express from 'express'
import mongoose from 'mongoose'
import cookieParser from 'cookie-parser'
import session from 'express-session'
import MongoStore from 'connect-mongo'
//Vistas
import { engine } from 'express-handlebars';
import { Server }  from 'socket.io'
//Path:
import { __dirname } from './path.js';
import path from 'path';
//Rutas
import userRouter from './routes/users.routes.js'
import productRouter from './routes/products.routes.js'
import cartRouter from "./routes/carts.routes.js"
import messageRouter from "./routes/messages.routes.js"
import sessionRouter from './routes/sessions.routes.js'
//Modelos
import { productModel } from './dao/models/products.models.js'
import { messageModel } from './dao/models/messages.models.js'
import { userModel } from './dao/models/users.models.js'



//2) Conexión al servidor
const app = express()
const PORT = 4000
const serverExpress = app.listen(PORT, () => {
    console.log(`Server on port ${PORT}`)
})



//3) Conexión a la base de datos
mongoose.connect(process.env.MONGO_URL)
    .then(async () => {
        console.log('BDD conectada')
    })
    .catch(() => console.log('Error en conexion a BDD'))



//4) Configuración del servidor Express:
//Middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser(process.env.SIGNED_COOKIE)) //La cookie esta firmada
app.use(session({
    //1) Configuración de sesiones en la base de datos MongoDB
    store: MongoStore.create({
        mongoUrl: process.env.MONGO_URL,
        mongoOptions: {
            useNewUrlParser: true, //Establezco que la conexión sea mediante URL
            useUnifiedTopology: true //Manejo de clusters de manera dinámica
        },
        ttl: 60 //Duracion de la sesión en la base de datos en segundos

    }),
    //2) Configuración de sesiones en el servidor
    secret: process.env.SESSION_SECRET,
    //Resave permite mantener la sesión activa en caso de que la sesión se mantenga inactiva
    //Si se deja en false, la sesión morirá en caso de que exista cierto tiempo de inactividad
    resave: false,
    //saveUninitialized permite guardar cualquier sesión aún cuando el objeto de sesión no tenga nada por contener
    //Si se deja en false, la sesión no se guardará si el objeto de sesión está vacío al final de la consulta
    saveUninitialized: false
}))



//5) Configuración de handlebars:
//Middlewares
app.engine('handlebars', engine())
app.set('view engine', 'handlebars')
app.set('views', path.resolve(__dirname, './views'))
app.use('/static', express.static(path.join(__dirname, '/public')))
app.use('/realTimeProducts', express.static(path.join(__dirname, '/public')))
app.use('/chat', express.static(path.join(__dirname, '/public')))
app.use('/login', express.static(path.join(__dirname, '/public')))
app.use('/signIn', express.static(path.join(__dirname, '/public')))
app.use('/logOut', express.static(path.join(__dirname, '/public')))

//Unión entre HTML(handlebars) y public(JS, CSS, IMG)
app.get('/realTimeProducts', (req, res) => {
    res.render('realTimeProducts', {
        js: "realTimeProducts.js",
        css: "style.css",
        title: "Products",
    })
})

app.get('/static', (req, res) => {
    res.render('home', {
        js: "home.js",
        css: "style.css",
        title: "Home",
    })
})

app.get('/chat', (req, res) => {
    res.render('chat', {
        globalCss: 'style.css',
        title: 'Chat Socket.io',
        js: 'chat.js',
    })
})

app.get('/login', (req, res) => {
    res.render('login', {
        js: "login.js",
        css: "style.css",
        title: "Login",
    })
})

app.get('/signIn', (req, res) => {
    res.render('signIn', {
        js: "signIn.js",
        css: "style.css",
        title: "SignIn",
    })
})

app.get('/logOut', (req, res) => {
    res.render('logOut', {
        js: "logOut.js",
        css: "style.css",
        title: "LogOut",
    })
})



//6) Socket.io
//Para trabajar en tiempo real
const io = new Server(serverExpress);

io.on('connection', (socket)=> {
    console.log('servidor de socket io conectado')

    socket.on('add-message', async ({email, mensaje}) => {
        console.log(mensaje)
        await messageModel.create({email: email, message: mensaje})
        const messages = await messageModel.find();
        socket.emit('show-messages', messages);
    })

    socket.on('display-inicial', async() =>{
        const messages = await messageModel.find();
        socket.emit('show-messages', messages);
    })

    socket.on('add-product', async (nuevoProd) => {
        const { title, description, price, code, stock, category } = nuevoProd;
        await productModel.create({title: title, description: description, price: price, code: code, stock: stock, category: category});
        const products = await productModel.find();
        socket.emit('show-products', products);
    })

    socket.on('update-products', async () => {
        const products = await productModel.find();
        socket.emit('show-products', products);
    });

    socket.on('remove-product', async ({ code }) => {
        try {
            console.log("inicio remove socket")
            await productModel.deleteOne({ code: code });
            const products = await productModel.find();
            socket.emit('show-products', products);
        }catch (error) {
            console.error('Error eliminando producto:', error);
        }
    })

    socket.on('nuevoUsuario', async (newUser) => {
        const user = await userModel.create(newUser)
        socket.emit('registrado', user)
    })
})



//7) Rutas
app.use('/api/users', userRouter)
app.use('/api/products', productRouter)
app.use('/api/carts', cartRouter)
app.use('/api/messages', messageRouter)
app.use('/api/sessions', sessionRouter)