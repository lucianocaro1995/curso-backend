//Los archivos js de esta carpeta los utilizo para la lógica del socket.io
//Socket.io es una biblioteca de JavaScript que se utiliza para desarrollar aplicaciones web en tiempo real
//Su principal función es permitir la comunicación bidireccional en tiempo real entre el servidor y el cliente a través de WebSocket, una tecnología que habilita conexiones persistentes y de baja latencia


const socket = io.connect('http://localhost:4000')
const form = document.getElementById("form")

form.addEventListener('submit', (e) =>{
    e.preventDefault()
    const datForm = new FormData(e.target)
    const newUser = Object.fromEntries(datForm)
    console.log(newUser)
    socket.emit("new-user", newUser) //Evento personalizado new-user creado en app.js
})

socket.on('registered', (user) =>{ //Evento personalizado registered creado en app.js
    window.location.href = '/login'
})