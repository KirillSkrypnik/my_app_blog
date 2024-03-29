import axios from 'axios';
import {
	// COMMENTS_ENDPOINT,
	// GET_PAGES_ENDPOINT,
	GET_POST_ENDPOINT,
	GET_POSTS_ENDPOINT,
} from './constants/endpoints';


/**
 * Get Posts.
 *
 *
 */
export const getPosts = async ( pageNo = 1 ) => {
	return await axios.get( `${ GET_POSTS_ENDPOINT }?page_no=${ pageNo }` )
		.then( res => {
			if ( 200 === res.data.status ) {
				return res;
			} else {
				return {
					posts_data: {},
					error: 'Post not found',
				};
			}
		} )
		.catch( err => {
			console.log( err.response.data.message )
			return {
				posts_data: {},
				error: err.response.data.message
			};
		} );
};

/**
 * Get Post By Slug.
 */
export const getPost = async ( postSlug = '' ) => {
	return await axios.get( `${ GET_POST_ENDPOINT }?slug=${ postSlug }&_embed` )
		.then( res => {
			if ( 200 === res.status ) {
				return res.data;
			} else {
				return [];
			}
		} )
		.catch( err => {
			console.log( err.response.data.message )
			return [];
		} );
};

