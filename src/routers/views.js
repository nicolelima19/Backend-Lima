import { Router } from "express";
import {
    homeView,
    realTimeProductsViews,
    chatView,
    productsView,
    cartView,
    loginGet,
    registerGet,
    registerPost,
    logout,
    login,
} from "../controllers/views.js";
import { auth, admin } from "../middleware/auth.js";
import passport from "passport";

const router = Router();

router.get('/', homeView);
router.get('/realTimeProducts', [auth, admin], realTimeProductsViews);
router.get('/chat', auth, chatView);
router.get('/products', auth, productsView);
router.get('/cart/:cid', auth, cartView);

router.get('/login', loginGet);
router.get('/register', registerGet);
router.get('/logout', logout);

router.post('/login', passport.authenticate('login', { failureRedirect: '/login' }), login);
router.post('/register', passport.authenticate('register', { failureRedirect: '/register' }), registerPost);

router.get('/github', passport.authenticate('github', { scope: ['user:email'] }));
router.get('/callbackGithub', passport.authenticate('github', { failureRedirect: '/register' }), (req, res) => {
    req.session.user = req.user;
    res.redirect('/');
});

export default router;
