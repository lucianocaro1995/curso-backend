//Este código es Javascript agregando Socket.io
/*
IMPORTANTE:
Este es el código del lado del cliente, no del servidor. Forma parte del código que verá el cliente en el navegador
Si quiero que me aparezcan mensajes en la consola del navegador (lado del cliente) debo hacer 3 cosas:
1) Ubicar return:false y return:true luego de cada console.log del ProductManager.js
2) Crear los mensajes (que aparecerán en la consola del navegador) en app.js con un socket.emit
3) Hacer un evento en realTimeProducts.js o home.js para escuchar esos mensajes traídos con un socket.emit
*/

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