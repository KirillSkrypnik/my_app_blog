import React, { useState, useEffect } from 'react';

export const AppContext = React.createContext([
    {},
    () => {}
]);

export const AppProvider = (props) => {
    const [cart, setCart] = useState( null );

	// При первоночальном рендиренге
	useEffect( () => {
		
		if ( process.browser ) {
			let cartData = localStorage.getItem( 'next-cart' );
			cartData = null !== cartData ? JSON.parse( cartData ) : '';
			console.log('cartData', cartData);
			setCart( cartData );
		}
		
	}, [] );

    useEffect( () => {

		if ( process.browser ) {
			localStorage.setItem('next-cart', JSON.stringify(cart));
		}

	}, [ cart ] );
    // когда значение cart будет изменяться при обновлении общей стоимости корзины
	
	return (
		<AppContext.Provider value={ [ cart, setCart ] }>
			{ props.children }
		</AppContext.Provider>
	);
};