const ProductManager = require("./productManager");

const producto = new ProductManager();

/* console.log = producto.getProducts();
console.log(producto.getProductsById(1)); */

console.log(producto.addProduct('Consola PS5', 'PlayStation 5', 1200, 'https://f.fcdn.app/imgs/0aad68/www.covercompany.com.uy/coveuy/ebbc/original/catalogo/2-4549_11529_1/1500-1500/consola-sony-playstation-5-slim-digital-edition-1tb-ps5-blanco.jpg', '28897', '25'));

console.log(producto.getProducts());