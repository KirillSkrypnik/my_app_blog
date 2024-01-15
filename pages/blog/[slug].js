/**
 * External Dependencies.
 */
import { isEmpty } from 'lodash';
import { useRouter } from 'next/router';
import axios from 'axios';

/**
 * Internal Dependencies.
 */
import Layout from '../../src/components/layout';
import { FALLBACK, handleRedirectsAndReturnData } from '../../src/utils/slug';
import { getFormattedDate, sanitize } from '../../src/utils/miscellaneous';
import { HEADER_FOOTER_ENDPOINT } from '../../src/utils/constants/endpoints';
import { getComments, getPost, getPosts } from '../../src/utils/blog';
import Image from '../../src/components/image';
import PostMeta from '../../src/components/post-meta';
// import Comments from '../../src/components/comments';

const Post = ( { headerFooter, postData, commentsData } ) => {
	const router = useRouter();

	/**
	 * If the page is not yet generated, this will be displayed
	 * initially until getStaticProps() finishes running
	 */
	if ( router.isFallback ) {
		return <div>Loading...</div>;
	}

	return (
		<Layout headerFooter={ headerFooter || {} } seo={ postData?.yoast_head_json ?? {} }>
			<div className="">
				<figure className="single_post_image_wrapper">
					<Image
						sourceUrl={ postData?._embedded[ 'wp:featuredmedia' ]?.[ 0 ]?.source_url ?? '' }
						title={ postData?.title?.rendered ?? '' }
						width="600"
						height="400"
						// layout="fill"
						containerClassNames=""
					/>
				</figure>
				<PostMeta date={ getFormattedDate( postData?.date ?? '' ) } authorName={ postData?._embedded?.author?.[0]?.name ?? '' }/>
				<h1 dangerouslySetInnerHTML={ { __html: sanitize( postData?.title?.rendered ?? '' ) } }/>
				<div className="blog_content_wrapper" dangerouslySetInnerHTML={ { __html: sanitize( postData?.content?.rendered ?? '' ) } }/>
			</div>
		</Layout>
	);
};

export default Post;

export async function getStaticProps( { params } ) {
	const { data: headerFooterData } = await axios.get( HEADER_FOOTER_ENDPOINT );
	const postData = await getPost( params?.slug ?? '' );
	// const commentsData = await getComments( postData?.[0]?.id ?? 0 );

	const defaultProps = {
		props: {
			headerFooter: headerFooterData?.data ?? {},
			postData: postData?.[0] ?? {},
			// commentsData: commentsData || []
		},
		/**
		 * Revalidate means that if a new request comes to server, then every 1 sec it will check
		 * if the data is changed, if it is changed then it will update the
		 * static file inside .next folder with the new data, so that any 'SUBSEQUENT' requests should have updated data.
		 */
		revalidate: 1,
	};

	return handleRedirectsAndReturnData( defaultProps, postData );
}

/**
* Поскольку имя страницы «не» использует перехватывающие маршруты,
 * например [слизняк],
 * поэтому параметры будут содержать только слизень, а не массив слизней, в отличие от [...slug].
 * Например, если нам нужен динамический маршрут '/foo/'
 * Затем мы добавим пути: [ params: { slug: 'foo' } } ]
 * Здесь пул будет иметь вид «foo», тогда Next.js статически сгенерирует страницу по адресу /foo/.
 *
 * Во время сборки следующий js выполнит вызов API для получения данных и
 * создать страницу bar.js внутри каталога .next/foo, чтобы страница отображалась в браузере
 * данные уже присутствуют, в отличие от getInitialProps, который получает страницу во время сборки, но создает API
 * вызов после отображения страницы в браузере.
 */
export async function getStaticPaths() {
	const { data: postsData } = await getPosts();

	const pathsData = [];

	
	postsData?.posts_data.length && postsData?.posts_data.map( post => {
		if ( ! isEmpty( post?.slug ) ) {
			console.log('slug', post?.slug);
			pathsData.push( { params: { slug: post?.slug } } );
		}
	} );

	console.log('postData', pathsData);

	return {
		paths: pathsData,
		fallback: FALLBACK,
	};
}