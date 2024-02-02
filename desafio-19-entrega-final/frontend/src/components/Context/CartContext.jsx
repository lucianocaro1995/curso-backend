import React, { createContext, useState } from 'react';

export const CartContext = createContext();

const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]); // Aquí tienes tu carrito de productos
    const [cartItemCount, setCartItemCount] = useState(0); // Añade este estado para la cantidad total

    // Resto del código relacionado con el carrito (agregar, eliminar productos, etc.)

    const updateCartItemCount = (count) => {
        setCartItemCount(count);
    };

    return (
        <CartContext.Provider
            value={{
                cart,
                cartItemCount,
                updateCartItemCount,
                // Otros métodos y estados relacionados con el carrito
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export default CartProvider;
