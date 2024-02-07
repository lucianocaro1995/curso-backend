import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import { useAuth } from '../contexts/AuthContext';

const Cart = () => {
    const navigate = useNavigate();
    const { token } = useAuth();
    const [cartProducts, setCartProducts] = useState([]);
    const cartId = token ? token.cart : null; // Definir cartId aquí



    
    useEffect(() => {
        if (!cartId) {
            return;
        }

        const fetchCartProducts = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/carts/${cartId}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include',
                });

                if (!response.ok) {
                    throw new Error('Error al obtener los productos del carrito');
                }

                const data = await response.json();
                setCartProducts(data.mensaje.products || []);
                console.log('Productos obtenidos del carrito:', data.mensaje.products);
            } catch (error) {
                console.error('Error al obtener los productos del carrito:', error);
            }
        };

        fetchCartProducts();
    }, [cartId]);





    const handleDeleteProduct = async (productId) => {
        // DELETE: Eliminar un producto del carrito
        try {
            const response = await fetch(`http://localhost:3000/api/carts/${cartId}/product/${productId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
            });

            if (!response.ok) {
                throw new Error(`Error al eliminar el producto del carrito (${response.status})`);
            }

            // Actualizar la lista de productos eliminando el producto con productId
            setCartProducts(cartProducts.filter(product => product.id !== productId));
        } catch (error) {
            console.error('Error al eliminar producto del carrito', error);
        }
    };




    const handleClearCart = async () => {
        // DELETE: Limpiar el carrito
        try {
            const response = await fetch(`http://localhost:3000/api/carts/${cartId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
            });

            if (!response.ok) {
                throw new Error(`Error al limpiar el carrito (${response.status})`);
            }

            // Limpiar la lista de productos
            setCartProducts([]);
        } catch (error) {
            console.error('Error al limpiar el carrito', error);
        }
    };




    return (
        <>
            <Header />
            <h1>Carrito de Compras</h1>
            {cartProducts.map((product, index) => (
                <div key={index}>
                    <img src={`http://localhost:3000/uploads/products/${product.thumbnail}`} alt={product.title} />
                    <p>{product.title}</p>
                    <p>Categoría: {product.category}</p>
                    <p>Precio: ${product.price}</p>
                    <button onClick={() => handleDeleteProduct(product.id)}>Eliminar</button>
                </div>
            ))}
            <Footer />
        </>
    );
};

export default Cart;


