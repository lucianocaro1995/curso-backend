//1) Imports
//Servidor express
import express from 'express'
import session from 'express-session'
//Path
import path from 'path'
import { __dirname } from './path.js'
//MongoDB
import mongoose from 'mongoose'
import MongoStore from 'connect-mongo'
//.Env
import 'dotenv/config'
//Cookies
import cookieParser from 'cookie-parser'
//Passport
import passport from 'passport'
import initializePassport from './config/passport.js'
//Vistas
import { engine } from 'express-handlebars'
import { Server } from 'socket.io'
//Rutas
import userRouter from './routes/users.routes.js'
import productRouter from './routes/products.routes.js'
import cartRouter from './routes/carts.routes.js'
import messageRouter from './routes/messages.routes.js'
import sessionRouter from './routes/sessions.routes.js'
//Modelos
import { messageModel } from './dao/models/messages.models.js'
import { productModel } from './dao/models/products.models.js'
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



//4) Configuración del servidor Express
//Middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser(process.env.SIGNED_COOKIE))
app.use(session({
    //Configuración de sesiones en la base de datos
    store: MongoStore.create({
        mongoUrl: process.env.MONGO_URL,
        mongoOptions: {
            useNewUrlParser: true,
            useUnifiedTopology: true
        },
        ttl: 60
    }),
    
    //Configuración de sesiones en el servidor
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))
//Middlewares de passport
initializePassport()
app.use(passport.initialize())
app.use(passport.session())



//5) Configuración de handlebars
//Middlewares
app.engine('handlebars', engine())
app.set('view engine', 'handlebars')
app.set('views', path.resolve(__dirname, './views'))

//Middlewares para archivos estáticos
app.use('/chat', express.static(path.join(__dirname, '/public')))
app.use('/home', express.static(path.join(__dirname, '/public')))
app.use('/login', express.static(path.join(__dirname, '/public')))
app.use('/logout', express.static(path.join(__dirname, '/public')))
app.use('/realtimeproducts', express.static(path.join(__dirname, '/public')))
app.use('/signup', express.static(path.join(__dirname, '/public')))

//Conexión entre handlebars(HTML) y public(JS, CSS, IMG)
app.get('/chat', (req, res) => {
    res.render('chat', {
        css: "style.css",
        js: "chat.js",
        title: "Chat"
    })
})

app.get('/home', (req, res) => {
    res.render('home', {
        css: "style.css",
        js: "home.js",
        title: "Home"
    })
})

app.get('/login', (req, res) => {
    res.render('login', {
        css: "style.css",
        js: "login.js",
        title: "Login"
    })
})

app.get('/logout', (req, res) => {
    res.render('logout', {
        css: "style.css",
        js: "logout.js",
        title: "Logout"
    })
})

app.get('/realtimeproducts', (req, res) => {
    res.render('realTimeProducts', {
        css: "style.css",
        js: "realTimeProducts.js",
        title: "Products",
    })
})

app.get('/signup', (req, res) => {
    res.render('signup', {
        css: "style.css",
        js: "signup.js",
        title: "Signup"
    })
})



//6) Socket.io
const io = new Server(serverExpress);

io.on('connection', (socket)=> {
    console.log('servidor de socket io conectado')
    //chat.js
    socket.on('add-message', async ({email, mensaje}) => {
        console.log(mensaje)
        await messageModel.create({email: email, message: mensaje})
        const messages = await messageModel.find();
        socket.emit('show-messages', messages);
    })
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
    //signup.js
    socket.on("new-user", async (user) => {
        const { first_name, last_name, age, email, password } = user;
        try {
            if (!first_name || !last_name || !age || !email || !password) {
                socket.emit("user", { success: false, message: "Todos los campos son obligatorios." });
                return;
            }
            await userModel.create({ first_name, last_name, age, email, password });
            socket.emit("user", { success: true });
        } catch (error) {
            console.error('Hubo un error al registrar el usuario:', error);
            socket.emit("user", { success: false, message: "Hubo un error al registrar el usuario. Inténtalo nuevamente." });
        }
    });
})



//7) Rutas
app.use('/api/users', userRouter)
app.use('/api/products', productRouter)
app.use('/api/carts', cartRouter)
app.use('/api/messages', messageRouter)
app.use('/api/sessions', sessionRouter)