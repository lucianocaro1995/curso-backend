//Acá no utilizo socket.io



const login = document.getElementById("loginForm")



login.addEventListener('submit', async function(event) {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        //Se genera una solicitud POST usando fetch
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

        //Si el login es exitoso te redirecciona a /home, sino te muestra error
        if (response.status === 200 || response.status === 401 ) {
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