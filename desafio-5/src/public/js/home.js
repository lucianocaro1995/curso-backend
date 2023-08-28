//Este código es Javascript con Socket.io

const socket = io.connect('http://localhost:8080');



//Muestro los productos en esta tabla. Debo refrescar la página para ver nuevos productos agregados, no es en tiempo real
socket.on('products-data', (products) => {
    const tableBody = document.querySelector("#productsTable tbody");
    let tableContent = '';
    if (products && Array.isArray(products)) {
        products.forEach(product => {
            tableContent += `
                <tr>
                    <td>${product.title}</td>
                    <td>${product.description}</td>
                    <td>${product.category}</td>
                    <td>${product.thumbnail}</td>
                    <td>${product.price}</td>
                    <td>${product.stock}</td>
                    <td>${product.code}</td>
                    <td>${product.id}</td>
                    <td>${product.status}</td>
                </tr>
            `;
        });
    } else {
        console.error('Productos no definidos o no es un array:', products);
    }
    tableBody.innerHTML = tableContent;
});

//Solicitar la actualización de los productos al cargar la página
socket.emit('update-products');