import { isEmpty } from 'lodash';

// Первая функция сеанс сохранения
export const storeSession = ( session ) => {
	
	if ( isEmpty( session ) ) {
		return null;
	}
	
	localStorage.setItem( 'x-wc-session', session ); //Помещаяем в локальное хранилище
    // x-wc-session - имя ключа
}
// Вторая функция получения сеансов
export const getSession = () => {
    // Получаем сеанс из локального хранилища применяя ключ
	return localStorage.getItem( 'x-wc-session' );
}
