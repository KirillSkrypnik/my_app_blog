const WooCommerceRestApi = require("@woocommerce/woocommerce-rest-api").default;

const api = new WooCommerceRestApi({
  url: process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL,
  consumerKey: process.env.WC_CONSUMER_KEY,
  consumerSecret: process.env.WC_CONSUMER_SECRET,
  version: "wc/v3"
});


export const getCategoriesData = async ( perPage = 50 ) => {
	return await api.get(
		'products/categories',
		{
			per_page: perPage || 50,
		},
	);
}
