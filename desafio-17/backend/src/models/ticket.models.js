//Acá estoy creando una colección que va a aparecer en MongoDB Atlas con el nombre tickets



import { Schema, model } from "mongoose";
import { v4 as uuidv4 } from 'uuid'; //Para generar un id único

const ticketSchema = new Schema(
    {
        code: {
            type: String,
            default: uuidv4()
        },
        purchase_datetime: {
            type: Date,
            default: Date.now
        },
        amount: {
            type: Number,
            required: true
        },
        purchaser: {
            type: String,
            required: true
        },
    },
    { versionKey: false }
);

export const ticketModel = model("tickets", ticketSchema);