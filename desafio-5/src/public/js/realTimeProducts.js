//Este código es Javascript con Socket.io

const socket = io.connect('http://localhost:8080')
const addForm = document.getElementById('addForm')
const removeform = document.getElementById('removeForm')



//Código para agregar un producto desde el formulario
addForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const datForm = new FormData(e.target); // Genera un objeto iterador
    const prod = Object.fromEntries(datForm); // Convierte el objeto iterable en un objeto simple
    await socket.emit('nuevoProducto', prod);
    await socket.emit('update-products');
    e.target.reset();
});



//Código para eliminar un producto
removeform.addEventListener('submit', async (e) => {
    e.preventDefault();
    const id = removeform.elements["id"].value;
    await socket.emit('remove-product', id);
    await socket.emit('update-products');
    e.target.reset();
});



//Tabla para ver en tiempo real los productos que tengo en la lista
socket.on('products-data', (products) => {
    const tableBody = document.querySelector("#productsTable tbody");
    let tableContent = '';
    if (products && Array.isArray(products)) {
        products.forEach(product => {
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
    } else {
        console.error('Productos no definidos o no es un array:', products);
    }
    tableBody.innerHTML = tableContent;
});


socket.emit('update-products');