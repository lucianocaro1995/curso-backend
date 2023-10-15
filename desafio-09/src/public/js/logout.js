//Acá no utilizo socket.io



const logout = document.getElementById("logoutButton")



logout.addEventListener("click", async ()=>{
    try {
        //Se genera una solicitud GET usando fetch
        await fetch('/api/sessions/logout', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })

        //Si el logout es exitoso te redirecciona a /login ya que cerraste sesión, sino te muestra error
        .then(response =>{
            if (response.ok){
                window.location.href = "/login";
            }
        })
        .catch(error=>{
            throw(error)
        })

    } catch (error) {
        console.error(error);
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Hubo un error al cerrar sesion'
        })
    }
})