import { isArray, isEmpty } from "lodash";
import Link from "next/link";
import Image from "../image"

const Products = ({products}) => {

    if (isEmpty (products) || !isArray(products) ){
        return null;
    }

    console.log(products);


    return (
        <div className="grid_four_item">
            { products.length ? products.map( product => {

                const img = product?.images?.[0] ?? {};
                return (
                    <div key={ product?.id } className="grid_four_item_box">
                        <Link href={product?.permalink ?? '/'}>
                            <Image 
                                sourceUrl={ img?.src ?? ''}
                                altText={ img?.alt }
                                title={ product?.name ?? '' }
                                width="300"
                                height="300"
                            />
                            <div>{product?.name}</div>
                        </Link>
                    </div>
                )
            } ) : null }
        </div>
    )
}

export default Products;