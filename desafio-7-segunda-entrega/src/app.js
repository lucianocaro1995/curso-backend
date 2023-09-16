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



//Conectar Mongodb Atlas con mi aplicación de visual studio code:
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