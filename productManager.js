class ProductManager {
    #products;
    static idProducto = 0;

    constructor() {
        this.#products = [];
    }

    addProduct(title, description, price, thumbnail, code, stock) {

        if(!title || !description || !price || !thumbnail || !code || !stock)
        return 'Todos los parametros son requeridos [title, description, price, thumbnail, code, stock]'

        const codeRepetido = this.#products.some(producto => producto.code == code)
        if(codeRepetido)
        return 'El codigo ${code} ya se encuentra registrado en otro producto'

        ProductManager.idProducto = ProductManager.idProducto + 1;
        const id = ProductManager.idProducto;

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

        return 'Producto agregado correctamente';
    }

    getProducts() {
        return this.#products;
    }

    getProductById(id) {
        this.#products.find(producto => producto.id == id)
        if (producto)
            return producto;
        else
            return 'Not found del producto con id ${id}';
    }
}


module.exports = ProductManager;