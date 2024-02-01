import { useRef } from "react"
import { useNavigate } from "react-router-dom"
import { getCookiesByName } from "../../utils/formsUtils.js"
import Header from '../Header/Header'
import Footer from '../Footer/Footer'

const NewProductsForm = () => {
    const formRef = useRef(null)
    const navigate = useNavigate()

    const handleSumbit = async (e) => {
        e.preventDefault()
        const datForm = new FormData(formRef.current) //Tranformo un HTML en un objet iterator
        const data = Object.fromEntries(datForm)
        const token = getCookiesByName('jwtCookie')
        console.log(token)
        const response = await fetch('http://localhost:4000/api/products', {
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



            <section class="text-gray-400 bg-gray-900 body-font py-24">
                <div class="container px-1 mx-auto">
                    <div class="flex flex-col text-center w-full mb-12">
                        <h1 class="sm:text-3xl text-2xl font-medium title-font mb-1 text-gray-400">Agregar nuevo producto al inventario</h1>
                    </div>
                    <div class="max-w-md mx-auto">
                        <div class="mb-4">
                            <label for="product-name" class="block text-sm text-gray-400">Nombre</label>
                            <input type="text" id="product-name" name="product-name" class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-transparent focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                        </div>
                        <div class="mb-4">
                            <label for="product-description" class="block text-sm text-gray-400">Descripción</label>
                            <input type="text" id="product-description" name="product-description" class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-transparent focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                        </div>
                        <div class="mb-4">
                            <label for="product-category" class="block text-sm text-gray-400">Categoría</label>
                            <input type="text" id="product-category" name="product-category" class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-transparent focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                        </div>
                        <div class="mb-4">
                            <label for="product-code" class="block text-sm text-gray-400">Código</label>
                            <input type="text" id="product-code" name="product-code" class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-transparent focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                        </div>
                        <div class="mb-4">
                            <label for="product-price" class="block text-sm text-gray-400">Precio</label>
                            <input type="text" id="product-price" name="product-price" class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-transparent focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                        </div>
                        <div class="mb-4">
                            <label for="product-stock" class="block text-sm text-gray-400">Stock</label>
                            <input type="number" id="product-stock" name="product-stock" class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-transparent focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                        </div>
                        <div class="mb-4">
                            <label for="product-image" class="block text-sm text-gray-400">Imagen</label>
                            <input type="file" id="product-image" name="product-image" class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-transparent focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                        </div>
                        <div class="mb-4 text-center py-2">
                            <button class="text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">Agregar Producto</button>
                        </div>
                    </div>
                </div>
            </section>



            <Footer />
        </>
    )
}

export default NewProductsForm