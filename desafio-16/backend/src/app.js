//1) Imports
//Servidor express
import express from 'express'
import session from 'express-session'
//Path
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
//Cors
import cors from 'cors'
//Swagger
import swaggerJSDoc from 'swagger-jsdoc'
import swaggerUiExpress from 'swagger-ui-express'
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
app.use(express.urlencoded({ extended: true }))
app.use(cors(corsOptions))
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



//7) Swagger
const swaggerOptions = {
    definition: {
        openapi: '3.1.0',
        info: {
            title: "Documentación del curso de Backend",
            description: "API Coder Backend"
        }
    },
    apis: [`${__dirname}/docs/**/*.yaml`]
    //** = indica una subcarpeta que no me interesa el nombre
    //*.yaml = indica que en esa subcarpeta va a haber archivos. No me interesa el nombre de estos pero la extensión es yaml
}

//La forma en que voy a trabajar mi documentación
const specs = swaggerJSDoc(swaggerOptions)
//En qué ruta se va a ejecutar, y bajo qué condiciones
app.use('/apidocs', swaggerUiExpress.serve, swaggerUiExpress.setup(specs))