import Item from "../Item/Item";

const ItemList = ({ products }) => {
    return (
        <>
            {products ? (
                products.map((product) => (
                    <Item key={product._id} product={product} />
                ))
            ) : (
                <p>Cargando productos...</p>
            )}
        </>
    );
};

export default ItemList;