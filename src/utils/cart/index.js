import { getSession, storeSession } from './session';
import { getApiCartConfig } from './api';
import axios from 'axios';
import { CART_ENDPOINT } from '../constants/endpoints';
import { isEmpty, isArray } from 'lodash';

/**
 * Add To Cart Request Handler.
 *
 */
export const addToCart = ( productId, qty = 1, setCart, setIsAddedToCart, setLoading ) => {
	const storedSession = getSession();
	const addOrViewCartConfig = getApiCartConfig();
	
	setLoading(true);
	
	axios.post( CART_ENDPOINT, {
			product_id: productId,//Тут идентификатор товара
			quantity: qty,//Тут количество товара
		},
		addOrViewCartConfig,
	)
		.then( ( res ) => {
			
			if ( isEmpty( storedSession ) ) {
				storeSession( res?.headers?.[ 'x-wc-session' ] );
			}
			setIsAddedToCart(true);//Означает что товар был добавлен в корзину
			setLoading(false);
			viewCart( setCart );//Ниже будет одноименнаю функция которая будет просматривать корзину
		} )
		.catch( err => {
			console.log( 'err', err );
		} );
};

/**
 * View Cart Request Handler
 *
 */
export const viewCart = ( setCart, setProcessing = () => {} ) => {
	
	const addOrViewCartConfig = getApiCartConfig();
	
	axios.get( CART_ENDPOINT, addOrViewCartConfig )
		.then( ( res ) => {
			const formattedCartData = getFormattedCartData( res?.data ?? [] )
			setCart( formattedCartData );
			setProcessing(false);
		} )
		.catch( err => {
			console.log( 'err', err );
			setProcessing(false);
		} );
};

/**
 * Обновление корзины
 */
export const updateCart = ( cartKey, qty = 1, setCart, setUpdatingProduct ) => {
	
	const addOrViewCartConfig = getApiCartConfig();
	
	setUpdatingProduct(true);
	
	axios.put( `${CART_ENDPOINT}${cartKey}`, {
		quantity: qty,
	}, addOrViewCartConfig )
		.then( ( res ) => {
			viewCart( setCart, setUpdatingProduct );
		} )
		.catch( err => {
			console.log( 'err', err );
			setUpdatingProduct(false);
		} );
};

// Удаление элементов корзины
export const deleteCartItem = ( cartKey, setCart, setRemovingProduct ) => {
	
	const addOrViewCartConfig = getApiCartConfig();
	
	setRemovingProduct(true);
	
	axios.delete( `${CART_ENDPOINT}${cartKey}`, addOrViewCartConfig )
		.then( ( res ) => {
			viewCart( setCart, setRemovingProduct );
		} )
		.catch( err => {
			console.log( 'err', err );
			setRemovingProduct(false);
		} );
};

// Очистка?
export const clearCart = async ( setCart, setClearCartProcessing ) => {
	
	setClearCartProcessing(true);
	
	const addOrViewCartConfig = getApiCartConfig();
	
	try {
		const response = await axios.delete( CART_ENDPOINT, addOrViewCartConfig );
		viewCart( setCart, setClearCartProcessing );
	} catch ( err ) {
		console.log( 'err', err );
		setClearCartProcessing(false);
	}
};

// Очистка корзины

//Отформатированные данные корзины
// Позволяет получить данные отформотированной корзины 
// Принимает данные корзины в виде массива, после чего вызывает функцию calculateCartQtyAndPrice
const getFormattedCartData = ( cartData ) => {
	if ( ! cartData.length ) {
		return null;
	}
	const cartTotal = calculateCartQtyAndPrice( cartData || [] );
	return {
		cartItems: cartData || [],
		...cartTotal,
	};
};

// !!!
// cartItems - массив товаров в корзине
const calculateCartQtyAndPrice = ( cartItems ) => {
	const qtyAndPrice = {
		totalQty: 0,
		totalPrice: 0,
	}
	
	if ( !isArray(cartItems) || !cartItems?.length ) {
		return qtyAndPrice;
	}
	
	cartItems.forEach( (item, index) => {
		qtyAndPrice.totalQty += item?.quantity ?? 0;
		qtyAndPrice.totalPrice += item?.line_total ?? 0;
	} )
	
	return qtyAndPrice;
}