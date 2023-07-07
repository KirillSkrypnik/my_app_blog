import Header from '../src/components/layouts/header';
import Footer from '../src/components/layouts/footer';
import axios from 'axios';
import Products from '../src/components/products';
import { GET_PRODUCTS_ENDPOINT } from '../src/utils/constants/endpoints';
import Categories from '../src/components/categories';


export default function Home({headerFooter, products, categories}) {

  const { header, footer } = headerFooter || {};
  return (
    <div>
    <Header header={header} />
    <main className='container'>
      <Products products={products} />
      {/* <Categories categories={categories} /> */}
    </main>
    <Footer footer={footer} />
    </div>
  )
}

export async function getStaticProps() {
  // Все будет выводится последовательно, друг за другом
	const { data: headerFooterData } = await axios.get( `${ process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL }/wp-json/rae/v1/header-footer?header_location_id=hcms-menu-header&footer_location_id=hcms-menu-footer`);
	const { data: productsData } = await axios.get( 'http://localhost:3000/api/get-products' );
  const { data: categoriesData } = await axios.get( 'http://localhost:3000/api/get-categories' );

  // const data = {
  //   headerFooter: headerFooterData?.data ?? {},
  //    products: productsData?.products ?? {}
  // }
	return {
		props: {
      headerFooter: headerFooterData?.data ?? {},
      products: productsData?.products ?? {},
      categories: categoriesData?.categories ?? {}, 
    },
		
		/**
		 * Revalidate means that if a new request comes to server, then every 1 sec it will check
		 * if the data is changed, if it is changed then it will update the
		 * static file inside .next folder with the new data, so that any 'SUBSEQUENT' requests should have updated data.
		 */
		revalidate: 1,
	};
}
