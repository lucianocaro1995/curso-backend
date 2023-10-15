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

//Evento para mostrar "No se pudo procesar la solicitud"
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

//Evento para mostrar "No se pudo procesar la solicitud"
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



//Solicitar la actualización de los productos al cargar la página
socket.emit('actualizarProductos');