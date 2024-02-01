import React, { useEffect, useState } from "react";
import Item from "../Item/Item";

const ItemList = () => {
    const [productos, setProductos] = useState([]);

    useEffect(() => {
        const fetchProductos = async () => {
            try {
                // Realizar la solicitud GET a tu API de MongoDB Atlas
                const response = await fetch("http://localhost:4000/api/products");

                if (!response.ok) {
                    throw new Error(`Error al obtener productos: ${response.status}`);
                }

                const data = await response.json();
                setProductos(data.products); // Asegúrate de ajustar la propiedad según la respuesta de tu API
            } catch (error) {
                console.error(error.message);
            }
        };

        fetchProductos();
    }, []);

    return (
        <div className="flex flex-wrap -m-4">
            {productos.map((producto) => (
                <Item key={producto._id} producto={producto} />
            ))}
        </div>
    );
};

export default ItemList;
