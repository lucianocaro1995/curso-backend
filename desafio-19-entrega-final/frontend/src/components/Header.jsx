import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const Header = () => {
    const { token, logout } = useAuth();

    const renderUserButtons = () => (
        <>
            <Link to="/cart" className="mr-5 hover:text-pink-500">
                Mi carrito
            </Link>
            <Link to="/logout" className="mr-5 hover:text-pink-500">
                Cerrar sesión
            </Link>
        </>
    );

    const renderAdminButtons = () => (
        <>
            <Link to="/admin/users-form" className="mr-5 hover:text-pink-500">
                Ver usuarios
            </Link>
            <Link to="/admin/new-products" className="mr-5 hover:text-pink-500">
                Cargar productos
            </Link>
            <Link to="/logout" className="mr-5 hover:text-pink-500">
                Cerrar sesión
            </Link>
        </>
    );

    return (
        <header className="bg-slate-950 text-white">
            <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center h-40">
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
                    {token && (
                        <>
                            <h1 className="mr-5 text-pink-500 font-semibold">Bienvenido {token.first_name}</h1>
                            {token.rol === "user" || token.rol === "premium" ? renderUserButtons() : null}
                            {token.rol === "admin" ? renderAdminButtons() : null}
                        </>
                    )}
                    {!token && (
                        <>
                            <Link to="/login" className="mr-5 text-gray-400 hover:text-pink-500">
                                Iniciar Sesión
                            </Link>
                            <Link to="/register" className="mr-5 text-gray-400 hover:text-pink-500">
                                Registrarse
                            </Link>
                        </>
                    )}
                </nav>
            </div>
        </header>
    );
};

export default Header;