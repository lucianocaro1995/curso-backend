import React, { useState, useEffect } from "react";
import ItemList from "./ItemList";

const ItemListContainer = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch("http://localhost:3000/api/products");
    
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