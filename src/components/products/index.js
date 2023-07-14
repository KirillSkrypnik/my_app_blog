import { isArray, isEmpty } from "lodash";
import Product from "./products";

const Products = ({products}) => {

    if (isEmpty (products) || !isArray(products) ){
        return null;
    }

    console.log(products);

    return (
        <div className="grid_four_item">
            { products.length ? products.map( product => {
                return (
                    <Product key={ product?.id } product={product} />
                )
            } ) : null }
        </div>
    )
}

export default Products;