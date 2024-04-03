import { Router } from "express";
import ProductManager from "../ProductManager.js";

const router = Router();
const productManager = new ProductManager();

router.get('/', (req, res) => {
    const { limit } = req.query;
    try {
        const products = productManager.getProducts(limit);
        return res.json({ products });
    } catch (error) {
        console.error('Error al obtener productos:', error);
        return res.status(500).json({ error: 'Error al obtener productos' });
    }
});

router.get("/:pid", (req, res) => {
    const { pid } = req.params;
    try {
        const product = productManager.getProductById(Number(pid));
        return res.json({ product });
    } catch (error) {
        console.error('Error al obtener producto por ID:', error);
        return res.status(500).json({ error: 'Error al obtener producto por ID' });
    }
});

router.post('/', (req, res) => {
    const { title, description, price, thumbnails, code, stock, category, status } = req.body;
    try {
        const result = productManager.addProduct(title, description, price, thumbnails, code, stock, category, status);
        return res.json({ result });
    } catch (error) {
        console.error('Error al agregar producto:', error);
        return res.status(400).json({ error: error.message });
    }
});

router.put("/:pid", (req, res) => {
    const { pid } = req.params;
    try {
        const result = productManager.updateProduct(Number(pid), req.body);
        return res.json({ result });
    } catch (error) {
        console.error('Error al actualizar producto:', error);
        return res.status(400).json({ error: error.message });
    }
});

router.delete("/:pid", (req, res) => {
    const { pid } = req.params;
    try {
        const result = productManager.deleteProduct(Number(pid));
        return res.json({ result });
    } catch (error) {
        console.error('Error al eliminar producto:', error);
        return res.status(400).json({ error: error.message });
    }
});

export default router;
