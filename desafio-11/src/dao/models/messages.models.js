//Acá estoy creando una colección que va a aparecer en MongoDB Atlas con el nombre messages



import { Schema, model } from "mongoose";

const getCurrentDate = () => {
    const now = new Date();
    const offset = now.getTimezoneOffset() * 60000; //Conversión a milisegundos
    const localDate = new Date(now.getTime() - offset);
    return localDate.toISOString().slice(0, 16).replace("T", " ");
};

const messagesSchema = new Schema({
    email:{
        type: String,
        required: true
    },
    message:{
        type: String,
        required: true
    },
    postTime: {
        type: String,
        default: getCurrentDate //Me devuelve algo así: "2023-09-16 14:30"
    }
})

export const messageModel = model('messages', messagesSchema)