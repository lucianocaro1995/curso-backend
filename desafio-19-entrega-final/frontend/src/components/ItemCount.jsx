import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from '../contexts/AuthContext';

const ItemCount = ({ stock, onAddToCart }) => {
    const [selectedQuantity, setSelectedQuantity] = useState(1);
    const { token } = useAuth(); // Obtener el contexto de autenticación
    const navigate = useNavigate(); // Importar useNavigate desde 'react-router-dom'

    const incrementarStock = () => {
        if (selectedQuantity < stock) {
            setSelectedQuantity(prevQuantity => prevQuantity + 1);
        }
    };

    const decrementarStock = () => {
        if (selectedQuantity > 1) {
            setSelectedQuantity(prevQuantity => prevQuantity - 1);
        }
    };

    const handleAddToCart = () => {
        if (token) {
            // Si el usuario ha iniciado sesión, llamar a la función onAddToCart con la cantidad seleccionada
            onAddToCart(selectedQuantity);
        } else {
            // Si el usuario no ha iniciado sesión, redirigir a la página de inicio de sesión
            console.log("Redirigiendo a la página de inicio de sesión");
            navigate('/login'); // Redirigir a la ruta /login
            window.scrollTo(0, 0);
        }
    };

    return (
        <div>
            <div>
                <button onClick={decrementarStock}>-</button>
                <div>{selectedQuantity}</div>
                <button onClick={incrementarStock}>+</button>
            </div>
            <div>
                {token ? (
                    <button onClick={() => handleAddToCart(selectedQuantity)}>Agregar producto al carrito</button>
                ) : (
                    <button onClick={handleAddToCart}>Iniciar sesión</button>
                )}
            </div>
        </div>
    );
};

export default ItemCount;