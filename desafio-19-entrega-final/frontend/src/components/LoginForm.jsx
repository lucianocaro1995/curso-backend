import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from './Header';
import Footer from './Footer';





const LoginForm = () => {
    const [error, setError] = useState(null);
    const formRef = useRef(null)
    const navigate = useNavigate()
    const handleSumbit = async (e) => {
        e.preventDefault()
        const datForm = new FormData(formRef.current)
        const data = Object.fromEntries(datForm)

        const response = await fetch('http://localhost:3000/api/session/login', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        if (response.status == 200) {
            const datos = await response.json()
            console.log(datos)
            document.cookie = `jwtCookie=${datos.token}; expires${new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toUTCString()};path=/;`
            navigate('/')
            window.location.reload(); // Recarga la página después de iniciar sesión
        } else {
            console.log(response)
        }
    }

    return (
        <>
            <Header />

            <section className="text-gray-400 bg-gray-900 body-font py-20">
                <div className="container px-5 py-24 mx-auto">
                    <form onSubmit={handleSumbit} ref={formRef}>
                        <div className="flex flex-col text-center w-full mb-12">
                            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-400">Iniciar sesión</h1>
                            <p className="lg:w-2/3 mx-auto leading-relaxed text-base">Si ya te registraste, inicia sesión en nuestra aplicación para poder comprar productos a precios increíbles. ¡Hacemos envíos a todo el país!</p>
                        </div>
                        <div className="flex lg:w-2/3 w-full sm:flex-row flex-col mx-auto px-8 sm:space-x-4 sm:space-y-0 space-y-4 sm:px-0 items-end">
                            <div className="relative flex-grow w-full">
                                <label htmlFor="email" className="leading-7 text-sm text-gray-400">Email</label>
                                <input type="email" id="email" name="email" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-transparent focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                            </div>
                            <div className="relative flex-grow w-full">
                                <label htmlFor="password" className="leading-7 text-sm text-gray-400">Contraseña</label>
                                <input type="password" id="password" name="password" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-transparent focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                            </div>
                            <button type="submit" className="text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">Iniciar</button>
                        </div>
                        {error && <p className="text-red-500 mt-2">{error}</p>}
                    </form>
                </div>
            </section>

            <Footer />
        </>
    );
};

export default LoginForm;