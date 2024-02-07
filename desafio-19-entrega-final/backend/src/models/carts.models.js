import { Schema, model } from "mongoose";

const cartSchema = new Schema({
    products: {
        type: [
            {
                _id: {
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

cartSchema.pre('findOne', function () {
    this.populate('products._id')
})

export const cartModel = model('carts', cartSchema)