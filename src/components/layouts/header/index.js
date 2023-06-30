import Link from 'next/link';
import { useContext, useState } from 'react';
import isEmpty from 'lodash/isEmpty';
import SvgMailIcon from './../../icons/iconComponents/MailIcon';
import SvgPhoneIcon from './../../icons/iconComponents/PhoneIcon';


// import { BurgerIcon, TailwindIcon, Bag, User, Wishlist } from '../../icons';
// import { AppContext } from '../../context';
import { getPathNameFromUrl } from '../../../utils/miscellaneous';
import Head from 'next/head'
const Header = ({header}) => {
	const {headerMenuItems, siteDescription, siteLogoUrl, siteTitle, favicon} = header || {} //равны пунктам меню или пустому заголовку если пунктов меню нет
	console.warn('header', header);

	const [ isMenuVisible, setMenuVisibility ] = useState( false ); //Для изменения бургера и открытия меню

	return (
		<>
        <Head>
            <title>{siteTitle || 'Nexts WooCommerce App'}</title>
            <link rel="icon" href={ favicon  || "/favicon.ico" }/>
        </Head>
		<div className="container_header">
			<div className="top_header">
				<a href="/" className="desktop_logo">
					{siteLogoUrl ? (
					<img src={siteLogoUrl} alt="" />
					) : 
					<img src="/mainlogo.png" alt="" />

					}
				</a>
				<a href="/" className="mobile_logo">
					{siteLogoUrl ? (
					<img src={siteLogoUrl} alt="" />
					) : 
					<img src="/mainlogo.png" alt="" />

					}
				</a>
				<div className="top_header_search">

				</div>
				<div className="header_top_column">
					<a className="header_top_column_link" href="mailto:test@gmail.com">test@gmail.com</a>
					<div className="header_top_column_text main_buttom_popup" data-form="writetous"><SvgMailIcon /><span>Написать нам</span></div>
				</div>
				<div className="header_top_column header_top_column_second">
					<a className="header_top_column_link" href="tel:+79885502299">+79885502299</a>
					<div className="header_top_column_text main_buttom_popup" data-form="callback"><SvgPhoneIcon /><span>Заказать звонок</span></div>
				</div>
				<a
				className='header_top_button'>Каталог</a>
				<button 
				onClick={() => setMenuVisibility( ! isMenuVisible)} 
				className="header_top_button_mobile">
					Каталог
				</button>
				<div className={`${isMenuVisible ? 'mobile_menu_active mobile_menu' : 'mobile_menu'}`}>
					{ ! isEmpty( headerMenuItems ) && headerMenuItems.length ? headerMenuItems.map( menuItem => (
						<Link legacyBehavior key={ menuItem?.ID }
								href={ getPathNameFromUrl( menuItem?.url ?? '' ) || '/' }>
							<a className="block mt-4 lg:inline-block lg:mt-0 hover:text-brand-royal-blue duration-500 mr-10"
								dangerouslySetInnerHTML={ { __html: menuItem.title } }/>
						</Link>
					) ) : null }
						<Link legacyBehavior href="/blog">
							<a className="block mt-4 lg:inline-block lg:mt-0 hover:text-brand-royal-blue duration-500 mr-10 text-red-600с">Blog</a>
						</Link>
				</div>
			</div>
		</div>

		</>
	);
};

export default Header;
