import PropTypes from 'prop-types'
import Abbr from "./abbr";
import Error from '../error';

const InputField = ({ handleOnChange, inputValue, name, type, label, errors, placeholder, required, containerClassNames, isShipping }) => {

	const inputId = `${name}-${isShipping ? 'shipping' : ''}`; //делаем проверку isShipping что бы понимать, элемент относится к выставлению счета или доставки

    return (
        <div className={containerClassNames}>
            <label htmlFor={inputId}>
                {label || ''}
                <Abbr required={required}/>
            </label>
            <input 
                type={type}
                value={inputValue}
                placeholder={placeholder}
                onChange={handleOnChange}
                name={name} 
                className="someClass"
                id={inputId}
            />
            <Error errors={ errors } fieldName={ name }/>
        </div>
    )

}

InputField.propTypes = {
	handleOnChange: PropTypes.func,
	inputValue: PropTypes.string,
	name: PropTypes.string,
	type: PropTypes.string,
	label: PropTypes.string,
	placeholder: PropTypes.string,
	errors: PropTypes.object,
	required: PropTypes.bool,
	containerClassNames: PropTypes.string
}

InputField.defaultProps = {
	handleOnChange: () => null,
	inputValue: '',
	name: '',
	type: 'text',
	label: '',
	placeholder: '',
	errors: {},
	required: false,
	containerClassNames: ''
}

export default InputField;