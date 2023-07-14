import { isEmpty } from "lodash";
import { addToCart } from '../../utils/cart'
import { useContext, useState } from "react";
import { AppContext } from "../context";
import cx from 'classnames';
import Link  from "next/link";

const AddToCart = ( {product} ) => {
    
    const [ cart, setCart ] = useContext( AppContext ); 
    const [ isAddedToCart, setIsAddedToCart ] = useState (false); //Для добавления около кнопки добавить в корзину кнопки посмотреть в корзину
    const [ loading, setLoading] = useState ( false );
    const addToCartBtnClasses = cx (
        'text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow',
        {
            'bg-white hover:bg-gray-100': ! loading,
            'bg-gray-200': loading
        }
    )

    if (isEmpty(product)) {
        return null;
    }
    
    return (
        <>
        <button 
            onClick={ () => addToCart( product?.id ?? 0, 1, setCart, setIsAddedToCart, setLoading ) } //количество товара
            className="bg-white"
            disabled={loading}
            >
            { loading ? 'Adding...' : 'Add to cart' }
        </button>
        { isAddedToCart && ! loading ? ( //Если товар добавлен в корзину и не загружается
            <Link legacyBehavior href="/cart">
                <a
                    className="bg-white"
                >
                    View cart
                </a>
            </Link>
        ) : null }
        </>
    );
}

export default AddToCart;