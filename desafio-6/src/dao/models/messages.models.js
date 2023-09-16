//Acá yo estoy creando mi colección que va a aparecer en MongoDB Atlas con el nombre messages



import { Schema, model } from "mongoose";

const messagesSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    postTime: {
        type: Date,
        default: Date.now //Devuelve la fecha actual
    }
})

export const messageModel = model('messages', messagesSchema)