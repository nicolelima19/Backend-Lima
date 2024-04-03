import express from "express";
import products from "./routers/product.js"
import cart from "./routers/cart.js"

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    return res.send('Hola Mundo')
});

app.use("/api/products", products);
app.use("/api/cart", cart);

app.listen(PORT, () => {
    console.log(`Corriendo aplicación en puerto ${PORT}`);
});


