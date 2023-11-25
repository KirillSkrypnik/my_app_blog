import AddToCart from '../cart/add-to-cart';
import ExternalLink from '../products/external-link';
import ProductGallery from './product-gallery';

const SingleProduct = ( { product } ) => {
	return Object.keys( product ).length ? (
		<div className="single_product container">
			<div className="single_product_wrapper">
				<div className="product-images">
					
					{ product.images.length ? (
						<ProductGallery items={ product?.images }/>
					) : null }
				</div>
				<div className="product-info">
					<h4 className="products_main_title ">{ product.name }</h4>
					<div
						
						dangerouslySetInnerHTML={ {
							__html: product.description,
						} }
						className="product_description"
					/>
					<div
						
						dangerouslySetInnerHTML={ {
							__html: product?.price_html ?? '',
						} }
						className="product_price"
					/>
					{ 'simple' === product?.type ? <AddToCart product={ product }/> : null }
					{
						'external' === product?.type ?
							<ExternalLink
								url={ product?.external_url ?? '' }
								text={ product?.button_text ?? '' }
							/> : null
					}
				</div>
			</div>
		
		</div>
	) : null;
	
};

export default SingleProduct;