import { Link } from "react-router-dom";

const URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";

const Item = ({ product }) => {
    const { title, price, category, thumbnails, _id } = product;

    const thumbnailUrl = thumbnails && thumbnails.length > 0
        ? `${URL}/uploads/products/${thumbnails[0].name}`
        : '' ; // No muestra ninguna imagen pero permitirá que la etiqueta de imagen esté presente

    return (
        <div className="hover:text-pink-500 text-white lg:w-1/4 md:w-1/2 p-4 w-full mr-8 bg-black">
            <Link to={`/item/${_id}`} className="block no-underline">

                <div className="relative h-48 rounded overflow-hidden">
                    <img alt="ecommerce" className="object-contain w-full h-full bg-white" src={thumbnailUrl} />
                </div>
                <div className="mt-4">
                    <h3 className="text-xs tracking-widest title-font mb-1">{category}</h3>
                    <h2 className="title-font text-lg font-medium">{title}</h2>
                    <p className="mt-1">${price}</p>
                </div>

            </Link >
        </div >
    );
}

export default Item;
