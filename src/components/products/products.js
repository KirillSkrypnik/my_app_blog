import { isEmpty } from "lodash";
// import Image from "next/image";
import Image from "../image"
import Link from "next/link";
import sanitizeHtml from 'sanitize-html';
import AddToCart from "../cart/add-to-cart";


const Product = ({product}) => {

    if (isEmpty(product)) {
        return null;
    }

    const img = product?.images?.[0] ?? {};
    const productType = product?.type ?? '';

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
                <div className="custom_title_product_card">{product?.name}</div>
                <div className="custom_price_product_card" dangerouslySetInnerHTML={{ __html: sanitizeHtml(product?.price_html ?? '')}} />
            </Link>
            {
                'simple' === productType ? <AddToCart product={ product }/> : null
            }
        </div>
    )
}

export default Product;