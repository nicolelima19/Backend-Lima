import express from "express";
import { Server } from "socket.io";
import { engine } from "express-handlebars";
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


app.engine('handlebars', engine());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');


app.use('/', views);
app.use("/api/products", products);
app.use("/api/cart", cart);

const expressServer = app.listen(PORT, () => { console.log(`Corriendo aplicación en puerto ${PORT}`); });
const io = new Server(expressServer);

io.on('connection', async (socket) => {
    try {
        const { payload } = await getProductsService({});
        socket.emit("productos", payload);
        socket.on("agregarProducto", async (producto) => {
            const newProduct = await addProductService({ ...producto });
            if (newProduct) {
                const { payload: updatedProducts } = await getProductsService({});
                io.emit('productos', updatedProducts);
            }
        });
        const emitAllMessages = async () => {
            try {
                const messages = await messageModel.find();
                socket.emit('message', messages);
            } catch (error) {
                console.error('Error al obtener mensajes:', error);
            }
        };
        socket.on('message', async (data) => {
            try {
                const newMessage = await messageModel.create({ ...data });
                if (newMessage) {
                    emitAllMessages();
                }
            } catch (error) {
                console.error('Error al crear un nuevo mensaje:', error);
            }
        });
        socket.broadcast.emit('new_user');
        emitAllMessages();
    } catch (error) {
        console.error('Error en la conexión de Socket.IO:', error);
    }
});


