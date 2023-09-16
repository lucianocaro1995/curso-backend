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

//Este código configura un middleware que se ejecuta antes de buscar en la colección "carts"
//La función "populate" reemplaza los ObjectId en el campo "products.id_prod" con los datos reales de los productos relacionados
//Esto facilita la obtención de información completa de los productos al buscar en los carritos
cartSchema.pre('findOne', function () {
    this.populate('products.id_prod')
})

export const cartModel = model('carts', cartSchema)