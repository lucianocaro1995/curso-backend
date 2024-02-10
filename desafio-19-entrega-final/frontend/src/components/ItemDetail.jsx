import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import ItemCount from './ItemCount'

const URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";

const ItemDetail = ({ product, onAddToCart }) => {
    const { title, category, thumbnails, description, stock, price } = product;
    const { token } = useAuth();

    const thumbnailUrl = thumbnails && thumbnails.length > 0
        ? `${URL}/uploads/products/${thumbnails[0].name}`
        : '';

    const renderUser = () => (
        <div className="flex items-center">
            <ItemCount stock={stock} onAddToCart={onAddToCart} />
        </div>
    );

    const renderAdmin = () => null; // No muestra nada para el administrador

    return (
        <section className="text-white body-font bg-slate-900">
            <div className="container mx-auto flex flex-col md:flex-row items-center px-5 py-24">
                <div className="lg:w-1/3 md:w-1/2 w-full mb-10 md:mb-0">
                    <img className="object-cover object-center rounded w-full h-full" alt={title} src={thumbnailUrl} />
                </div>
                <div className="lg:flex-grow md:w-1/2 lg:pl-24 md:pl-16 flex flex-col md:items-start md:text-left items-center text-center">
                    <h1 className="title-font sm:text-4xl text-3xl mb-4 mt-4 font-medium">{title}</h1>
                    <p className="mb-4 mt-4 leading-relaxed">Categoría: {category}</p>
                    <p className="mb-4 mt-4 leading-relaxed">Descripción: {description}</p>
                    <p className="mb-4 mt-4">Precio: {price}</p>
                    <p className="mb-4 mt-4">Stock: {stock}</p>
                    {token && (token.rol === 'user' || token.rol === 'premium') ? renderUser() : null}
                    {token && token.rol === 'admin' ? renderAdmin() : null}
                </div>
            </div>
        </section>
    );
};

export default ItemDetail;