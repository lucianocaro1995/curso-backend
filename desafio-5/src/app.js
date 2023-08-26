/*
IMPORTANTE: Debo ejecutar "npm run dev" en la terminal para poder ver el localhost:8080 en mi navegador
Para este desafío instalamos 3 dependencias:
Instalo multer con: "npm i multer" para poder subir imágenes a nuestro servidor. Ya que json no maneja imágenes
Instalo express-handlebars con: "npm i express-handlebars"
Instalo socket.io con: "npm i socket.io"
*/

//Importo módulos:
import express from 'express';
import multer from 'multer';
import { engine } from 'express-handlebars'; //Importamos lo que vamos a utilizar de handlebars y no todo el módulo
import { Server } from 'socket.io'; //Importo al servidor de Socket.io para poder utilizarlo
//Importo path:
import { __dirname } from './path.js';
import path from 'path';
//Importo rutas de mi aplicación:
import prodsRouter from './routes/products.routes.js';
import cartsRouter from './routes/carts.routes.js';
//Constantes del servidor:
const PORT = 8080
const app = express()



//Configuración de multer:
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        //Null hace referencia a que callback(cb) no devuelva errores. Pongo ruta donde quiero que se guarden las imágenes
        cb(null, 'src/public/img')
    },
    filename: (req, file, cb) => {
        //Concateno el nombre original de mi archivo con milisegundos con Date.now()
        cb(null, `${Date.now()}${file.originalname}`)
    }
})



//Inicializo el servidor y lo guardo en una constante:
//Antes tenía este código abajo de todo. Ahora con socket.io necesito inicializar antes de los middlewares y rutas
const serverExpress = app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`)
})



//Middlewares:
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/static', express.static(path.join(__dirname, '/public'))) //Path.join: unir rutas en una sola concatenandolas
const upload = multer({ storage: storage }) //Genero una constante que va a contener la configuración de multer
//Configuración de handlebars:
app.engine('handlebars', engine()) //Defino que motor de plantillas voy a utilizar y su config
app.set('view engine', 'handlebars') //Configuración de mi aplicación de handlebars
app.set('views', path.resolve(__dirname, './views')) //Path.resolve: resolver rutas absolutas a través de rutas relativas
//Servidos Socket.io
const io = new Server(serverExpress)
const mensajes = []
const prods = []



//Establezco la conexión con el servidor Socket.io
io.on('connection', (socket) => {
    console.log("Servidor Socket.io conectado")
    socket.on('mensajeConexion', (user) => {
        if (user.rol === "Admin") {
            socket.emit('credencialesConexion', "Usuario valido")
        } else {
            socket.emit('credencialesConexion', "Usuario no valido")
        }
    })

    //Los mensajes del chat los guardo en el array mensajes
    socket.on('mensaje', (infoMensaje) => {
        console.log(infoMensaje)
        mensajes.push(infoMensaje)
        //Socket.emit es como un return
        socket.emit('mensajes', mensajes)
    })

    //Los productos los guardo en el array prods
    socket.on('nuevoProducto', (nuevoProd) => {
        prods.push(nuevoProd)
        socket.emit('prods', prods)
    })
})



//Rutas:
app.use('/api/products', prodsRouter)
app.use('/api/carts', cartsRouter)
app.use('/static', express.static(path.join(__dirname, '/public')))

/*
//Voy a definir que la ruta static me muestre el contenido de handlebars
app.get('/static', (req, res) => {
    //El tutor va a poder ver los cursos después de haberse verificado. Puedo ponerle "Alumno" y no te va a dejar ver los cursos
    const user = {
        nombre: "Maria",
        cargo: "Tutor"
    }

    const cursos = [
        { numCurso: 123, dia: "S", horario: "Mañana" },
        { numCurso: 456, dia: "MyJ", horario: "Tarde" },
        { numCurso: 789, dia: "LyM", horario: "Noche" }
    ]
    //Defino que voy a utilizar "home.handlebars" y no "products.handlebars" u otra
    res.render('home', {
        user: user,
        //Defino que en el <link> del "main.handlebars" voy a utilizar este css
        css: "style.css",
        //Defino que en el <title> del "main.handlebars" voy a utilizar esta palabra
        title: "Home",
        //Verificación para saber si el usuario es tutor o no. Puedo ponerle "Alumno" y no te va a dejar ver los cursos
        esTutor: user.cargo === "Tutor",
        //Envío el array de cursos al motor de plantillas
        cursos: cursos
    })
})
*/

//Genero otra ruta static, pero esta vez utilizando "realTimeProducts" en vez de "home"
app.get('/static', (req, res) => {
    res.render('realTimeProducts', {
        css: "style.css",
        title: "Form",
        js: "realTimeProducts.js"
    })
})

//Genero una ruta para que se suban imágenes gracias a multer
app.post('/upload', upload.single('product'), (req, res) => {
    console.log(req.file)
    console.log(req.body)
    res.status(200).send("Imagen cargada")
})