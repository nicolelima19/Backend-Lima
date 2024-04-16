import { Router } from "express";
import CartManager from "../cartManager.js";

const router = Router();

router.get("/:cid", (req, res) => {
    const {cid} = req.params;
    const carrito = new CartManager();
    const result = carrito.getCartById(Number(cid));
    return res.json(result);
});

router.post("/", (req, res) => {
    const carrito = new CartManager();
    const result = carrito.createCart();
    return res.json(result);
});

router.post("/:cid/product/:pid", (req, res) => {
    const {cid, pid} = req.params;
    const carrito = new CartManager();
    const result = carrito.addProductInCart(Number(cid), Number(pid));
    return res.json(result);
});

export default router;

