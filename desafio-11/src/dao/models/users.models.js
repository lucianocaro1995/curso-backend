import { Schema, model } from "mongoose";
import paginate from 'mongoose-paginate-v2';
import { cartModel } from './carts.models.js'

const userSchema = new Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true,
        index: true
    },
    age: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    rol: {
        type: String,
        default: 'user'
    },
    //Cuando creo un nuevo usuario, creo un nuevo carrito asociado a ese usuario
    cart: {
        type: Schema.Types.ObjectId,
        ref: 'carts' //Nombre de colección
    }
})

//Implemento el método paginate en el schema
userSchema.plugin(paginate)

//Crear nuevo carrito
userSchema.pre('save', async function (next) {
    try {
        const newCart = await cartModel.create({})
        this.cart = newCart._id
    } catch (error) {
        next(error)
    }
})

//Parámetro 1:Nombre colección - Parámetro 2: Schema 
export const userModel = model('users', userSchema)