import Header from '../Header/Header'
import Footer from '../Footer/Footer'

const UsersForm = () => {
    return (
        <>
            <Header />



            <section class="text-gray-400 bg-gray-900 body-font py-24">
                <div class="w-3/5 mx-auto px-0 md:px-12 lg:px-24 xl:px-32">
                    <div class="flex flex-col text-center w-full mb-12">
                        <h1 class="sm:text-3xl text-2xl font-medium title-font mb-1 text-gray-400">Lista de usuarios</h1>
                    </div>
                    <div class="mb-4 flex justify-between">
                        <button class="text-white bg-red-500 border-0 py-2 px-4 focus:outline-none hover:bg-red-600 rounded text-lg">Eliminar Usuarios</button>
                        <button class="text-white bg-red-500 border-0 py-2 px-4 focus:outline-none hover:bg-red-600 rounded text-lg">Eliminar Inactivos</button>
                    </div>
                    <ul>

                        <li class="flex items-center justify-between bg-gray-800 p-4 mb-2 rounded">
                            <div>
                                <span class="text-white">Nombre Usuario 1</span>
                                <br />
                                <span class="text-gray-500">correo1@example.com</span>
                            </div>
                            <button class="text-white bg-red-500 border-0 py-1 px-2 focus:outline-none hover:bg-red-600 rounded">Eliminar</button>
                        </li>

                        <li class="flex items-center justify-between bg-gray-800 p-4 mb-2 rounded">
                            <div>
                                <span class="text-white">Nombre Usuario 2</span>
                                <br />
                                <span class="text-gray-500">correo2@example.com</span>
                            </div>
                            <button class="text-white bg-red-500 border-0 py-1 px-2 focus:outline-none hover:bg-red-600 rounded">Eliminar</button>
                        </li>
                    </ul>
                </div>
            </section>



            <Footer />
        </>
    )
}

export default UsersForm