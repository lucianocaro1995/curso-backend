const socket = io()
const form = document.getElementById('idForm')
const botonProds = document.getElementById('botonProductos')

//Con esto se hace un método POST con socket.io
form.addEventListener('submit', (e) => {
    e.preventDefault()
    const datForm = new FormData(e.target) //Me genera un objeto iterador
    const prod = Object.fromEntries(datForm) //De un objeto iterable genero un objeto simple
    socket.emit('nuevoProducto', prod)
    e.target.reset()
})

//Con esto se hace un método GET con socket.io
botonProds.addEventListener('click', () => {
    console.log("Hola")
    socket.on('prods', (prods) => {
        console.log(prods)
    })
})

//El botón "enviar" del formulario es el que ejecuta el método POST, y el botón "mostrar productos" ejecuta el método GET