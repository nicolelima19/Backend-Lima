import { Schema, model } from "mongoose";

const nameCollection = 'Producto';

const productoSchema = new Schema({
    "title":{type:String, required: [true, 'El title del producto es obligatorio.']},
    "description":{type:String, required: [true, 'El description del producto es obligatorio.']},
    "price":{type:Number, required: [true, 'El price del producto es obligatorio.']},
    "code":{type:String , required: [true, 'El code del producto es obligatorio.'], unique: true},
    "stock":{type:Number, required: [true, 'El stock del producto es obligatorio.']}
});

productoSchema.set('toJSON', {
    transform: function(doc, ret){
        delete ret.__v;
        return ret;
    }
});

export const productModel = model(nameCollection, productoSchema);