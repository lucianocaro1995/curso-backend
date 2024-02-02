import React from "react";
import Item from "./Item";

const ItemList = ({ products }) => {
    return (
        <div className=" bg-slate-900 p-5">
            {products ? (
                products.map((product) => (
                    <Item key={product._id} product={product} />
                ))
            ) : (
                <p>Cargando productos...</p>
            )}
        </div>
    );
};

export default ItemList;