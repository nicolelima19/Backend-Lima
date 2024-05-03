import { Router } from "express";
import { getProducts, getProductsById, addProduct, deleteProduct, updateProducts } from "../controllers/products.js";

const router = Router();

router.get('/', getProducts);
router.get("/:pid", getProductsById);
router.post('/', addProduct);
router.put("/:pid", updateProducts);
router.delete("/:pid", deleteProduct);

export default router;
