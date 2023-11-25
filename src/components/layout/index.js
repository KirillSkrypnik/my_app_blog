import Header from './header';
import Footer from './footer';
import { AppProvider } from '../context';
import Seo from '../seo';
import Head from 'next/head';
import { replaceBackendWithFrontendUrl } from '../../utils/miscellaneous';

const Layout = ({ children, headerFooter }) => {

    const { header, footer } = headerFooter || {};
    const yoastSchema = seo?.schema ? replaceBackendWithFrontendUrl( JSON.stringify( seo.schema ) ) : null;

    return (
        <AppProvider>
            <Seo seo={ seo || {} } uri={ uri || '' } />
            <Head>

            </Head>
            <div>
                <Header header={header} />
                    <main className='container'>
                    { children }
                    </main>
                <Footer footer={footer} />
            </div>
        </AppProvider>
    );   
}

export default Layout;