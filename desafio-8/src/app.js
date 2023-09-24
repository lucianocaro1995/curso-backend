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



//Módulos
import 'dotenv/config'
import express from 'express'
import mongoose from 'mongoose'
import cookieParser from 'cookie-parser'
import session from 'express-session'
import MongoStore from 'connect-mongo'
//Rutas
import userRouter from './routes/users.routes.js'
import productRouter from './routes/products.routes.js'
import cartRouter from './routes/carts.routes.js'
import sessionRouter from './routes/sessions.routes.js'
//Servidor
const app = express()
const PORT = 4000



//Base de datos
mongoose.connect(process.env.MONGO_URL)
    .then(async () => {
        console.log('BDD conectada')
    })
    .catch(() => console.log('Error en conexion a BDD'))



//Middlewares
app.use(express.json())
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



//Rutas
app.use('/api/users', userRouter)
app.use('/api/products', productRouter)
app.use('/api/carts', cartRouter)
app.use('/api/sessions', sessionRouter)

//Servidor
app.listen(PORT, () => {
    console.log(`Server on Port ${PORT}`)
})