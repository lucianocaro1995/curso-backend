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
const PORT = 3000
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
const whiteList = process.env.FRONTEND_URL.split(',');

const corsOptions = {
    origin: function (origin, callback) {
        if (whiteList.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error("Acceso denegado"));
        }
    },
    credentials: true
};



//5) Swagger
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



//6) Configuración del servidor Express
//Middleware de análisis JSON
app.use(express.json())
//Middleware de análisis URL-encoded
app.use(express.urlencoded({ extended: true }))
//Middleware de cors
app.use(cors(corsOptions))
//Middleware de cookies
app.use(cookieParser(process.env.SIGNED_COOKIE))
//Middleware de sesiones
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
//Middleware de Swagger
app.use('/apidocs', swaggerUiExpress.serve, swaggerUiExpress.setup(specs)) //En qué ruta se va a ejecutar, y bajo qué condiciones
//Middlewares de archivos estáticos para las rutas que utilizan Multer
app.use('/uploads/documents', express.static(`${__dirname}/uploads/documents`));
app.use('/uploads/products', express.static(`${__dirname}/uploads/products`));
app.use('/uploads/profiles', express.static(`${__dirname}/uploads/profiles`));
//Middleware de enrutamiento principal
app.use('/', router)