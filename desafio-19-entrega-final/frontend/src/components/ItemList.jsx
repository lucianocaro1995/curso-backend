import Item from "./Item";

const ItemList = ({ products }) => {
    return (
        <section className="body-font bg-slate-900">
            <div className="container px-5 py-24 mx-auto">
                <div className="flex flex-wrap justify-center -mx-4">
                    {products ? (
                        products.map((product) => (
                            <Item key={product._id} product={product} />
                        ))
                    ) : (
                        <p>Cargando productos...</p>
                    )}
                </div>
            </div>
        </section>
    );
}

export default ItemList;