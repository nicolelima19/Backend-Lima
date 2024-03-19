const fs = require('fs');

class ProductManager {
    #products;
    #path;
    static idProducto = 0;

    constructor() {
        this.#path = './data/productos.json';
        this.#products = this.#obtenerProductos();
    }

    #asignarId() {
        let id = 1;
        if (this.#products.length !== 0) {
            id = this.#products[this.#products.length - 1].id + 1;
        }
        return id;
    }

    #obtenerProductos() {
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

    #guardarArchivo() {
        try {
            fs.writeFileSync(this.#path, JSON.stringify(this.#products));
            console.log('Archivo de productos guardado exitosamente.');
        } catch (error) {
            console.error('Ocurrió un error al guardar el archivo de los productos:', error);
        }
    }

    addProduct(title, description, price, thumbnail, code, stock) {
        if (!title || !description || !price || !thumbnail || !code || !stock) {
            return 'Todos los parametros son requeridos [title, description, price, thumbnail, code, stock]';
        }

        const codeRepetido = this.#products.some(producto => producto.code === code);
        if (codeRepetido) {
            return `El código ${code} ya se encuentra registrado en otro producto`;
        }

        ProductManager.idProducto = ProductManager.idProducto + 1;
        const id = this.#asignarId();

        const nuevoProducto = {
            id,
            title,
            description,
            price,
            thumbnail,
            code,
            stock,
        };
        this.#products.push(nuevoProducto);
        this.#guardarArchivo();

        return 'Producto agregado correctamente';
    }

    getProducts() {
        return this.#products;
    }

    getProductById(id) {
        const producto = this.#products.find(producto => producto.id == id);
        if (producto) {
            return producto;
        } else {
            return `Not found del producto con id ${id}`;
        }
    }

    updateProduct(id, updateObjets) {
        let mensaje = `El producto ${id} no existe`;

        const index = this.#products.findIndex(p => p.id === id);

        if (index !== -1) {
            const { id, ...rest } = updateObjets;
            this.#products[index] = { ...this.#products[index], ...rest };
            this.#guardarArchivo();
            mensaje = 'Producto actualizado';
        }

        return mensaje;
    }

    deleteProduct(id) {
        let mensaje = `El producto con ${id} no existe`;

        const index = this.#products.findIndex(p => p.id === id);
        if (index !== -1) {
            this.#products = this.#products.filter(p => p.id !== id);
            this.#guardarArchivo();
            mensaje = 'Producto eliminado';
        }

        return mensaje;
    }
}

module.exports = ProductManager;