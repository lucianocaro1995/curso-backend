//Este código es Javascript con Socket.io

const socket = io();
const tableBody = document.querySelector("#productsTable tbody");



//Código para mostrar los productos en la tabla
socket.on('products-data', (products) => {
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
                    <td>
                        <button class="removeButton" data-product-id="${product.id}">Eliminar producto</button>
                    </td>
                </tr>
            `;
        });
    } else {
        console.error('Productos no definidos o no es un array:', products);
    }
    tableBody.innerHTML = tableContent;
});

//Manejo de eventos para eliminar productos
tableBody.addEventListener('click', (event) => {
    if (event.target.classList.contains('removeButton')) {
        const productId = event.target.getAttribute('data-product-id');
        socket.emit('remove-product', productId);
    }
});

//Iniciar la solicitud de datos de productos
socket.emit('update-products');
