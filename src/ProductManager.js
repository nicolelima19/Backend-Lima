import fs from 'fs';

class ProductManager {
    #products;
    #path;
    static idProduct = 0;

    constructor() {
        this.#path = './src/data/products.json';
        this.#products = this.#GetProducts();
    }

    #AssingId() {
        let id = 1;
        if (this.#products.length !== 0) {
            id = this.#products[this.#products.length - 1].id + 1;
        }
        return id;
    }

    #GetProducts() {
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
            fs.writeFileSync(this.#path, JSON.stringify(this.#products));
            console.log('Archivo de productos guardado exitosamente.');
        } catch (error) {
            console.error('Ocurrió un error al guardar el archivo de los products:', error);
        }
    }

    addProduct(title, description, price, code, stock, category, status = true) {
        
        if (!title || !description || !price || !code || !stock || !category) {
            return 'Todos los parametros son requeridos [title, description, price, thumbnail, code, stock, category]';
        }

        const codeRepetido = this.#products.some(product => product.code === code);
        if (codeRepetido) {
            return `El código ${code} ya se encuentra registrado en otro producto`;
        }

        ProductManager.idProduct = ProductManager.idProduct + 1;
        const id = this.#AssingId();

        const newProduct = {
            id,
            title,
            description,
            price,
            thumbnail,
            code,
            stock,
            category,
            status
        };
        this.#products.push(newProduct);
        this.#SaveFile();

        return "producto agregado correctamente";
    }

    getProducts(limit = 0) {
        limit = Number(limit);
        if(limit > 0)
            return this.#products.slice(0, limit);
        return this.#products;
    }

    getProductById(id) {
        let status = false;
        let resp = `El producto con id ${id} no existe.`;

        const product = this.#products.find(product => product.id == id);
        if (product) {
            status = true;
            resp = product
        } 

        return {status, resp}
    }

    updateProduct(id, updateObjets) {
        let mensaje = `El product ${id} no existe`;

        const index = this.#products.findIndex(p => p.id === id);

        if (index !== -1) {
            const { id, ...rest } = updateObjets;
            const propiedadesPermitidas = ["title", "description", "price", "thumbnails", "code", "stock", "category", "status"];
            const propiedadesActualizado = Object.keys(rest)
            .filter(propiedad => propiedadesPermitidas.includes(propiedad))
            .reduce((obj,key) => {
                obj[key] = rest[key];
                return obj;
            }, {});
            this.#products[index] = { ...this.#products[index], ...rest };
            this.#SaveFile();
            mensaje = 'producto actualizado';
        }

        return mensaje;
    }

    deleteProduct(id) {
        let mensaje = `El product con ${id} no existe`;

        const index = this.#products.findIndex(p => p.id === id);
        if (index !== -1) {
            this.#products = this.#products.filter(p => p.id !== id);
            this.#SaveFile();
            mensaje = 'product delete';
        }

        return mensaje;
    }
}

export default ProductManager;