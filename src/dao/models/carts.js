import { Schema, model } from "mongoose";

const nameCollection = 'Cart';

const cartSchema = new Schema({
    products: [{
        id: {
            type: Schema.Types.ObjectId,
            ref: 'Producto'
        },
        quantity: {
            type: Number,
            required: [true, 'La cantidad del producto es obligatorio.']
        }
    }]
});

cartSchema.set('toJSON', {
    transform: function(doc, ret){
        delete ret.__v;
        return ret;
    }
});

export const cartModel = model(nameCollection, cartSchema);