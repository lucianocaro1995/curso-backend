/*
alert("Hola, buenas tardes señor")


Swal.fire({
    icon: 'error',
    title: 'Oops...',
    text: 'Something went wrong!',
    footer: '<a href="">Why do I have this issue?</a>'
})


//El servidor(backend) de Socket.io lo cree en "app.js". Acá tengo que crear el cliente(frontend) de Socket.io
//Código hecho en clase para el "home"
//Apretón de manos
const socket = io()
//Mensaje de saludo. Este saludo se lo mando al servidor
socket.emit('mensajeConexion', { user: "Francisco", rol: "User" })
//Acá espero las credenciales de conexión. Me llega información y esa información la envío por la consola
socket.on('credencialesConexion', (info) => {
    console.log(info)
})
*/

//Código hecho en clase para practicar generando un chat
const socket = io()

const botonChat = document.getElementById('botonChat')
const parrafosMensajes = document.getElementById('parrafosMensajes')
const valInput = document.getElementById('chatBox')
let user

Swal.fire({
    title: "Identificacion de usuario",
    text: "Por favor ingrese su nombre de usuario",
    input: "text",
    inputValidator: (valor) => {
        //Si no ingresa su valor, que ingrese su nombre de usuario válido
        return !valor && "Ingrese su nombre de usuario valido"
    },
    //Que no pueda evitar la alerta
    allowOutsideClick: false
//Si me ingresan un resultado válido
}).then(resultado => {
    user = resultado.value
    console.log(user)
})

//Que suceda esto cuando me quieran enviar un mensaje
botonChat.addEventListener('click', () => {
    //Un chat utiliza usuario, hora y fecha
    let fechaActual = new Date().toLocaleString()

    //Verificación para que no ingresen un mensaje vacío
    if (valInput.value.trim().length > 0) {
        socket.emit('mensaje', { fecha: fechaActual, user: user, mensaje: valInput.value })
        //Limpio el input cuando se envia
        valInput.value = ""
        socket.on()
    }
})

//Código para poder recibir los mensajes enviados por el input y que se muestren en el navegador para que parezca un chat
socket.on('mensajes', (arrayMensajes) => {
    parrafosMensajes.innerHTML = ""
    arrayMensajes.forEach(mensaje => {
        parrafosMensajes.innerHTML += `<p>${mensaje.fecha}: el usuario ${mensaje.user} escribio ${mensaje.mensaje} </p>`
    })
})