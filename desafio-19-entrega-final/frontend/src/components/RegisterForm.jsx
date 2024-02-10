import { useRef } from "react"
import { useNavigate } from "react-router-dom"
import Header from './Header'
import Footer from './Footer'

const URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";

const RegisterForm = () => {

    const formRef = useRef(null)
    const navigate = useNavigate()

    const handleSumbit = async (e) => {
        e.preventDefault()
        const datForm = new FormData(formRef.current) //Tranformo un HTML en un object iterator
        const data = Object.fromEntries(datForm)
        const response = await fetch(`${URL}/api/session/register`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        if (response.status === 200) {
            const datos = await response.json()
            console.log(datos)
            navigate('/login')
            window.location.reload()
        } else {
            console.log(response)
        }
    }
    return (
        <>
            <Header />
            <section className="text-gray-400 bg-gray-900 body-font py-24">
                <div className="container px-1 mx-auto">
                    <div className="flex flex-col text-center w-full mb-12">
                        <h1 className="sm:text-3xl text-2xl font-medium title-font mb-1 text-gray-400">Registro de Usuario</h1>
                    </div>
                    <form onSubmit={handleSumbit} ref={formRef}>
                        <div className="max-w-md mx-auto">
                            <div className="mb-4">
                                <label htmlFor="full-name" className="block text-sm text-gray-400">Nombre</label>
                                <input type="text" id="full-name" name="first_name" autoComplete="on" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-transparent focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="last-name" className="block text-sm text-gray-400">Apellido</label>
                                <input type="text" id="last-name" name="last_name" autoComplete="on" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-transparent focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="age" className="block text-sm text-gray-400">Edad</label>
                                <input type="number" id="age" name="age" autoComplete="on" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-transparent focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="email" className="block text-sm text-gray-400">Correo Electrónico</label>
                                <input type="email" id="email" name="email" autoComplete="on" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-transparent focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="password" className="block text-sm text-gray-400">Contraseña</label>
                                <input type="password" id="password" name="password" autoComplete="on" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-transparent focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                            </div>
                            <div className="mb-4 text-center py-2">
                                <button type="submit" className="text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">Registrarse</button>
                            </div>
                        </div>
                    </form>
                </div>
            </section>
            <Footer />
        </>
    )
}

export default RegisterForm