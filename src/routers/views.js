import { Router } from "express";
import { 
    homeView, 
    realTimeProductsViews, 
    chatView, 
    productsView, 
    cartView, 
    loginGet, 
    registerGet,
    loginPost,
    registerPost,
    logout
} from "../controllers/views.js";
import { auth, admin } from "../middleware/auth.js";

const router = Router();


router.get('/', homeView);
router.get('/realTimeProducts', [auth, admin], realTimeProductsViews);
router.get('/chat', auth, chatView);
router.get('/products', auth, productsView);
router.get('/cart/:cid', auth, cartView);

router.get('/login', loginGet);
router.post('/login', loginPost);

router.get('/register', registerGet);
router.post('/register', registerPost);

router.get('/logout', logout);

export default router;
