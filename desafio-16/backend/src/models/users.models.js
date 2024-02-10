import { Schema, model } from "mongoose";
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
        required: false
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
        default: 'user',
        enum: ['user', 'premium']
    },
    discounts: {
        type: Number,
        default: 0
    },
    cart: {
        type: Schema.Types.ObjectId,
        ref: 'carts'
    },
    documents: [{
        name: String,
        reference: String
    }],
    last_connection: {
        type: Date,
        default: null,
        index: true
    }
})

userSchema.pre('save', async function (next) {
    try {
        const newCart = await cartModel.create({});
        this.cart = newCart._id;
        await newCart.save();
    } catch (error) {
        next(error);
    }
});

userSchema.methods.processPurchase = async function (totalPrice) {
    if (this.rol === 'premium') {
        const discountPercentage = 0.25;
        const discountAmount = totalPrice * discountPercentage;
        this.discounts += discountAmount;
        await this.save();
        return totalPrice - discountAmount;
    }
    return totalPrice;
}

export const userModel = model('users', userSchema)