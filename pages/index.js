import axios from 'axios';
import Products from '../src/components/products';
import { GET_PRODUCTS_ENDPOINT } from '../src/utils/constants/endpoints';
import Categories from '../src/components/categories';
import { getProductsData } from '../src/utils/products';
import { getCategoriesData } from '../src/utils/categories';
import Layout from '../src/components/layouts';


export default function Home({headerFooter, products, categories}) {

  return (
    <Layout headerFooter={headerFooter}>
      <Products products={products} />
      <Categories categories={categories} />
    </Layout >
  )
}

export async function getStaticProps() {
  // Все будет выводится последовательно, друг за другом
	const { data: headerFooterData } = await axios.get( `${ process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL }/wp-json/rae/v1/header-footer?header_location_id=hcms-menu-header&footer_location_id=hcms-menu-footer`);
	// const { data: productsData } = await getProductsData();
  const { data: products } = await getProductsData();
  const { data: categories } = await getCategoriesData();

	return {
		props: {
      headerFooter: headerFooterData?.data ?? {},
      products: products ?? {},
      categories: categories ?? {}, 
    },
		
		/**
		 * Revalidate means that if a new request comes to server, then every 1 sec it will check
		 * if the data is changed, if it is changed then it will update the
		 * static file inside .next folder with the new data, so that any 'SUBSEQUENT' requests should have updated data.
		 */
		revalidate: 1,
	};
}
