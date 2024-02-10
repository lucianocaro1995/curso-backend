import { useRef } from "react"
import { useNavigate } from "react-router-dom"
import { getCookiesByName } from "../utils/formsUtils.js"
import Header from './Header'
import Footer from './Footer'

const URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";

const NewProductsForm = () => {
    const formRef = useRef(null)
    const navigate = useNavigate()

    const handleSumbit = async (e) => {
        e.preventDefault()
        const datForm = new FormData(formRef.current) //Tranformo un HTML en un objet iterator
        const data = Object.fromEntries(datForm)
        const token = getCookiesByName('jwtCookie')
        console.log(token)
        const response = await fetch(`${URL}/api/products`, {
            method: 'POST',
            headers: {
                'Authorization': `${token}`,
                'Content-type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        if (response.status == 200) {
            const datos = await response.json()
            console.log(datos)
        } else {
            const datos = await response.json()
            console.log(datos)
        }
    }

    return (
        <>
            <Header />



            <section className="text-gray-400 bg-gray-900 body-font py-24">
                <div className="container px-1 mx-auto">
                    <div className="flex flex-col text-center w-full mb-12">
                        <h1 className="sm:text-3xl text-2xl font-medium title-font mb-1 text-gray-400">Agregar nuevo producto al inventario</h1>
                    </div>
                    <div className="max-w-md mx-auto">
                        <div className="mb-4">
                            <label htmlFor="product-name" className="block text-sm text-gray-400">Nombre</label>
                            <input type="text" id="product-name" name="product-name" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-transparent focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="product-description" className="block text-sm text-gray-400">Descripción</label>
                            <input type="text" id="product-description" name="product-description" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-transparent focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="product-category" className="block text-sm text-gray-400">Categoría</label>
                            <input type="text" id="product-category" name="product-category" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-transparent focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="product-code" className="block text-sm text-gray-400">Código</label>
                            <input type="text" id="product-code" name="product-code" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-transparent focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="product-price" className="block text-sm text-gray-400">Precio</label>
                            <input type="text" id="product-price" name="product-price" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-transparent focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="product-stock" className="block text-sm text-gray-400">Stock</label>
                            <input type="number" id="product-stock" name="product-stock" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-transparent focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="product-image" className="block text-sm text-gray-400">Imagen</label>
                            <input type="file" id="product-image" name="product-image" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-transparent focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                        </div>
                        <div className="mb-4 text-center py-2">
                            <button className="text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">Agregar Producto</button>
                        </div>
                    </div>
                </div>
            </section>



            <Footer />
        </>
    )
}

export default NewProductsForm