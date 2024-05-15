import { query, request, response } from "express";
import { productModel } from "../dao/models/products.js";
import { addProductService, deleteProductService, getProductsByIdService, getProductsService } from "../services/productManager.js";

export const getProducts = async (req = request, res = response) => {
    try {
        const result = await getProductsService({ ...req.query });
        return res.json({ result });
    } catch (error) {
        return res.status(500).json({ msg: 'Error al obtener productos' })
    }
};

export const getProductsById = async (pid) => {
    try {
        const { pid } = req.params;
        const producto = await getProductsByIdService(pid);
        if (!producto)
            return res.status(404).json({ msg: `El producto con id ${pid} no existe!` })
        return res.json({ producto });
    } catch (error) {
        console.error('Error al obtener productos:', error);
        return res.status(500).json({ error: 'Error al obtener productos' });
    }
};

export const addProduct = async (req = request, res = response) => {
    try {
        const { title, description, price, code, stock } = req.body;

        if (!title || !description || !price || !code || !stock)
            return res.status(400).json({ msg: `Los campos [title, description, price, code, stock] son obligatorios.` });

        const producto = await addProductService({ ...req.body });
        return res.json({ producto });
    } catch (error) {
        return res.status(500).json({ error: 'Error al agregar productos' });
    }
};

export const updateProducts = async (req = request, res = response) => {
    try {
        const { pid } = req.params;
        const { _id, ...rest } = req.body;
        const producto = await productModel.findByIdAndUpdate(pid, { ...rest }, { new: true });

        if (producto)
            return res.json({ msg: `Producto acgtualizado.`, producto });
        return res.status(404).json({ msg: `EL porducto con id ${pid} no se pudo actualizar.` });

    } catch (error) {
        console.error('Error al actualizar productos:', error);
        return res.status(500).json({ error: 'Error al actualizar productos' });
    }
};

export const deleteProduct = async (req = request, res = response) => {
    try {
        const { pid } = req.params;
        const producto = await deleteProductService(pid);
        if (producto)
            return res.json({ msg: `Producto eliminado.`, producto });
        return res.status(404).json({ msg: `EL porducto con id ${pid} no se pudo eliminar.` });
    } catch (error) {
        console.error('Error al eliminar productos:', error);
        return res.status(500).json({ error: 'Error al eliminar productos' });
    }
};
