//Acá estoy creando una colección que va a aparecer en MongoDB Atlas con el nombre products



import { Schema, model } from "mongoose";
import paginate from 'mongoose-paginate-v2'

const productSchema = new Schema({
    status: {
        type: Boolean,
        default: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true,
        index: true
    },
    thumbnail: [],
    price: {
        type: Number,
        required: true
    },
    stock: {
        type: Number,
        required: true
    },
    code: {
        type: String,
        required: true,
        unique: true
    }
})

productSchema.plugin(paginate)

export const productModel = model('products', productSchema)