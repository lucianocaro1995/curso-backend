import React, { useState, useEffect } from "react";
import "./ItemListContainer.css";
import ItemList from "../ItemList/ItemList";
import Footer from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";
import Header from "../Header/Header";
import Banner from "../Banner/Banner";

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
            <Header />
            <Banner />
            <div className="item-list-container">
                <h2 className="titulo-productos">Compra por categorías</h2>
                <Navbar />
                <div className="seccion-productos">
                    <ItemList products={products} />
                </div>
                <Footer />
            </div>
        </>
    );
};

export default ItemListContainer;