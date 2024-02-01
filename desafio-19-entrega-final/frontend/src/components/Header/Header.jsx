import React from 'react';

const Header = ({ userLoginOn, token, logout }) => {
    return (
        <header className="text-gray-400 bg-slate-950 body-font">
            <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
                <a className="flex title-font font-medium items-center mb-4 md:mb-0" href="/">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        className="w-10 h-10 text-white p-2 bg-indigo-500 rounded-full"
                        viewBox="0 0 24 24"
                    >
                        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
                    </svg>
                    <span className="ml-3 text-xl text-gray-400 hover:text-white">BACKEND ecommerce</span>
                </a>
                <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
                    {userLoginOn && (
                        <h1 className="mr-5 text-cyan-900 font-semibold">
                            Bienvenido {token.user.first_name}
                        </h1>
                    )}
                    {!userLoginOn && (
                        <>
                            <a className="mr-5 text-gray-400 hover:text-white" href="/login">
                                Iniciar Sesión
                            </a>
                            <a className="mr-5 text-gray-400 hover:text-white" href="/register">
                                Registrarse
                            </a>
                        </>
                    )}
                    {userLoginOn && (
                        <>
                            <a className="mr-5 hover:text-gray-900" href="/cart">
                                Mi carrito
                            </a>
                            <a
                                className="mr-5 hover:text-gray-900"
                                href="/"
                                onClick={logout}
                            >
                                Cerrar sesión
                            </a>
                        </>
                    )}
                </nav>
            </div>
        </header>
    );
};

export default Header;
