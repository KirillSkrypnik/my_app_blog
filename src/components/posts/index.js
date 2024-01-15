/**
 * External Dependencies.
 */
import PropTypes from 'prop-types';
import { isEmpty, isArray } from 'lodash';

/**
 * Internal Dependency.
 */
import Post from './post';


const Posts = ( { posts } ) => {
	
	if ( isEmpty( posts ) && ! isArray( posts ) ) {
		return null;
	}
	
	return (
		<div className="posts_wrapper">
			{
				posts.map( ( post, index ) => {
					return (
						<div
							key={ `${ post?.id ?? '' }-${ index }` ?? '' }
							className="item_post"
						>
							<Post post={ post }/>
						</div>
					);
				} )
			}
		</div>
	);
};

Posts.propTypes = {
	posts: PropTypes.array,
};

Posts.defaultProps = {
	posts: [],
};

export default Posts;