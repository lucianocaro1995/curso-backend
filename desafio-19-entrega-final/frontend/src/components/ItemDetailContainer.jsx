import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import ItemDetail from './ItemDetail';

const ItemDetailContainer = () => {
    const { _id } = useParams();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        const fetchProductDetails = async () => {
            try {
                if (!_id) {
                    return; // No hay _id definido, puedes manejar esto según tus necesidades
                }

                const response = await fetch(`http://localhost:3000/api/products/${_id}`, {
                    method: 'GET',
                    headers: {
                        'Content-type': 'application/json'
                    },
                });

                if (!response.ok) {
                    throw new Error(`Error al cargar los datos del producto (${response.status})`);
                }

                const data = await response.json();
                setProduct(data);
            } catch (error) {
                console.error('Error al recuperar datos del producto', error);
            }
        };

        fetchProductDetails();
    }, [_id]);

    return (
        <>
            <Header />
            {product ? (
                <ItemDetail product={product} />
            ) : (
                <p>Cargando datos del producto...</p>
            )}
            <Footer />
        </>
    );
};

export default ItemDetailContainer;