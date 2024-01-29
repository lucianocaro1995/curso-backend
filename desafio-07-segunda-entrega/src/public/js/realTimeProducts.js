//Este archivo js lo utilizo junto con la lógica del socket.io
//Socket.io es una biblioteca de JavaScript que se utiliza para desarrollar aplicaciones web en tiempo real
//Su principal función es permitir la comunicación bidireccional en tiempo real entre el servidor y el cliente a través de WebSocket, una tecnología que habilita conexiones persistentes y de baja latencia



const socket = io.connect('http://localhost:4000')
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

    await socket.emit('add-product', { //Evento personalizado add-product creado en app.js
        title: title,
        description: description,
        category: category,
        thumbnail: thumbnail,
        price: price,
        stock: stock,
        code: code
    });

    await socket.emit('update-products'); //Evento personalizado update-products creado en app.js
    event.target.reset();
});



//2)Evento para eliminar un producto
removeform.addEventListener('submit', async (event) => {
    event.preventDefault();
    const code = document.getElementById('code-removeform').value;
    await socket.emit('remove-product', code); //Evento personalizado remove-product creado en app.js
    await socket.emit('update-products'); //Evento personalizado update-products creado en app.js
    event.target.reset();
});



//3) Tabla para ver en tiempo real los productos que tengo en la lista
socket.on('show-products', (products) => { //Evento personalizado show-products creado en app.js
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
socket.emit('update-products'); //Evento personalizado update-products creado en app.js