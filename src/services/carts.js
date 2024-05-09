import { cartModel } from "../dao/models/carts.js";

export const getCartByIdService = async (cid) => {
    try {
        return await cartModel.findById(cid);
    } catch (error) {
        console.error('getCartByIdService', error);
        throw error;
    }
};

export const createCartService = async () => {
    try {
        return await cartModel.create({});
    } catch (error) {
        console.error('createCartService', error);
        throw error;
    }
};

export const addProductInCartService = async ( cid, pid ) => {
    try {
        const carrito = await cartModel.findById(cid);

        if (!carrito)
            return null;

        const productInCart = carrito.products.find(product => product.id.toString() === pid);

        if (productInCart)
            productInCart.quantity++;
        else
            carrito.products.push({ id: pid, quantity: 1 });
        carrito.save();

        return carrito;

    } catch (error) {
        console.error('addProductInCartService', error);
        throw error;
    }
};