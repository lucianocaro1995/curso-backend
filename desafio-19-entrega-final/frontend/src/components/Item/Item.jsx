import React from "react";
import { Link } from "react-router-dom";

const Item = ({ producto }) => {
    return (
        <Link to={`/item/${producto._id}`} className="no-underline">
            <div className="lg:w-1/4 md:w-1/2 p-4 w-full">
                <div className="bg-white rounded-lg overflow-hidden">
                    <img className="w-full h-48 object-cover object-center" src={producto.imagen} alt={producto.titulo} />
                    <div className="p-4">
                        <span className="block text-sm text-gray-500 tracking-widest mb-1">{producto.categoria}</span>
                        <h2 className="text-gray-900 text-lg font-medium mb-2">{producto.titulo}</h2>
                        <p className="text-gray-700">${producto.precio}</p>
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
