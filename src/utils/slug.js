import { isEmpty } from 'lodash';

export const FALLBACK = 'blocking';

export const handleRedirectsAndReturnData = ( defaultProps, data, field = '' ) => {
	
	// If no data is available then redirect to 503.
	if ( isEmpty( data ) ) {
		return {
			redirect: {
				destination: '/503',
				statusCode: 301,
			},
		};
	}
	
	// If data for a given field is not available, redirect to 404.
	if ( field && isEmpty( data?.[ field ] ) ) {
		return {
			// returns the default 404 page with a status code of 404
			notFound: true,
		};
	}
	
	return defaultProps;
};