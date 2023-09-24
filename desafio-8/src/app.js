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
4) Instalo
Nos permite
*/



//Módulos
import 'dotenv/config'
import express from 'express'
import mongoose from 'mongoose'
import cookieParser from 'cookie-parser'
import session from 'express-session'
//Rutas
import userRouter from './routes/users.routes.js'
import productRouter from './routes/products.routes.js'
import cartRouter from './routes/carts.routes.js'
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
    secret: process.env.SESSION_SECRET,
    //Resave permite mantener la sesión activa en caso de que la sesión se mantenga inactiva
    //Si se deja en false, la sesión morirá en caso de que exista cierto tiempo de inactividad
    resave: true,
    //saveUninitialized permite guardar cualquier sesión aún cuando el objeto de sesión no tenga nada por contener
    //Si se deja en false, la sesión no se guardará si el objeto de sesión está vacío al final de la consulta
    saveUninitialized: true
}))

//Verifico si el usuario es admin o no
const auth = (req, res, next) => {
    if (req.session.email == "admin@admin.com" && req.session.password == "1234") {
        next() //Continúa con la siguiente ejecución
    }
    res.send("No tenes acceso a esta ruta")
}

//Rutas
app.use('/api/users', userRouter)
app.use('/api/products', productRouter)
app.use('/api/carts', cartRouter)

//Genero una cookie en la ruta setCookie. Expira en 10 segundos, 10000 milisegundos
//Puedo ver las cookies en "inspeccionar" y luego la pestaña "application"
app.get('/setCookie', (req, res) => {
    res.cookie('NombreDeCookie', 'Esto es una cookie', { maxAge: 10000, signed: true }).send('Cookie generada')
})

//Me devuelve las cookies generadas
app.get('/getCookie', (req, res) => {
    res.send(req.signedCookies) //No me trae todas las cookies. Me trae solamente las cookies firmadas (las firmadas son más seguras)
})

//Endpoint /session que se guarda en una sesión de mi servidor, no en la base de datos. Y lleva un conteo de visitas
app.get('/session', (req, res) => {
    if (req.session.counter) {
        req.session.counter++
        res.send(`Ingreso ${req.session.counter} veces`)
    } else {
        req.session.counter = 1
        res.send('Ingreso por primera vez')
    }
})

app.get('/login', (req, res) => {
    const { email, password } = req.body

    req.session.email = email
    req.session.password = password
    console.log(req.session.email)
    console.log(req.session.password)
    res.send('Usuario logueado')

})

//auth es el middleware constante creado arriba para verificar si sos admin
app.get('/admin', auth, (req, res) => {
    res.send('Sos admin')
})

//Servidor
app.listen(PORT, () => {
    console.log(`Server on Port ${PORT}`)
})