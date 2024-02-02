import "./Item.css";
import { Link } from "react-router-dom";

const Item = ({ product }) => {
    const { title, price, category, thumbnails, code } = product;

    const thumbnailUrl = thumbnails && thumbnails.length > 0
        ? `http://localhost:3000/uploads/products/${thumbnails[0].name}`
        : 'ruta_por_defecto';

    return (
        <Link to={`/ItemDetail/${code}`} style={{ textDecoration: 'none' }}>
            <div className="card">
                <div className="card-hijo">
                    <div className="card-imagen">
                        <img src={thumbnailUrl} alt={title} />
                    </div>
                    <div className="card-nombre">
                        <span>{category}</span>
                        <span>{title}</span>
                        <span>$ {price}</span>
                    </div>
                </div>
                <div className="card-boton">
                    <span className="card-span">Ver producto</span>
                </div>
            </div>
        </Link>
    )
}

export default Item;