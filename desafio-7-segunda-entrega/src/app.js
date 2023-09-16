/*
IMPORTANTE: Debo ejecutar "npm run dev" en la terminal para poder ver el localhost:4000 en mi navegador

Para este desafío sólo vamos a practicar en utilizar una base de datos, así que nos vamos a olvidar de las vistas (handlebars) por el momento
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
import express from 'express';
import mongoose from 'mongoose';
//Rutas
import userRouter from './routes/users.routes.js'
import productRouter from './routes/products.routes.js'
import cartRouter from './routes/cart.routes.js'
import messageRouter from './routes/messages.routes.js'
//Servidor
const PORT = 4000
const app = express()



/*
Conectar Mongodb Atlas con mi aplicación de visual studio code:

Debo conseguir 2 cosas para lograr la conexión:
1) URL de mi base de datos
2) Contraseña de mi base de datos (no es la misma contraseña que utilizo para entrar a MongoDB Atlas) 
Para conseguir la URL hago lo siguiente:
En la página web de MongoDB Atlas clickeo la pestaña "database", clickeo "Connect", clickeo "Drivers" y se me va a abrir una ventana con mi URL
Debo modificar esa URL, pongo mi contraseña donde dice "<password>". Luego de entregar este desafío cambio la contraseña
En la línea 43 pego mi URL y contraseña

¿Cómo cambio mi contraseña?
Clickeo la pestaña "Database Access" y clickeo "Edit" sobre el usuario que desea cambiarle la contraseña
Cuando inicie la conexión con "npm run dev" me va a aparecer en la pestaña "browseCollections" la colección "users" que yo creé

¿Cómo accedo a las colecciones de mi base de datos?
Clickeo "database" y luego clickeo "browse collections"
*/
mongoose.connect('mongodb+srv://luciano1995:primerabasededatos@cluster0.azwpqmd.mongodb.net/?retryWrites=true&w=majority')
    .then(() => console.log('Base de datos conectada'))
    .catch(() => console.log('Error al conectarse a la base de datos'))





//Para probar las rutas y cruds(create, read, update o up, delete) en Postman:
app.use(express.json())

app.use('/api/users', userRouter)
app.use('/api/products', productRouter)
app.use('/api/carts', cartRouter)
app.use('/api/messages', messageRouter)

app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`)
})