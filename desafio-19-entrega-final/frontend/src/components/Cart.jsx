import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import { useAuth } from '../contexts/AuthContext';

const URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";


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
                const response = await fetch(`${URL}/api/carts/${cartId}`, {
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
            } catch (error) {
                console.error('Error al obtener los productos del carrito:', error);
            }
        };

        fetchCartProducts();
    }, [cartId]);



    const handleDeleteProduct = async (productId) => {
        // DELETE: Eliminar un producto del carrito
        try {
            const response = await fetch(`${URL}/api/carts/${cartId}/product/${productId}`, {
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
            const response = await fetch(`${URL}/api/carts/${cartId}`, {
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

    const handleCheckout = () => {
        // Función de finalizar compra
        console.log('Finalizar compra');
        // Puedes agregar aquí el código para redirigir a la página de pago o realizar cualquier otra acción relacionada con el proceso de compra.
    };

    return (
        <>
            <Header />

            <div className="text-gray-400 bg-gray-900 body-font py-24">
                <div className="w-5/5 mx-auto px-0 md:px-12 lg:px-24 xl:px-32">
                    <div className="flex flex-col text-center w-full mb-12">
                        <h1 className="sm:text-3xl text-2xl font-medium title-font mb-1 text-gray-400">Productos en el carrito</h1>
                    </div>
                    <div className="mb-4 flex justify-between">
                        <button onClick={handleClearCart} className="text-white bg-red-500 border-0 py-2 px-4 focus:outline-none hover:bg-red-600 rounded text-lg">Eliminar Productos</button>
                        <button onClick={handleCheckout} className="text-white bg-green-500 border-0 py-2 px-4 focus:outline-none hover:bg-green-600 rounded text-lg">Finalizar compra</button>
                    </div>
                    <div>
                        {cartProducts && cartProducts.length > 0 ? (
                            cartProducts.map((cartProduct, index) => ( // Agregar index como segundo argumento
                                <div key={`${cartProduct._id}-${index}`} className="flex items-center justify-between bg-gray-800 p-4 mb-2 rounded">
                                    <div>
                                        {cartProduct._id && cartProduct._id.thumbnails && cartProduct._id.thumbnails.length > 0 && (
                                            <img src={`${URL}/uploads/products/${cartProduct._id.thumbnails[0].name}`} alt="Product Thumbnail" className="w-20 h-20 object-cover rounded" />
                                        )}
                                        <p className="text-white">{cartProduct._id && cartProduct._id.title}</p>
                                        <p className="text-gray-500">{cartProduct._id && cartProduct._id.category}</p>
                                        <p className="text-gray-400">${cartProduct._id && cartProduct._id.price}</p>
                                    </div>
                                    <button onClick={() => handleDeleteProduct(cartProduct._id)} className="text-white bg-red-500 border-0 py-1 px-2 focus:outline-none hover:bg-red-600 rounded">Eliminar</button>
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-400">No hay productos en el carrito.</p>
                        )}
                    </div>
                </div>
            </div>


            <Footer />
        </>
    );

};

export default Cart;