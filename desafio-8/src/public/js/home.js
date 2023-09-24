//Los archivos js de esta carpeta los utilizo para la lógica del socket.io
//Socket.io es una biblioteca de JavaScript que se utiliza para desarrollar aplicaciones web en tiempo real
//Su principal función es permitir la comunicación bidireccional en tiempo real entre el servidor y el cliente a través de WebSocket, una tecnología que habilita conexiones persistentes y de baja latencia




const socket = io.connect('http://localhost:8080');



//Muestro los productos en esta tabla. Debo refrescar la página para ver nuevos productos agregados, no es en tiempo real
socket.on('products-data', (products) => {
    const tableBody = document.querySelector("#productsTable tbody");
    let tableContent = '';

    products = Array.isArray(products) ? products : [];

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

    tableBody.innerHTML = tableContent;
});



//Solicitar la actualización de los productos al cargar la página
socket.emit('actualizarProductos');