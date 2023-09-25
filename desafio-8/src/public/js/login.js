//Acá no utilizo socket.io



//Evento para acceder utilizando email y contraseña
document.getElementById('loginForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;


    try {
        const response = await fetch('/api/sessions/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        });

        const data = await response.json();
        //console.log(data)

        if (response.status === 200 || response.status === 401 ) {
            console.log("llego hasta aca")
            window.location.href = "/home";
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: data.resultado
            });
        }

    } catch (error) {
        console.error(error);
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Hubo un error al intentar iniciar sesión'
        });
    }
});