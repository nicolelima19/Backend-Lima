import { cartModel } from "../dao/models/carts.js";

export const getCartByIdService = async (cid) => {
    try {
        return await cartModel.findById(cid).populate('products.id');
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

export const addProductInCartService = async (cid, pid) => {
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

export const deleteProductsInCartService = async (cid, pid) => {
    try {
        return await cartModel.findByIdAndUpdate(cid, { $pull: { 'products': { id: pid } } }, { new: true });
    } catch (error) {
        console.error('deleteProductInCartService', error);
        throw error;
    }
}

export const updateProductsInCartService = async (cid, pid, quantity) => {
    try {
        return await cartModel.findOneAndUpdate(
            { _id: cid, 'products.id': pid },
            { $set: { 'products.$.quantity': quantity } },
            { new: ture }
        );
    } catch (error) {
        console.error('updateProductInCartService', error);
        throw error;
    }
}

export const deleteCartService = async (cid) => {
    try {
        // return await cartModel.findByIdAndUpdate(cid, { $set: { 'products': [] } }, { new: true });
        return await cartModel.findByIdAndDelete(cid);
    } catch (error) {
        console.error('deleteProductInCartService', error);
        throw error;
    }
}