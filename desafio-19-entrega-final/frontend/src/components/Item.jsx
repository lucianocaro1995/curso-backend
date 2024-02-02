import React from "react";
import { Link } from "react-router-dom";

const Item = ({ product }) => {
    const { title, price, category, thumbnails, code } = product;

    const thumbnailUrl = thumbnails && thumbnails.length > 0
        ? `http://localhost:3000/uploads/products/${thumbnails[0].name}`
        : 'ruta_por_defecto';

    return (
        <Link to={`/ItemDetail/${code}`} className="no-underline">
            <div className="lg:w-1/3 md:w-1/2 p-4">
                <div className="bg-white rounded-lg">
                    <img className="w-full h-48 object-cover object-center" src={thumbnailUrl} alt={title} />
                    <div className="p-4">
                        <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">{category}</h3>
                        <h2 className="text-gray-900 title-font text-lg font-medium">{title}</h2>
                        <p className="mt-1">${price}</p>
                    </div>
                </div>
                <div className="mt-2 text-center">
                    <span className="inline-block bg-indigo-500 text-white py-1 px-3 rounded-full text-xs uppercase tracking-widest">Ver producto</span>
                </div>
            </div>
        </Link>
    );
};

export default Item;

