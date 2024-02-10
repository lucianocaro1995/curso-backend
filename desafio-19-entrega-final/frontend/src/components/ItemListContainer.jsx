import React, { useState, useEffect } from "react";
import ItemList from "./ItemList";

const URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";

const ItemListContainer = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch(`${URL}/api/products`);
    
                if (!response.ok) {
                    throw new Error(`Error al obtener productos: ${response.status}`);
                }
    
                const data = await response.json();
                setProducts(data.docs);
            } catch (error) {
                console.error(error.message);
                setProducts([]);
            }
        };
        fetchProducts();
    }, []);    

    return (
        <>
            <ItemList products={products} />
        </>
    );
};

export default ItemListContainer;