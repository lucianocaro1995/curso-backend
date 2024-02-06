import React, { useEffect, useState } from "react";

const ItemCount = ({ stock }) => {
    const [items, setItems] = useState(1);

    const incrementarStock = () => {
        if (items < stock) {
            setItems(prevItems => prevItems + 1);
        }
    };

    const decrementarStock = () => {
        if (items > 1) {
            setItems(prevItems => prevItems - 1);
        }
    };

    //Para verificar si se mueve el ItemCount y si se mueve el stock cuando presione "Agregar al carrito"
    useEffect(() => {
        console.log("Stock actualizado:", stock);
        console.log("Items actualizado:", items);
    }, [stock, items]);

    return (
        <div>
            <div>
                <button onClick={decrementarStock}>-</button>
                <div>{items}</div>
                <button onClick={incrementarStock}>+</button>
            </div>
        </div>
    );
};

export default ItemCount;
