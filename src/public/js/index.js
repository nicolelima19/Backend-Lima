const socket = io();
console.log("Conexión con el socket establecida.")


socket.on("productos", productos => {
    const tbody = document.getElementById("productos-body");
    tbody.innerHTML = "";

    productos.forEach(producto => {
        const row = tbody.insertRow();

        row.innerHTML = `
            <td>${producto.id}</td>
            <td>${producto.title}</td>
            <td>${producto.description}</td>
            <td>${producto.price}</td>
            <td>${producto.code}</td>
            <td>${producto.stock ? 'Activo' : 'Desactivado'}</td>
            <td>${producto.thumbnails > 0 ? producto.thumbnails[0] : 'No hay imagen'}</td>`;
    });
});

const formulario = document.getElementById("producto-form");

formulario.addEventListener("submit", function (event) {
    event.preventDefault();

    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;
    const price = document.getElementById("price").value;
    const code = document.getElementById("code").value;
    const stock = document.getElementById("stock").value;
    const category = document.getElementById("category").value;

    const producto = {
        title: title,
        description: description,
        price: price,
        code: code,
        stock: stock,
        category: category
    };

    socket.emit("agregarProducto", producto);
    formulario.requestFullscreen();
});