import Express from "express";
import ProductManager from "./ProductManager.js";

const app = Express();
const PORT = 8080;

app.get("/products", (req, res) => {
    const { limit } = req.query;
    const p = new ProductManager();
    return res.json({ products: p.getProducts(limit) });
});

app.get("/products/:id", () => {
    const { pid } = req.params;
    const p = new ProductManager();
    return res.json({product: p.getProductById(Number(pid))});
});

app.listen(PORT, () => {
    console.log(`Corriendo aplicación en puerto ${PORT}`);
});


