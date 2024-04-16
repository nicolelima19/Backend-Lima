import fs from 'fs';
import ProductManager from "./productManager.js";

class CartManager {
    #cart;
    #path;
    static idProduct = 0;

    constructor() {
        this.#path = './src/data/carts.json';
        this.#cart = this.#GetCart();
    }

    #AssingIdCart() {
        let id = 1;
        if (this.#cart.length !== 0) {
            id = this.#cart[this.#cart.length - 1].id + 1;
        }
        return id;
    }

    #GetCart() {
        try {
            if (fs.existsSync(this.#path)) {
                const data = fs.readFileSync(this.#path, 'utf-8');
                return JSON.parse(data);
            }
            return [];
        } catch (error) {
            console.error('Ocurrió un error al obtener el archivo de los productos:', error);
            return [];
        }
    }

    #SaveFile() {
        try {
            fs.writeFileSync(this.#path, JSON.stringify(this.#cart));
            console.log('Archivo de productos guardado exitosamente.');
        } catch (error) {
            console.error('Ocurrió un error al guardar el archivo de los products:', error);
        }
    }

    getCartById(id) {
        const cart = this.#cart.find(cart => cart.id == id);
        if (cart) {
            return cart;
        } else {
            return `Not found del product con id ${id}`;
        }
    }

    updateProduct(id, updateObjets) {
        let mensaje = `El product ${id} no existe`;

        const index = this.#cart.findIndex(p => p.id === id);

        if (index !== -1) {
            const { id, ...rest } = updateObjets;
            const propiedadesPermitidas = ["title", "description", "price", "thumbnails", "code", "stock", "category", "status"];
            const propiedadesActualizado = Object.keys(rest)
                .filter(propiedad => propiedadesPermitidas.includes(propiedad))
                .reduce((obj, key) => {
                    obj[key] = rest[key];
                    return obj;
                }, {});
            this.#cart[index] = { ...this.#cart[index], ...rest };
            this.#SaveFile();
            mensaje = 'producto actualizado';
        }

        return mensaje;
    }

    deleteProduct(id) {
        let mensaje = `El product con ${id} no existe`;

        const index = this.#cart.findIndex(p => p.id === id);
        if (index !== -1) {
            this.#cart = this.#cart.filter(p => p.id !== id);
            this.#SaveFile();
            mensaje = 'product delete';
        }

        return mensaje;
    }

    createCart() {
        const newCart = {
            id: this.#AssingIdCart(),
            products: []
        };

        this.#cart.push(newCart);
        this.#SaveFile();

        return newCart;
    }

    addProductInCart(cid, pid) {

        let result = `El carrito con el id ${cid} no existe.`;
        const indexCarrito = this.#cart.findIndex(carrito => carrito.id === cid);

        if (indexCarrito !== -1) {
            const indexProductoInCart = this.#cart[indexCarrito].products.findIndex(p => p.id === pid);
            const p = new ProductManager();
            const producto = p.getProductById(pid);

            if (producto.status && indexProductoInCart === -1) {
                this.#cart[indexCarrito].products.push({ id: pid, "quantity": 1 });
                this.#SaveFile();
                result = "Producto agregado correctamente al carrito."
            } else if (producto.status && indexProductoInCart !== -1) {
                this.#cart[indexCarrito].products[indexProductoInCart].quantity;
                this.#SaveFile();
                result = "Producto agregado correctamente al carrito."
            }else {
                result = `El producto con id ${id} no existe.`
            }
        }

        return result;
    }
}

export default CartManager;