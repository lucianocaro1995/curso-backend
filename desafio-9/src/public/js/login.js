const login = document.getElementById("loginForm");

login.addEventListener('submit', async function(event) {
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
                email,
                password
            })
        });

        if (response.ok) {
            window.location.href = "/home";
        } else {
            const data = await response.json().catch(() => null);
            const errorMessage = data ? data.resultado : 'Hubo un error al intentar iniciar sesión';

            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: errorMessage
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
