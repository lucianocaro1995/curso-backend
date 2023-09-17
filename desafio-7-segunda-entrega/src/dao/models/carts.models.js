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
                    //En Postman debo poner {"quantity": 1} para que funcione agregar un producto al carrito
                }
            }
        ],
        default: function () {
            return [];
        }
    }
}
)

/*
Populate:
Esto se puede hacer en app.js o directamente acá en el schema (para que el método findOne siempre trabaje con populate)
Cuando me hagan una consulta findOne, me va a ejecutar el populate
Con el método find no va a funcionar porque no le puse que trabaje con populate, pero con findOne sí

¿Para qué se utiliza populate?
Facilita la obtención de información completa de los productos al buscar en los carritos
Entonces cada vez que hagan referencia al método findOne para buscar toda la información que tiene mi carrito, también te traigo la información de los productos
*/
cartSchema.pre('findOne', function () {
    this.populate('products.id_prod')
})

export const cartModel = model('carts', cartSchema)