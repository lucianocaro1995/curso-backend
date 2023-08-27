const socket = io();
const form = document.getElementById('idForm');
const botonProds = document.getElementById('botonProductos');

// Código del evento 'submit' para el formulario 'form'
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const datForm = new FormData(e.target);
    const prod = Object.fromEntries(datForm);
    console.log(prod);
    await socket.emit('nuevoProducto', prod);
    await socket.emit('update-products');
    e.target.reset();
});

// Código para ver la lista de productos
botonProds.addEventListener('click', () => {
    window.location.href = "http://localhost:8080/home";
});

socket.emit('update-products');
