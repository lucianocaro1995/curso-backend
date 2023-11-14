//1) Imports
//Servidor express
import express from 'express'
import session from 'express-session'
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
//Cors
import cors from 'cors'
//Enrutador
import router from './routes/app.routes.js'



//2) Conexión al servidor
const app = express()
const PORT = 4000
app.listen(PORT, () => {
    console.log(`Server on Port ${PORT}`)
})



//3) Conexión a la base de datos
mongoose.connect(process.env.MONGO_URL)
    .then(async () => {
        console.log('BDD conectada')
    })
    .catch(() => console.log('Error en conexion a BDD'))



//4) Cors
const whiteList = ['http://127.0.0.1:5173']

const corsOptions = {
    origin: function (origin, callback) {
        if (whiteList.indexOf(origin) != -1 || !origin) {
            callback(null, true)
        } else {
            callback(new Error("Acceso denegado"))
        }
    }
}



//5) Configuración del servidor Express
//Middlewares
app.use(express.json())
app.use(cors(corsOptions))
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



//6) Rutas
app.use('/', router)