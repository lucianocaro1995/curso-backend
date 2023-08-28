//Este código es Javascript con Socket.io

const socket = io.connect('http://localhost:8080')
const form = document.getElementById('addForm')
const botonProds = document.getElementById('botonProductos')
const removeform = document.getElementById('removeForm')



//Código para agregar un producto desde el formulario
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const datForm = new FormData(e.target); // Genera un objeto iterador
    const prod = Object.fromEntries(datForm); // Convierte el objeto iterable en un objeto simple
    console.log(prod);

    try {
        await socket.emit('nuevoProducto', prod);
        await socket.emit('update-products');
        console.log('Producto agregado exitosamente');
        e.target.reset();
    } catch (error) {
        console.error('No se pudo agregar el producto:', error);
    }
});



//POR QUÉ NO ME APARECE EN LA CONSOLA DEL NAVEGADOR QUE NO SE ENCONTRÓ EL ID CUANDO INGRESO UN ID QUE NO EXISTE?!
//Código para eliminar un producto
removeform.addEventListener('submit', async (e) => {
    e.preventDefault();
    const id = removeform.elements["id"].value;

    try {
        await socket.emit('remove-product', id);
        await socket.emit('update-products');
        console.log('Producto eliminado exitosamente');
        e.target.reset();
    } catch (error) {
        console.error('No se encontró un producto con ese ID:', error);
    }
});



//Tabla para ver en tiempo real los productos que tengo en la lista
socket.on('products-data', (products) => {
    const tableBody = document.querySelector("#productsTable tbody");
    let tableContent = '';
    if (products && Array.isArray(products)) {
        products.forEach(product => {
            tableContent += `
                <tr>
                    <td>${product.id}</td>
                    <td>${product.title}</td>
                    <td>${product.description}</td>
                    <td>${product.price}</td>
                    <td>${product.thumbnail}</td>
                    <td>${product.code}</td>
                    <td>${product.stock}</td>
                    <td>${product.status}</td>
                </tr>
            `;
        });
    } else {
        console.error('Productos no definidos o no es un array:', products);
    }
    tableBody.innerHTML = tableContent;
});


socket.emit('update-products');