import { request, response } from "express";
import { getProductsService } from "../services/productManager.js";
import { getCartByIdService } from "../services/carts.js";

export const homeView = async (req = response, res = response) => {
    const { payload } = await getProductsService({});
    const user = req.session.user; 

    return res.render('home', { productos: payload, styles: 'styles.css', user });
};

export const realTimeProductsViews = async (req = request, res = response) => {
    return res.render('realTimeProducts', { title: 'Real Time', styles: 'realTimeProducts.css' });
};

export const chatView = async (req = response, res = response) => {
    const user = req.session.user;
    return res.render('chat', { title: 'Chat', styles: 'chat.css', user });
};

export const productsView = async (req = response, res = response) => {
    const result = await getProductsService({ ...req.query });
    const user = req.session.user;
    return res.render('products', { title: 'Productos', result, styles: 'products.css', user});
};

export const cartView = async (req = response, res = response) => {
    const { cid } = req.params;
    const carrito = await getCartByIdService(cid);
    const user = req.session.user;
    return res.render('cart', { title: 'carrito', carrito, styles: 'cart.css', user});
};

export const loginGet = async (req = response, res = response) => {

    if(req.session.user)
        return res.redirect('/');

    return res.render('login', { title: 'Login', styles: 'login.css' });
};

export const registerGet = async (req = response, res = response) => {

    if(req.session.user)
        return res.redirect('/');

    return res.render('register', { title: 'Registro', styles: 'register.css' });
};

export const registerPost = async (req, res) => {
    if (req.user) {
        return res.redirect('/register');
    }
    return res.redirect('/login');
};


export const login = async (req, res) => {    
    if(!req.user)
        return res.redirect('/login');

    req.session.user = {
        name: user.name,
        lastName: user.lastName,
        email: user.email,
        rol: user.rol
    };

    return res.redirect('/');
};

export const logout = async (req = response, res = response) => {
    req.session.destroy(error => {
        if (error)
            return res.send({ status: false, body: error })
        else
            return res.redirect('/login');
    });
};
