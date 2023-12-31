import Layout from '../src/components/layout';
import { HEADER_FOOTER_ENDPOINT } from '../src/utils/constants/endpoints';
import axios from 'axios';
import CartItemsContainer from '../src/components/cart/cart-items-container';
import 'react-app-polyfill/stable';

export default function Cart({ headerFooter }) {
	return (
		<Layout headerFooter={headerFooter || {}}>
			<h1 >Cart</h1>
			<CartItemsContainer/>
		</Layout>
	);
}

export async function getStaticProps() {
	
	const { data: headerFooterData } = await axios.get( HEADER_FOOTER_ENDPOINT );
	
	return {
		props: {
			headerFooter: headerFooterData?.data ?? {},
		},
		
		/**
		 * Revalidate means that if a new request comes to server, then every 1 sec it will check
		 * if the data is changed, if it is changed then it will update the
		 * static file inside .next folder with the new data, so that any 'SUBSEQUENT' requests should have updated data.
		 */
        // Проверка каждого нового запроса, гарантирует что данные на странице не устареют
		revalidate: 1,
	};
}