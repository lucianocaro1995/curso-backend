//Acá estoy creando una colección que va a aparecer en MongoDB Atlas con el nombre users



//Genero los datos que yo necesito para trabajar con mi usuario
import { Schema, model } from 'mongoose';

//El schema va a ser la definición de mi usuario, va a caracterizar a mi usuario
//Primero trabajamos con usuarios. Luego con products y carts
const userSchema = new Schema({
    nombre: String,
    apellido: String,
    edad: Number,
    email: {
        type: String,
        unique: true //Que salte un error si intento crear 2 usuarios con el mismo mail
    },
    password: String
})

//Exporto una constante llamada userModel que va a ser igual al modelo de mi base de datos
//Parámetro 1: nombre de la colección - Parámetro 2: Schema
//Con estos 2 elementos voy a hacer un CRUD(Create, Read, Update, Delete) en MongoDb
export const userModel = model('users', userSchema)