import express from "express";
import { Server } from "socket.io";
import {engine} from "express-handlebars";

import __dirname from "./utils.js";

import products from "./routers/product.js"
import cart from "./routers/cart.js"


const app = express();
const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

app.engine('handlebars', engine());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');

app.get('/', (req, res) => {
    return res.render('home');
});

app.use("/api/products", products);
app.use("/api/cart", cart);

const expressServer = app.listen(PORT, () => {console.log(`Corriendo aplicación en puerto ${PORT}`);});
const socketServer = new Server(home.handlebars);

socketServer.on ('connection', socket => {
    console.log("Cleinte conectado");
});



