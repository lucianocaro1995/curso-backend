//Los archivos js de esta carpeta los utilizo para la lógica del socket.io
//Socket.io es una biblioteca de JavaScript que se utiliza para desarrollar aplicaciones web en tiempo real
//Su principal función es permitir la comunicación bidireccional en tiempo real entre el servidor y el cliente a través de WebSocket, una tecnología que habilita conexiones persistentes y de baja latencia


const socket = io();

const btnChat = document.getElementById("botonChat");
const parrafosMensajes = document.getElementById("parrafosMensajes");
const valueInput = document.getElementById("chatBox");

let userEmail;

Swal.fire({
    title: "Ingrese un usuario",
    text: "Por favor ingrese su usuario",
    input: "text",
    inputValidator: (valor) => {
        return !valor && "ingrese un usuario correctamente";
    },
    allowOutsideClick: false,
}).then((resultado) => {
    userEmail = resultado.value;
    socket.emit("loadChats");
});

btnChat.addEventListener("click", () => {
    if (valueInput.value.trim().length > 0) {
        socket.emit("newMessage", { email: userEmail, message: valueInput.value });
        valueInput.value = "";
        socket.on();
    }
});

socket.on("showMessages", (arrayMessages) => {
    parrafosMensajes.innerHTML = "";

    arrayMessages.forEach((element) => {
        parrafosMensajes.innerHTML += `
            <li class="liParrafosMensajes">
                <div class="spanContainer">
                    <p>${element.postTime}</p>
                    <p>${element.email}:</p>
                </div>
            <p class="userMessage">${element.message}
            </p>
            </li>
        `;
    });
});