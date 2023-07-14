import { getSession } from './session';
import { isEmpty } from 'lodash';

// Функция для получения конфигураций корзины
export const getApiCartConfig = () => {
	
	const config = {
		headers: {
			'X-Headless-CMS': true,
		},
	}
	
    // Получаем значение сеанса с помощью getSession
	const storedSession = getSession();
	
	if ( !isEmpty( storedSession ) ) {
		config.headers['x-wc-session'] = storedSession;
	}
	
	return config;
}