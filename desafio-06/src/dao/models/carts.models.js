//Acá estoy creando una colección que va a aparecer en MongoDB Atlas con el nombre carts



import { Schema, model } from "mongoose";

//Array de lo que tenga el carrito
//El id nosotros lo creabamos como un número. Ahora lo genera automáticamente Mongodb Atlas no como un número, sino como un objectId 
const cartSchema = new Schema({
    products: {
        type: [
            {
                id_prod: {
                    type: Schema.Types.ObjectId,
                    ref: 'products',
                    required: true
                },
                quantity: {
                    type: Number,
                    required: true
                }
            }
        ],
        default: function () {
            return [];
        }
    }
}
)

export const cartModel = model('carts', cartSchema)