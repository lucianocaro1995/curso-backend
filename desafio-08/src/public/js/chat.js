//Este archivo js lo utilizo junto con la lógica del socket.io
//Socket.io es una biblioteca de JavaScript que se utiliza para desarrollar aplicaciones web en tiempo real
//Su principal función es permitir la comunicación bidireccional en tiempo real entre el servidor y el cliente a través de WebSocket, una tecnología que habilita conexiones persistentes y de baja latencia



const socket = io.connect('http://localhost:4000')
const botonChat = document.getElementById("botonChat");
const parrafosMensajes = document.getElementById("parrafosMensajes");
const valueInput = document.getElementById("chatBox");
let userEmail;



Swal.fire({
    title: "Ingrese un usuario",
    text: "Por favor ingrese su usuario",
    input: "text",
    inputValidator: (valor) => {
        return !valor && "Ingrese un usuario correctamente";
    },
    allowOutsideClick: false,
}).then((resultado) => {
    userEmail = resultado.value;
    socket.emit("load-chat"); //Evento personalizado load-chat creado en app.js
});

botonChat.addEventListener('click', () => {
    let fechaActual = new Date().toLocaleString()

    if (valueInput.value.trim().length > 0) {
        socket.emit('add-message', { fecha: fechaActual, email: userEmail, mensaje: valueInput.value }) //Evento personalizado add-message creado en app.js
        valueInput.value = ""
    }
})

socket.on("show-messages", (arrayMensajes) => { //Evento personalizado show-messages creado en app.js
    parrafosMensajes.innerHTML = "";
    arrayMensajes.forEach((mensaje) => {
        parrafosMensajes.innerHTML += `<p>${mensaje.postTime}: el usuario ${mensaje.email} escribió ${mensaje.message} </p>`;
    });
});