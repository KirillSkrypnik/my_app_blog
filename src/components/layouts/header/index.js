import Link from 'next/link';
// import { useContext, useState } from 'react';
import isEmpty from 'lodash/isEmpty';

// import { BurgerIcon, TailwindIcon, Bag, User, Wishlist } from '../../icons';
// import { AppContext } from '../../context';
import { getPathNameFromUrl } from '../../../utils/miscellaneous';
import Head from 'next/head'
const Header = ({header}) => {
	const {headerMenuItems, siteDescription, siteLogoUrl, siteTitle, favicon} = header || {} //равны пунктам меню или пустому заголовку если пунктов меню нет
	console.warn('header', header);

	return (
		<>
        <Head>
            <title>{siteTitle || 'Nexts WooCommerce App'}</title>
            <link rel="icon" href={ favicon  || "/favicon.ico" }/>
        </Head>
			<div className="header">
				<nav className="bg-white py-5">
					<div className="flex items-center justify-between flex-wrap container mx-auto">
						<div className="flex items-center flex-shrink-0 text-black mr-20">
						{							siteLogoUrl ? (
							<img src={siteLogoUrl} alt="" />
						) : 
							<img src="/mainlogo.png" alt="" />
						
						}
						</div>
						<div className="block lg:hidden">
							<button>
							</button>
						</div>
						<div>
							<div className="text-sm font-medium uppercase lg:flex-grow">
									<a className="block mt-4 lg:inline-block lg:mt-0 hover:text-brand-royal-blue duration-500 mr-10">Blog</a>
							</div>
							<div className="text-sm font-medium">
								<a href="#responsive-header"
								   className="flex mt-4 lg:inline-block lg:mt-0 text-black hover:text-black mr-10">
									<span className="flex flex-row items-center lg:flex-col">
									</span>
								</a>
								<a href="#responsive-header"
								   className="flex mt-4 lg:inline-block lg:mt-0 text-black hover:text-black mr-10">
									<span className="flex flex-row items-center lg:flex-col">
									</span>
								</a>
							</div>
						</div>
					</div>
				</nav>
			</div>
		<div className="text-sm font-medium uppercase lg:flex-grow">
							{ ! isEmpty( headerMenuItems ) && headerMenuItems.length ? headerMenuItems.map( menuItem => (
								<Link key={ menuItem?.ID }
										href={ getPathNameFromUrl( menuItem?.url ?? '' ) || '/' }>
									<a className="block mt-4 lg:inline-block lg:mt-0 hover:text-brand-royal-blue duration-500 mr-10"
										dangerouslySetInnerHTML={ { __html: menuItem.title } }/>
								</Link>
							) ) : null }
							<Link href="/blog">
								<a className="block mt-4 lg:inline-block lg:mt-0 hover:text-brand-royal-blue duration-500 mr-10">Blog</a>
							</Link>
						</div>
		</>
	);
};

export default Header;
