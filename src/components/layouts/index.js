import Products from '../products/products';
import Categories from '../categories/index';
import Header from './header';
import Footer from './footer';
import { AppProvider } from '../context';

const Layout = ({ children, headerFooter }) => {

    const { header, footer } = headerFooter || {};

    return (
        <AppProvider>
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