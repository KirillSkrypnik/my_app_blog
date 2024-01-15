/**
 * External Dependencies.
 */
import Link from 'next/link';

/**
 * Internal Dependencies.
 */
import Image from '../image';
import { sanitize } from '../../utils/miscellaneous';
import PostMeta from '../post-meta';

/**
 * Post Component.
 *
 */
const Post = ( { post } ) => {
	return (
		<div className="item_post_child">
			<Link legacyBehavior href={ `/blog/${ post?.slug }/` }>
				<a>
						<Image
							sourceUrl={ post?.attachment_image?.img_src?.[ 0 ] ?? '' }
							title={ post?.title ?? '' }
							width="400"
							height="225"
							// layout="fill"
						/>
				</a>
			</Link>
			<PostMeta date={ post?.date ?? '' } authorName={ post?.meta?.author_name ?? '' }/>
			<Link legacyBehavior href={ `/blog/${ post?.slug }/` }>
				<a>
					<h2 className="font-bold mb-3 text-lg text-brand-gun-powder font-bold uppercase hover:text-blue-500"
					    dangerouslySetInnerHTML={ { __html: sanitize( post?.title ?? '' ) } }/>
				</a>
			</Link>
			{/* <div dangerouslySetInnerHTML={ { __html: sanitize( post?.excerpt ?? '' ) } }/> */}
		</div>
	);
};

export default Post;