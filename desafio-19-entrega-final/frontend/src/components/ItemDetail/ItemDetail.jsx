import React, { useState } from 'react';

const ItemDetail = ({ item }) => {
    const [quantity, setQuantity] = useState(1);

    const handleIncrement = () => {
        setQuantity(quantity + 1);
    };

    const handleDecrement = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    const handleAddToCart = () => {
        // Lógica para agregar al carrito
        console.log(`Agregado ${quantity} ${item.title} al carrito`);
    };

    return (
        <div className="max-w-3xl mx-auto mt-8 p-4 bg-gray-800 rounded">
            <img src={item.image} alt={item.title} className="w-full h-64 object-cover mb-4 rounded" />
            <h2 className="text-2xl font-bold text-white mb-2">{item.title}</h2>
            <p className="text-gray-400 mb-2">{item.category}</p>
            <p className="text-gray-300 mb-4">{item.description}</p>
            <p className="text-indigo-500 font-semibold text-xl mb-4">${item.price}</p>
            <div className="flex items-center mb-4">
                <button onClick={handleDecrement} className="text-white bg-indigo-500 border-0 py-1 px-2 focus:outline-none hover:bg-indigo-600 rounded">-</button>
                <span className="mx-2 text-white">{quantity}</span>
                <button onClick={handleIncrement} className="text-white bg-indigo-500 border-0 py-1 px-2 focus:outline-none hover:bg-indigo-600 rounded">+</button>
            </div>
            <button onClick={handleAddToCart} className="text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">Agregar al carrito</button>
        </div>
    );
};

export default ItemDetail;