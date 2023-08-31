//Este código es Javascript agregando Socket.io
/*
IMPORTANTE:
Este es el código del lado del cliente, no del servidor. Forma parte del código que verá el cliente en el navegador
Si quiero que me aparezcan mensajes en la consola del navegador (lado del cliente) debo hacer 3 cosas:
1) Ubicar return:false y return:true luego de cada console.log del ProductManager.js
2) Crear los mensajes (que aparecerán en la consola del navegador) en app.js con un socket.emit
3) Hacer un evento en realTimeProducts.js o home.js para escuchar esos mensajes traídos con un socket.emit
*/

const socket = io.connect('http://localhost:8080')
const addForm = document.getElementById('addForm')
const removeform = document.getElementById('removeForm')



//1) Evento para agregar un producto desde el formulario
addForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const title = document.getElementById('title-addform').value;
    const description = document.getElementById('description-addform').value;
    const category = document.getElementById('category-addform').value;
    const thumbnail = document.getElementById('thumbnail-addform').value;
    const price = parseFloat(document.getElementById('price-addform').value);
    const stock = parseInt(document.getElementById('stock-addform').value);
    const code = document.getElementById('code-addform').value;

    await socket.emit('nuevoProducto', {
        title: title,
        description: description,
        category: category,
        thumbnail: thumbnail,
        price: price,
        stock: stock,
        code: code
    });

    await socket.emit('actualizarProductos');
    event.target.reset();
});

//Evento para mostrar "Ya existe un producto con ese código"
socket.on('code-exists', (errorMessage) => {
    console.log(errorMessage);
});

//Evento para mostrar "Producto agregado exitosamente"
socket.on('product-added', (errorMessage) => {
    console.log(errorMessage);
});

//Evento para mostrar "Error al agregar producto"
socket.on('product-add-error', (errorMessage) => {
    console.log(errorMessage);
});



//2)Evento para eliminar un producto
removeform.addEventListener('submit', async (event) => {
    event.preventDefault();
    const id = parseInt(document.getElementById('id-removeform').value);
    await socket.emit('eliminarProducto', id);
    await socket.emit('actualizarProductos');
    event.target.reset();
});

//Evento para mostrar "Producto eliminado exitosamente"
socket.on('product-removed', (message) => {
    console.log(message);
});

//Evento para mostrar "No existe un producto con ese ID"
socket.on('product-not-found', (errorMessage) => {
    console.log(errorMessage);
});

//Evento para mostrar "Error al eliminar producto"
socket.on('product-remove-error', (errorMessage) => {
    console.log(errorMessage);
});




//3) Tabla para ver en tiempo real los productos que tengo en la lista
socket.on('products-data', (products) => {
    const tableBody = document.querySelector("#productsTable tbody");
    let tableContent = '';

    products && Array.isArray(products) && products.forEach(product => {
        tableContent += `
            <tr>
                <td>${product.status}</td>
                <td>${product.title}</td>
                <td>${product.description}</td>
                <td>${product.category}</td>
                <td>${product.thumbnail}</td>
                <td>${product.price}</td>
                <td>${product.stock}</td>
                <td>${product.code}</td>
                <td>${product.id}</td>
            </tr>
        `;
    });

    tableBody.innerHTML = tableContent;
});



socket.emit('actualizarProductos');