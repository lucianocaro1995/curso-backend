import "./CartWidget.css";
import { Link } from "react-router-dom";
import { useContext, useEffect } from "react";
import { CartContext } from "../Context/CartContext";

const CartWidget = () => {
    const { cartItemCount, updateCartItemCount } = useContext(CartContext);

    useEffect(() => {
        const fetchCartItemCount = async () => {
            try {
                const response = await fetch("/api/cart/total"); // Reemplaza con tu ruta específica
                if (response.ok) {
                    const data = await response.json();
                    if (data && data.totalItems !== undefined) {
                        // Asegurarse de que la respuesta contiene el campo totalItems
                        updateCartItemCount(data.totalItems);
                    } else {
                        console.error("La respuesta del servidor no contiene el campo totalItems");
                    }
                } else {
                    console.error(`Error al obtener la cantidad del carrito. Código de estado: ${response.status}`);
                }
            } catch (error) {
                console.error("Error en la solicitud:", error.message);
            }
        };

        fetchCartItemCount();
    }, [updateCartItemCount]); // Agrega updateCartItemCount como dependencia para evitar advertencias de lint

    return (
        <Link className="ver-carrito" to={"/cart"}>
            {cartItemCount > 0 && <span className="contador-carrito">{cartItemCount}</span>}
            <p className="item-carrito">🛒</p>
        </Link>
    );
};

export default CartWidget;
