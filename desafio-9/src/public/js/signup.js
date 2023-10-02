//Acá no utilizo socket.io



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
        //Se genera una solicitud POST usando fetch
        const response = await fetch('/api/sessions/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        });

        if (response.ok) {
            //Si la respuesta es una redirección, asumimos que el registro fue exitoso
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
            throw new Error(`Error: ${response.statusText}`);
        }
    } catch (error) {
        console.error('Hubo un error al registrar el usuario:', error);
        alert('Hubo un error al registrar. Inténtalo nuevamente.');
    } finally {
        submitButton.disabled = false; //Habilita el botón después de procesar la solicitud, ya sea con éxito o error.
    }
});
