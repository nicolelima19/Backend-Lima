import { Schema, model } from "mongoose";

const nameCollection = 'Message';

const messageSchema = new Schema({
    user:{type:String, required:[true, 'El nombre del usuario es obligatorio.']},
    massage:{type:String, required:[true, 'El mensaje del usuario es obligatorio.']}
});

export const messageModel = model(nameCollection, messageSchema);