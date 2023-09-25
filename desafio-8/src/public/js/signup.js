//Este archivo js lo utilizo junto con la lógica del socket.io
//Socket.io es una biblioteca de JavaScript que se utiliza para desarrollar aplicaciones web en tiempo real
//Su principal función es permitir la comunicación bidireccional en tiempo real entre el servidor y el cliente a través de WebSocket, una tecnología que habilita conexiones persistentes y de baja latencia



const socket = io.connect('http://localhost:4000');
const form = document.getElementById('signupForm');
const submitButton = document.getElementById('submitButton');



form.addEventListener('submit', async (event) => {
    event.preventDefault(); //Evita que el formulario se envíe de manera tradicional
    submitButton.disabled = true; //Deshabilita el botón mientras se procesa la solicitud

    //Recoge los valores del formulario
    const formData = {
        first_name: event.target.first_name.value,
        last_name: event.target.last_name.value,
        age: parseInt(event.target.age.value),
        email: event.target.email.value,
        password: event.target.password.value
    };

    try {
        socket.emit("new-user", formData); //Evento personalizado new-user creado en app.js

        socket.on("user", (data) => { //Evento personalizado user creado en app.js
            if (data.success) {
                Swal.fire({
                    title: '¡Registro exitoso!',
                    text: 'Serás redirigido a la página de inicio de sesión.',
                    icon: 'success',
                    confirmButtonText: 'Ok'
                }).then((result) => {
                    if (result.isConfirmed) {
                        window.location.href = '/login';
                    }
                });
            } else {
                alert(`Error: ${data.message}`);
            }
        });

        const response = await fetch('/api/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        });

        const data = await response.json();

        if (!response.ok) {
            alert(`Error: ${data.message}`);
        }
    } catch (error) {
        console.error('Hubo un error al registrar el usuario:', error);
        alert('Hubo un error al registrar. Inténtalo nuevamente.');
    } finally {
        submitButton.disabled = false; //Habilita el botón después de procesar la solicitud, ya sea con éxito o error.
    }
});
