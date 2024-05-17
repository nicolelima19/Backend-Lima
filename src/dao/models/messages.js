import { Schema, model } from 'mongoose';

const messageSchema = new Schema({
    user: { type: String, required: [true, 'El usuario es obligatorio.'] },
    message: { type: String, required: [true, 'El mensaje del usuario es obligatorio.'] }
}, {
    timestamps: true
});

export const messageModel = model('Message', messageSchema);
