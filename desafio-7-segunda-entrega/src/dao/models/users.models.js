//Acá estoy creando una colección que va a aparecer en MongoDB Atlas con el nombre users



//Genero los datos que yo necesito para trabajar con mi usuario
import { Schema, model } from 'mongoose';
//Paginación
import paginate from 'mongoose-paginate-v2'

//El schema va a ser la definición de mi usuario, va a caracterizar a mi usuario
//Primero trabajamos con usuarios. Luego con products y carts
const userSchema = new Schema({
    nombre: {
        type: String,
        required: true
    },
    apellido: {
        type: String,
        required: true,
        index: true
        //Me genera un index en la base de datos para los apellidos. ID y email ya tienen un index por tener atributo unique
        //Los index o índices se utilizan para mejorar las consultas y encontrar fácilmente el elemento solicitado
        //¿Cómo encuentro los índices de mis colecciones?
        //Clickeo database, clickeo browse collections, clickeo sobre alguna colección creada, clickeo indexes
    },
    edad: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        unique: true, //Que salte un error si intento crear 2 usuarios con el mismo mail
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

//Implementar el método paginate en el schema
userSchema.plugin(paginate)

//Exporto una constante llamada userModel que va a ser igual al modelo de mi base de datos
//Parámetro 1: nombre de la colección - Parámetro 2: Schema
//Con estos 2 elementos voy a hacer un CRUD(Create, Read, Update, Delete) en MongoDb
export const userModel = model('users', userSchema)