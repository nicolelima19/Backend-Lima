import { request, response } from "express";
import { addProductInCartService, createCartService, deleteProductsInCartService, getCartByIdService, updateProductsInCartService } from "../services/carts.js";

export const getCartById = async (req, res) => {
    try {
        const { cid } = req.params;
        const carrito = await getCartByIdService(cid);
        if (carrito) {
            return res.json({ carrito });
        }
        return res.status(404).json({ msg: `El carrito con ID ${cid} no existe.` });
    } catch (error) {
        console.error('Error al obtener el carrito por ID:', error);
        return res.status(500).json({ error: 'Error interno del servidor' });
    }
};


export const createCart = async (req = request, res = response) => {
    try {
        const carrito = await createCartService();
        return res.json({ msg: 'Carrito creado', carrito });
    } catch (error) {
        return res.status(500).json({ error: 'Error al crear el carrito' });
    }
};

export const addProductInCart = async (req = request, res = response) => {
    try {
        const { cid, pid } = req.params;
        const carrito = await addProductInCartService(cid, pid);
        if (!carrito)
            return res.status(404).json({ msg: `El carrito con el id ${cid} no existe!` })

        return res.json({ msg: `Carrito actualizado!`, carrito });
    } catch (error) {
        return res.status(500).json({ error: 'Error al añadir productos' });
    }
};

export const deleteProductsInCart = async (req = request, res = response) => {
    try {
        const { cid, pid } = req.params;
        const carrito = await deleteProductsInCartService(cid, pid);
        if (!carrito)
            return res.status(404).json({ msg: 'No se pudo realizar la opereación.' });
        return res.json({ msg: 'PRoducto eliminado del carrito.', carrito })
    } catch (error) {
        return res.status(500).json({ error: 'Error al añadir productos.' });
    }
}

export const updateProductsInCart = async (req = request, res = response) => {
    try {
        const { cid, pid } = req.params;
        const { quantity } = req.body;

        if(quantity || !Number.isInteger(quantity))
            return res.status(404).json({msg: 'La propiedad quantity es obligatoria y debe de ser un número entero.'})

        const carrito = await updateProductsInCartService(cid, pid, quantity);
        if (!carrito)
            return res.status(404).json({ msg: 'No se pudo realizar la opereación.' });
        return res.json({ msg: 'El producto se ha actualizado en el carrito.', carrito })
    } catch (error) {
        return res.status(500).json({ error: 'Error al añadir productos.' });
    }
}

export const deleteCart = async (req = request, res = response) => {
    try {
        const { cid } = req.params;
        const carrito = await updateProductsInCartService(cid, pid, quantity);
        if (carrito)
            return res.status(404).json({ msg: 'No se pudo realizar la opereación.' });
        return res.json({ msg: 'El producto se ha actualizado en el carrito.', carrito })
    } catch (error) {
        return res.status(500).json({ error: 'Error al añadir productos.' });
    }
}