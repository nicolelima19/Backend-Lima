import { Router } from "express";
import { getProductsService } from "../services/productManager.js";

const router = Router();


router.get('/', async (req, res) => {
        const {payload} = await getProductsService({});
        return res.render('home', {productos:payload, styles: 'styles.css', title: 'Home'});
    });


router.get('/realtimeproducts', (req, res) => {
    return res.render('realTimeProducts');
});

router.get('/chat', (req, res) => {
    return res.render('chat');
});

export default router;
