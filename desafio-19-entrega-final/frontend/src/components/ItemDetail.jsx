import React, { useState } from 'react';
import ItemCount from './ItemCount';
import { useAuth } from '../contexts/AuthContext';

const ItemDetail = ({ product }) => {
    const { _id, title, price, category, thumbnails, code, description, stock } = product;

    const thumbnailUrl = thumbnails && thumbnails.length > 0
        ? `http://localhost:3000/uploads/products/${thumbnails[0].name}`
        : '';

    const [cartQuantity, setCartQuantity] = useState(0);
    const { addToCart } = useAuth();

    // Definir constantes para cartId y productId
    const cartId = _id;  // Reemplaza con el ID correcto del carrito
    const productId = _id;

    // Función para manejar la actualización de la cantidad en el carrito
    const handleAddToCart = (quantity) => {
        // Realizar el fetch para descontar el stock
        fetch(`http://localhost:3000/api/carts/${cartId}/product/${productId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ quantity }),
        })
            .then(response => response.json())
            .then(data => {
                // Verificar si la respuesta fue exitosa antes de actualizar el estado
                if (data.success) {
                    addToCart(productId, quantity);
                    setCartQuantity(cartQuantity + quantity);
                } else {
                    console.error('Error al descontar el stock.');
                    // Puedes manejar el error de otra manera según tus necesidades
                }
            })
            .catch(error => {
                console.error('Error al realizar la solicitud:', error);
                // Puedes manejar el error de otra manera según tus necesidades
            });
    };

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
                    <p className="mb-4 mt-4">Precio: ${price.toFixed(2)}</p>
                    <p className="mb-4 mt-4">Stock: {stock}</p>
                    <div className="flex justify-between mt-4">
                        <div className="flex items-center">
                            <ItemCount stock={stock} onAddToCart={handleAddToCart} />
                        </div>
                        <button
                            onClick={() => handleAddToCart(1)} // Puedes ajustar la cantidad según tus necesidades
                            className="inline-flex text-gray-700 bg-gray-100 border-0 py-2 px-6 focus:outline-none hover:bg-gray-200 rounded text-lg"
                        >
                            Añadir al carrito
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ItemDetail;