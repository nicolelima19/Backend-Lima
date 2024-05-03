import { request, response } from "express";
import { cartModel } from "../dao/models/carts.js";

export const getCartById = async (req = request, res = response) => {
    try {
        const { cid } = req.params;
        const carrito = await cartModel.findById(cid);

        if (carrito)
            return res.json({ carrito });

        return res.status(404).json({ msg: `El carrito con id ${cid} no existe.` });

    } catch (error) {
        console.error('getCartById', error);
        return res.status(500).json({ error: 'Error al obtener productos' });
    }
};

export const createCart = async (req = request, res = response) => {
    try {
        const carrito = await cartModel.create({});
        return res.json({ msg: `Carrito creado`, carrito });

    } catch (error) {
        console.error('createCart', error);
        return res.status(500).json({ error: 'Error al crear el carrito' });
    }
};

export const addProductInCart = async (req = request, res = response) => {
    try {
        const { cid, pid } = req.params;
        const carrito = await cartModel.findById(cid);

        if (!carrito)
            return res.status(404).json({ msg: `El carrito con el id ${cid} no existe!` })

        const productInCart = carrito.products.find(product => product.id.toString() === pid);

        if (productInCart)
            productInCart.quantity++;
        else
            carrito.products.push({ id: pid, quantity: 1 });
        carrito.save();

        return res.json({ msg: `Carrito actualizado!`, carrito });

    } catch (error) {
        console.error('addProductInCart', error);
        return res.status(500).json({ error: 'Error al añadir productos' });
    }
};