import express from "express";
import { Server } from "socket.io";
import { engine } from "express-handlebars";

import __dirname from "./utils.js";

import products from "./routers/product.js";
import cart from "./routers/cart.js";
import views from "./routers/views.js";
import { dbConnection } from "./database/config.js";
import { productModel } from "./dao/models/products.js";

await dbConnection();

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));


app.engine('handlebars', engine());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');


app.use('/', views);
app.use("/api/products", products);
app.use("/api/cart", cart);

const expressServer = app.listen(PORT, () => { console.log(`Corriendo aplicación en puerto ${PORT}`); });
const io = new Server(expressServer);

io.on('connection', async (socket) => {
    const productos = await productModel.find();
    socket.emit("productos", productos);

    socket.on("agregarProducto", producto => {
        console.log({ producto });
        const result = productModel.create({ ...producto });
        if (result){
            productos.push(newProduct)
            socket.emit('productos', result.producto);
        }
    });
});

