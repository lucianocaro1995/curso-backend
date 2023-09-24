/*
IMPORTANTE: Debo ejecutar "npm run dev" en la terminal para poder ver el localhost:4000 en mi navegador
Para este desafío instalamos 1 dependencia:
Instalo paginación con: "npm i mongoose-paginate-v2"
La paginación nos permite segmentar los resultados en pequeños trozos de información, brindándonos una referencia de en qué página estamos, cuál es la página anterior y cuál es la siguiente
*/



//Módulos
import express from 'express';
import mongoose from 'mongoose';
//Rutas
import userRouter from './routes/users.routes.js'
import productRouter from './routes/products.routes.js'
import cartRouter from './routes/carts.routes.js'
import messageRouter from './routes/messages.routes.js'
import { userModel } from './dao/models/users.models.js' //Llamo a los usuarios y utilizo paginación/paginate
//Servidor
const PORT = 4000
const app = express()



//Conectar Mongodb Atlas con mi aplicación de visual studio code:
mongoose.connect('mongodb+srv://luciano1995:primerabasededatos@cluster0.azwpqmd.mongodb.net/?retryWrites=true&w=majority')
.then(async () => {
    console.log('Base de datos conectada');

    /*
    Paginate:
    En los paréntesis agregamos 2 filtros al paginate, separados con llaves
    Primer filtro: es un filtro de algún atributo, como el password de los usuarios
    Segundo filtro: tiene varias opciones a elegir, acá puse limit y sort (hay también page, populate, projection, etc)

    Parámetro limit: la cantidad de elementos por página
    Parámetro sort: ordenar los resultados de forma ascendente o descendente según un atributo dado, como la edad
    */
    const resultado = await userModel.paginate({ password: '1234' }, { limit: 20, page: 1, sort: { edad: 'asc' } });
    console.log(resultado);
})
.catch((error) => {
    console.log('Error al conectarse a la base de datos:', error);
});




//Para probar las rutas y cruds(create, read, update o up, delete) en Postman:
app.use(express.json())

app.use('/api/users', userRouter)
app.use('/api/products', productRouter)
app.use('/api/carts', cartRouter)
app.use('/api/messages', messageRouter)

app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`)
})