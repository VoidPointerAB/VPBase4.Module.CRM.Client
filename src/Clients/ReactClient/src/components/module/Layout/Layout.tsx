import React from 'react';
import { Slide, ToastContainer } from 'react-toastify';

import Footer from './Footer';
import TopHeader from './TopHeader/TopHeader';
import SideMenu from './SideMenu/SideMenu';
import Header from 'components/module/crm/Header/Header';

class Layout extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = { navigationOpen: true };
    }

    public render() {
        const wrapperClass = 'gray-bg';
        return (
            <div id="wrapper">
                <SideMenu />
                <ToastContainer
                    autoClose={10000}
                    transition={Slide}
                />

                <div id="page-wrapper" className={wrapperClass}>

                    <TopHeader />
                    <Header />

                    <main className="wrapper wrapper-content">
                        {this.props.children}
                    </main>

                    <Footer />
                </div>
            </div>
        )
    }
}

export default Layout;