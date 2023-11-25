import Link from 'next/link';
import { useContext, useState } from 'react';
import { AppContext } from '../../context';
import isEmpty from 'lodash/isEmpty';
import SvgMailIcon from './../../icons/iconComponents/MailIcon';
import SvgPhoneIcon from './../../icons/iconComponents/PhoneIcon';


// import { BurgerIcon, TailwindIcon, Bag, User, Wishlist } from '../../icons';
// import { AppContext } from '../../context';
import { getPathNameFromUrl } from '../../../utils/miscellaneous';
import Head from 'next/head'
const Header = ({header}) => {
	const {headerMenuItems, siteDescription, siteLogoUrl, siteTitle, favicon, carbon, carbonHistory} = header || {} //равны пунктам меню или пустому заголовку если пунктов меню нет
	// console.warn('header', header);
	const [ cart, setCart ] = useContext( AppContext );

	const [ isMenuVisible, setMenuVisibility ] = useState( false ); //Для изменения бургера и открытия меню

	return (
		<>
        <Head>
            <title>{siteTitle || 'Nexts WooCommerce App'}</title>
            <link rel="icon" href={ favicon  || "/favicon.ico" }/>
			<link rel="preconnect" href="https://fonts.googleapis.com" />
			<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
			<link href="https://fonts.googleapis.com/css2?family=Cormorant:wght@400;600;700&family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;1,100;1,600;1,700&family=Rubik:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
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
					<a className="header_top_column_link" href="">
                                {/* {carbon[1].CONTENT}			 */}
                            </a>
					<div className="header_top_column_text main_buttom_popup" data-form="writetous"><SvgMailIcon /><span>Написать нам</span></div>
				</div>
				<div className="header_top_column header_top_column_second">
					<a className="header_top_column_link" href="tel:" > 
                            {/* {header.carbon[0].CONTENT} */}
                    </a> 
					<div className="header_top_column_text main_buttom_popup" data-form="callback"><SvgPhoneIcon /><span>Заказать звонок</span></div>
				</div>
				<a
				className='header_top_button'>Каталог</a>
				<Link legacyBehavior href="/cart">
					<a className='header_top_button header_top_button_cart'>Корзина <span>{cart?.totalQty ? `(${cart?.totalQty})` : null}</span></a>
				</Link>
				<button 
				onClick={() => setMenuVisibility( ! isMenuVisible)} 
				className="header_top_button_mobile">
					Каталог
				</button>
				<div className={`${isMenuVisible ? 'mobile_menu_active mobile_menu' : 'mobile_menu'}`}>
					{ ! isEmpty( headerMenuItems ) && headerMenuItems.length ? headerMenuItems.map( menuItem => (
						<Link rel="stylesheet" legacyBehavior key={ menuItem?.ID }
								href={ getPathNameFromUrl( menuItem?.url ?? '' ) || '/' }>
							<a className="block mt-4 lg:inline-block lg:mt-0 hover:text-brand-royal-blue duration-500 mr-10"
								dangerouslySetInnerHTML={ { __html: menuItem.title } }/>
						</Link>
					) ) : null }
						<Link rel="stylesheet" legacyBehavior href="/blog">
							<a className="block mt-4 lg:inline-block lg:mt-0 hover:text-brand-royal-blue duration-500 mr-10 text-red-600с">Blog</a>
						</Link>
				</div>
			</div>
		</div>
		<div>
			{/* {header.carbonHistory[0].CONTENT} */}
		</div>
		</>
	);
};

export default Header;
