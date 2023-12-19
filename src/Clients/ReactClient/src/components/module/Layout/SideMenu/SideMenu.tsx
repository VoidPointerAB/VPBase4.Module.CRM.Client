/* global $ */

import React from 'react';

import { FontAwesomeIcon as FA } from '@fortawesome/react-fontawesome';
import { withTranslation } from 'react-i18next';

import Header from './Header/Header';
import NavigationItem from './NavigationItem'
import NavigationItems from './NavigationItems';

import 'metismenu';

class SideMenu extends React.Component<any> {
    public componentDidMount() {
        $('#side-menu').metisMenu();
    }

    public render() {
        const { t } = this.props
        return (
            <nav className="navbar-default navbar-static-side sidebar-nav" role="navigation">
                <ul className="nav metismenu" id="side-menu">
                    <Header />

                    <NavigationItems>
                        <NavigationItem exact={true} to="/" icon={<FA icon="th-large" />} text={t('metisMenu.overview')}/>
                        <NavigationItem to="/contactcompanies/list" icon={<FA icon="building" />} text={t('metisMenu.contactCompanies')} />
                        <NavigationItem to="/contactpersons/list" icon={<FA icon="user" />} text={t('metisMenu.contactPersons')} />
                        <NavigationItem to="/activities/list" icon={<FA icon="clipboard-list" />} text={t('metisMenu.activities')} />
                        <NavigationItem exact={true} to="/exporttemplates" icon={<FA icon="th-large" />} text={'Export-templates'}/>
                        {/* <NavigationItem exact={true} to="/Vp_Template_Basic/List" icon={<FA icon="th-large" />} text={'Vp_Template_Basic'}/> */}
                    </NavigationItems>
                </ul>
            </nav>
        )
    }
}

export default withTranslation()(SideMenu);
