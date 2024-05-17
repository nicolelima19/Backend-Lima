import express from "express";
import { Server } from "socket.io";
import { engine } from "express-handlebars";
import session from "express-session";
import MongoStore from "connect-mongo";
import "dotenv/config";

import products from "./routers/product.js";
import cart from "./routers/cart.js";
import views from "./routers/views.js";
import __dirname from "./utils.js";
import { dbConnection } from "./database/config.js";
import { messageModel } from "./dao/models/messages.js";
import { addProductService, getProductsService } from "./services/productManager.js";

await dbConnection();

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

app.use(session({
    store: MongoStore.create({
        mongoUrl: `${process.env.URI_MONGO_DB}/${process.env.NAME_DB}`,
        ttl: 3600
    }),
    secret: process.env.SECRET_SESSION,
    resave: true,
    saveUninitialized: true,
}));


app.engine('handlebars', engine());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');


app.use('/', views);
app.use("/api/products", products);
app.use("/api/cart", cart);

const expressServer = app.listen(PORT, () => { console.log(`Corriendo aplicación en puerto ${PORT}`); });
const io = new Server(expressServer);

io.on('connection', async (socket) => {
    console.log('Nuevo cliente conectado');

    const messages = await messageModel.find();
    socket.emit('messageLogs', messages);

    socket.on('message', async (data) => {
        try {
            const newMessage = await messageModel.create({ ...data });
            if (newMessage) {
                const allMessages = await messageModel.find();
                io.emit('messageLogs', allMessages); // Emitir a todos los clientes
            }
        } catch (error) {
            console.error('Error al crear un nuevo mensaje:', error);
        }
    });

    socket.broadcast.emit('new_user');
});
