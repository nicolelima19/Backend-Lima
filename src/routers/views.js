import { Router } from "express";
import { productModel } from '../dao/models/products.js';

const router = Router();


router.get('/', async (req, res) => {
    try {
        const productos = await productModel.find();
        return res.render('home', { productos });
    } catch (error) {
        console.error('Error al obtener productos:', error);
        return res.status(500).json({ error: 'Error al obtener productos' });
    }
});


router.get('/realtimeproducts', (req, res) => {
    return res.render('realTimeProducts');
});


export default router;
