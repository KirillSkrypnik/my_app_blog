import { useState, useContext } from 'react';
import cx from 'classnames';

// import YourOrder from './your-order';
// import PaymentModes from './payment-modes';
// import validateAndSanitizeCheckoutForm from '../../validator/checkout';
import Address from './user-address';
import { AppContext } from '../context';
import CheckboxField from './form-elements/checbox-field';
import {
	handleBillingDifferentThanShipping,
	handleCreateAccount, handleOtherPaymentMethodCheckout, handleStripeCheckout,
	setStatesForCountry,
} from '../../utils/checkout';
import YourOrder from './your-order';
import PaymentModes from './payment-modes';
import validateAndSanitizeCheckoutForm from '../validator/checkout';

// Use this for testing purposes, so you dont have to fill the checkout form over an over again.
const defaultCustomerInfo = {
	firstName: 'Imran',
	lastName: 'Sayed',
	address1: '123 Abc farm',
	address2: 'Hill Road',
	city: 'Mumbai',
	country: 'IN',
	state: 'Maharastra',
	postcode: '221029',
	email: 'codeytek.academy@gmail.com',
	phone: '9883778278',
	company: 'The Company',
	errors: null,
};

// const defaultCustomerInfo = { //стартовый объект для заполнения информации о клиенте 
// 	firstName: '',
// 	lastName: '',
// 	address1: '',
// 	address2: '',
// 	city: '',
// 	country: '',
// 	state: '',
// 	postcode: '',
// 	email: '',
// 	phone: '',
// 	company: '',
// 	errors: null
// }

const CheckoutForm = ( { countriesData } ) => {

	const { billingCountries, shippingCountries } = countriesData || {}; //Переменные для данных вытягиваемых из объекта

	const initialState = { //Начальное состояние
		billing: { //платежная информация
			...defaultCustomerInfo,
		},
		shipping: { //для доставки
			...defaultCustomerInfo,
		},
		createAccount: false, //для создания учетной записи в независимости от того хочет ли того пользователь, в начальном состоянии false
		orderNotes: '', //некоторые заметки
		billingDifferentThanShipping: false, //на случай если пользователь решил что адрес выставления счета отличается от адреса доставки
		paymentMethod: 'cod', //способ оплаты, в начальном состоянии наложенным платежом !!! 
	};

	const [ cart, setCart ] = useContext( AppContext ); //получаем данные корзины
	const [ input, setInput ] = useState( initialState ); //поля для сохранения вводимых пользователем данных
	const [ requestError, setRequestError ] = useState( null ); // Ошибка запроса, равна состоянию использования прямо сейчас
	const [ theShippingStates, setTheShippingStates ] = useState( [] ); //состояние доставки
	const [ isFetchingShippingStates, setIsFetchingShippingStates ] = useState( false ); //состояние оплаты
	const [ theBillingStates, setTheBillingStates ] = useState( [] ); //используется что бы узнать что выберет пользователь
	const [ isFetchingBillingStates, setIsFetchingBillingStates ] = useState( false ); //используется что бы узнать что выберет пользователь
	const [ isOrderProcessing, setIsOrderProcessing ] = useState( false ); //процесс обработки заказа
	const [ createdOrderData, setCreatedOrderData ] = useState( {} ); //ячейка хранения при создании заказа

	/**
	 * Handle form submit.
	 *
	 * @param {Object} event Event Object.
	 *
	 * @return Null.
	 */
	const handleFormSubmit = async ( event ) => {
		event.preventDefault(); //что бы не было отправки формы по умолчанию

		/**
		 * Проверка введенных данных (biling - shiping) - валидация
		 *
		 */
		const billingValidationResult = input?.billingDifferentThanShipping ? validateAndSanitizeCheckoutForm( input?.billing, theBillingStates?.length ) : {
			errors: null,
			isValid: true,
		};
		const shippingValidationResult = validateAndSanitizeCheckoutForm( input?.shipping, theShippingStates?.length );

		setInput( {
			...input,
			billing: { ...input.billing, errors: billingValidationResult.errors },
			shipping: { ...input.shipping, errors: shippingValidationResult.errors },
		} );

		// If there are any errors, return.
		if ( ! shippingValidationResult.isValid || ! billingValidationResult.isValid ) {
			return null;
		}

		// For stripe payment mode, handle the strip payment and thank you.
		if ( 'stripe' === input.paymentMethod ) {
			const createdOrderData = await handleStripeCheckout( input, cart?.cartItems, setRequestError, setCart, setIsOrderProcessing, setCreatedOrderData );
			return null;
		}
		
		// Для любого другого способа оплаты создайте заказ и перенаправьте пользователя на URL-адрес платежа.
		const createdOrderData = await handleOtherPaymentMethodCheckout( input, cart?.cartItems, setRequestError, setCart, setIsOrderProcessing, setCreatedOrderData );
		
		if ( createdOrderData.paymentUrl ) {
			console.log(  'hey', createdOrderData);
			// window.location.href = createdOrderData.paymentUrl;
			// window.location.href = '/thank-you';
			window.location.href + `/thank-you?session_id={CHECKOUT_SESSION_ID}&order_id=${ createdOrderData.orderId }`;
		}

		setRequestError( null );

	};

	const handleOnChange = async ( event, isShipping = false, isBillingOrShipping = false ) => {
		const { target } = event || {};

		if ( 'createAccount' === target.name ) {
			handleCreateAccount( input, setInput, target );
		} else if ( 'billingDifferentThanShipping' === target.name ) {
			handleBillingDifferentThanShipping( input, setInput, target );
		} else if ( isBillingOrShipping ) {
			if ( isShipping ) {
				await handleShippingChange( target );
			} else {
				await handleBillingChange( target );
			}
		} else {
			const newState = { ...input, [ target.name ]: target.value };
			setInput( newState );
		}

		console.log( 'input', input );
	};

	const handleShippingChange = async ( target ) => {
		const newState = { ...input, shipping: { ...input?.shipping, [ target.name ]: target.value } };
		setInput( newState );
		await setStatesForCountry( target, setTheShippingStates, setIsFetchingShippingStates );
	};

	const handleBillingChange = async ( target ) => {
		const newState = { ...input, billing: { ...input?.billing, [ target.name ]: target.value } };
		setInput( newState );
		await setStatesForCountry( target, setTheBillingStates, setIsFetchingBillingStates );
	};

	return (
		<>
			{ cart ? (
				<form onSubmit={ handleFormSubmit } className="woo-next-checkout-form">
					<div className="checkout_wrapper">
						<div className="checkout_wrapper_details">
							{/*Shipping Details*/ }
							<div className="shipping-details">
								<h2 className="text-xl font-medium mb-4">Shipping Details</h2>
								<Address
									states={ theShippingStates }
									countries={ shippingCountries }
									input={ input?.shipping }
									handleOnChange={ ( event ) => handleOnChange( event, true, true ) }
									isFetchingStates={ isFetchingShippingStates }
									isShipping
									isBillingOrShipping
								/>
							</div>
							<div>
								<CheckboxField
									name="billingDifferentThanShipping"
									type="checkbox"
									checked={ input?.billingDifferentThanShipping }
									handleOnChange={ handleOnChange }
									label="Billing different than shipping"
									containerClassNames="mb-4 pt-4"
								/>
							</div>

							{/*Billing Details*/ }
							{ input?.billingDifferentThanShipping ? (
								<div className="billing-details">
									<h2 className="text-xl font-medium mb-4">Billing Details</h2>
									<Address
										states={ theBillingStates }
										countries={ billingCountries.length ? billingCountries: shippingCountries }
										input={ input?.billing }
										handleOnChange={ ( event ) => handleOnChange( event, false, true ) }
										isFetchingStates={ isFetchingBillingStates }
										isShipping={ false }
										isBillingOrShipping
									/>
								</div>
							) : null }

						</div>
						{/* Order & Payments*/ }
						<div className="checkout_wrapper_your_orders">
							<div className='checkout_order_wrapper'>
								{/*	Order*/ }
								<h2 className="text-xl font-medium mb-4">Your Order</h2>
								<YourOrder cart={ cart } />

								{/*Payment*/ }
								<h3>Выберите способ оплаты</h3>
								<PaymentModes input={ input } handleOnChange={ handleOnChange } />

								<div className="checkout_button_end">
									<button
										disabled={ isOrderProcessing }
										className={ cx(
											'bg-purple-600 text-white px-5 py-3 rounded-sm w-auto xl:w-full',
											{ 'opacity-50': isOrderProcessing },
										) }
										type="submit"
									>
										Оформить заказ
									</button>
								</div>

								{/* Checkout Loading*/ }
								{ isOrderProcessing && <p>Заказ обрабатывается...</p> }
								{ requestError && <p>Error : { requestError } :( Пожалуйста, попробуйте еще раз</p> }
							</div>
						</div>
					</div>
				</form>
			) : null }
		</>
	);
};

export default CheckoutForm;