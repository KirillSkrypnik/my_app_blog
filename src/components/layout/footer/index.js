import {getPathNameFromUrl, sanitaze} from '../../../utils/miscellaneous';
import * as SvgIconsComponent from '../../icons/iconComponents';
import { isEmpty, isArray } from 'lodash';  
import Link from 'next/link';

export const getIconComponentByName = (name)=>{
    const ComponentsMap = {
        facebook: SvgIconsComponent.Facebook,
        twitter: SvgIconsComponent.Twitter,
        instagram: SvgIconsComponent.Instagram,
        youtube: SvgIconsComponent.Youtube
    }

    if(name in ComponentsMap){
        const IconComponents = ComponentsMap[name];
        return <IconComponents title={name}/>
    } else {
        return null;
    }
};
const Footer = ({footer}) => {
    // console.log( footer);
    const {copyrightText, footerMenuItems, sidebarOne, sidebarTwo, socialLinks, carbon} = footer || {};

    return (
        <footer>
            <div className="container_header">
                <div className="footer_column_wrapper">
                    <div className="footer_column_one">
                        <a href="/"><img src="https://fomin.seo-imedia161.ru/wp-content/uploads/2023/04/Frame.png"/></a>
                        <div className="footer_column_copyright">
                        {copyrightText || 'Copyright © 2023 Yumozik'}
                        </div>
                        <div className="footer_column_powered">
                        Powered by Yumoz
                        </div>
                    </div>
                    <div className="footer_column_two">
                        <div className="footer_column_title">Контакты</div>
                        { ! isEmpty( footerMenuItems ) && isArray( footerMenuItems ) ? (
							<ul className='footer_main_navigation'>
								{ footerMenuItems.map( menuItem => (
									<li key={ menuItem?.ID }>
										<Link legacyBehavior href={ getPathNameFromUrl( menuItem?.url ?? '' ) || '/' }>
											<a>{ menuItem?.title }</a>
										</Link>
									</li>
								) ) }
							</ul>
						) : null }
                    </div>
                    <div className="footer_column_three">
                        <div className="footer_column_title">Контакты</div>

                        <div className="footer_phone_wrapper footer_contact_wrapper">
                        <img src="https://fomin.seo-imedia161.ru/wp-content/uploads/2023/04/footer_phone_icon.png" />
                            <a href="tel:" > 
                            {/* {footer.carbon[0].CONTENT} */}
                            </a> 
                        </div>
                        <div className="footer_email_wrapper footer_contact_wrapper">
                        <img src="https://fomin.seo-imedia161.ru/wp-content/uploads/2023/04/foorer_email_icon.png" />
                            <a href="">
                                {/* {footer.carbon[1].CONTENT}			 */}
                            </a>
                        </div>
                        <div className="footer_map_wrapper footer_contact_wrapper">
                        <img src="https://fomin.seo-imedia161.ru/wp-content/uploads/2023/04/foorer_map_icon.png" />
                        <a href="">
                        {/* {footer.carbon[3].CONTENT}					 */}
                        </a>
                        </div>
                    </div>
                    <div className="footer_column_four">
                        <div className="footer_callback_btn main_buttom_popup" data-form="callback">
                        Заказать звонок
                        </div>
                        <div className="footer_social_links_wrapper">
                            {/* {socialLinks?.map(socialLink => (
                                    <a href={socialLink?.iconUrl || '/'}>
                                        {getIconComponentByName (socialLink?.iconName)}
                                    </a>
                            ))}     */}
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer;