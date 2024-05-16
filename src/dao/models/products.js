import { Schema, model } from "mongoose";

const nameCollection = 'Products';

const productoSchema = new Schema({
    title: { type: String, required: [true, 'El título del producto es obligatorio.'] },
    description: { type: String, required: [true, 'La descripción del producto es obligatoria.'] },
    price: { type: Number, required: [true, 'El precio del producto es obligatorio.'] },
    code: { type: String, required: [true, 'El código del producto es obligatorio.'], unique: true },
    stock: { type: Number, required: [true, 'El stock del producto es obligatorio.'] }
});

productoSchema.set('toJSON', {
    transform: function(doc, ret) {
        delete ret.__v;
        return ret;
    }
});

export const productModel = model(nameCollection, productoSchema);
