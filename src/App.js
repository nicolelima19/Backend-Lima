import express from "express";
import { Server } from "socket.io";
import {engine} from "express-handlebars";

import __dirname from "./utils.js";

import products from "./routers/product.js";
import cart from "./routers/cart.js";
import views from "./routers/views.js";
import ProductManager from "./productManager.js";


const app = express();
const PORT = 8080;

const p = new ProductManager();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));


app.engine('handlebars', engine());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');


app.use('/', views);
app.use("/api/products", products);
app.use("/api/cart", cart);

const expressServer = app.listen(PORT, () => {console.log(`Corriendo aplicación en puerto ${PORT}`);});
const socketServer = new Server(expressServer);

socketServer.on ('connection', socket => {
    const productos = p.getProducts();
    socket.emit("productos", productos);

    socket.on("agregarProducto", producto => {
        console.log({producto});
        const result = p.addProduct(producto);
        console.log({result});
    });
});

