const Error = ( { errors, fieldName } ) => {
	
	return(
		errors && ( errors.hasOwnProperty( fieldName ) ) ? (
			<div className="error_text">{ errors[fieldName] }</div>
		) : ''
	)
};

export default Error;