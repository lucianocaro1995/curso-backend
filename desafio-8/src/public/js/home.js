//Este archivo js lo utilizo junto con la lógica del socket.io
//Socket.io es una biblioteca de JavaScript que se utiliza para desarrollar aplicaciones web en tiempo real
//Su principal función es permitir la comunicación bidireccional en tiempo real entre el servidor y el cliente a través de WebSocket, una tecnología que habilita conexiones persistentes y de baja latencia



const socket = io.connect('http://localhost:4000');



//Muestro los productos en esta tabla. Debo refrescar la página para ver nuevos productos agregados, no es en tiempo real
socket.on('show-products', (products) => { //Evento personalizado show-products creado en app.js
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
socket.emit('update-products'); //Evento personalizado update-products creado en app.js



//Cargo los datos del usuario y muestro información personalizada en la página
window.onload = async() =>{
    response = await fetch('/api/sessions/user')
    user = await response.json()
    document.getElementById("bienvenido").innerHTML = `Bienvenido ${user.firstName}`
    document.getElementById("email").innerHTML = `Email: ${user.email}`
    document.getElementById("age").innerHTML = `Edad: ${user.age}`
}