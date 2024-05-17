import { request, response } from "express";
import { getProductsService } from "../services/productManager.js";
import { getCartByIdService } from "../services/carts.js";
import { getUserEmail, registerUser } from "../services/user.js";

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
    return res.render('login', { title: 'Login', styles: 'login.css' });
};

export const registerGet = async (req = response, res = response) => {
    return res.render('register', { title: 'Registro', styles: 'register.css' });
};

export const registerPost = async (req = response, res = response) => {
    const { password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
        console.log('Las constraseñas no coinciden');
        return res.redirect('/register')
    };

    const user = await registerUser({ ...req.body });

    if (user) {
        const userName = `${user.name} ${user.lastName}`;
        req.session.user = userName;
        req.session.rol = user.rol;
        console.log('User creado');
        return res.redirect('/');
    }

    return res.redirect('/register');
};

export const loginPost = async (req = response, res = response) => {
    const { email, password } = req.body;
    console.log({ email, password });

    const user = await getUserEmail(email);
    console.log({ user });

    if (user && user.password === password) {
        const userName = `${user.name} ${user.lastName}`;
        req.session.user = userName;
        req.session.rol = user.rol;
        return res.redirect('/');
    }

    return res.redirect('/login');
};

export const logout = async (req = response, res = response) => {
    req.session.destroy(error => {
        if (error)
            return res.send({ status: false, body: error })
        else
            return res.redirect('/login');
    });
};