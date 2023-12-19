import React from 'react';
import { withRouter } from "react-router";
import { Route, Switch } from 'react-router-dom';

import { SV_headings, EN_headings } from './headerLanguages';
import Breadcrumbs from '../Breadcrumbs/Breadcrumbs';

import './header.css';

interface ITitleArray {
    exact: boolean,
    path: string,
    text: string
}

const titleArray: ITitleArray[] = [
    {
        exact: true,
        path: '/',
        text: false ? SV_headings.overView : EN_headings.overView,
    },
    {
        exact: false,
        path: '/contactcompanies/view/:contactCompanyId',
        text: false ? SV_headings.companyInformation : EN_headings.companyInformation,
    },
    {
        exact: false,
        path: '/contactcompanies/compare/:companies',
        text: false ? SV_headings.compareCompanies : EN_headings.compareCompanies,
    },
    {
        exact: false,
        path: '/contactcompanies/new',
        text: false ? SV_headings.createCompany : EN_headings.createCompany
    },
    {
        exact: false,
        path: '/contactcompanies/edit/:contactCompanyId',
        text: false ? SV_headings.editCompany : EN_headings.editCompany
    },
    {
        exact: false,
        path: '/contactcompanies/compare/',
        text: false ? SV_headings.compareCompanies : EN_headings.compareCompanies,
    },
    {
        exact: false,
        path: '/contactcompanies/advancedfilter',
        text: 'Contact companies: Advanced filter'
    },
    {
        exact: false,
        path: '/contactpersons/view/:contactPersonId',
        text: false ? SV_headings.personInformation : EN_headings.personInformation,
    },
    {
        exact: false,
        path: '/contactpersons/compare/:persons',
        text: false ? SV_headings.comparePersons : EN_headings.comparePersons,
    },
    {
        exact: false,
        path: '/contactpersons/compare/',
        text: false ? SV_headings.comparePersons : EN_headings.comparePersons,
    },
    {
        exact: false,
        path: '/contactpersons/new',
        text: false ? SV_headings.createPerson : EN_headings.createPerson,
    },
    {
        exact: false,
        path: '/contactpersons/edit/:contactPersonId',
        text: false ? SV_headings.editPerson : EN_headings.editPerson
    },
    {
        exact: false,
        path: '/contactpersons/advancedfilter',
        text: 'Contact persons: Advanced filter'
    },
    {
        exact: false,
        path: '/contactcompanies/list',
        text: false ? SV_headings.contactCompanies : EN_headings.contactCompanies
    },
    {
        exact: false,
        path: '/contactpersons/list',
        text: false ? SV_headings.contactPersons : EN_headings.contactPersons
    },
    {
        exact: false,
        path: '/activities/list',
        text: false ? SV_headings.activities : EN_headings.activities
    },
    {
        exact: false,
        path: '/activities/edit/:activityId',
        text: false ? SV_headings.editActivity : EN_headings.editActivity
    },
    {
        exact: false,
        path: '/activities/new',
        text: false ? SV_headings.createActivity : EN_headings.createActivity
    },
    {
        exact: false,
        path: '/matchingentities/list',
        text: false ? SV_headings.matchingEntities : EN_headings.matchingEntities
    },
    {
        exact: false,
        path: '/exporttemplates',
        text: 'Export templates'
    },
];

const Header = () => {
    const routes = titleArray.map((route: ITitleArray) => {
        return <Route exact={route.exact} key={route.path} path={route.path} render={() => <h2 className="display-5">{route.text}</h2>} />
    })

    return (
        <section id="header-container" className="white-bg border-bottom py-3 px-5 d-flex row flex-column">
            <section id="page-headings">
                <Switch>
                    {routes}
                </Switch>
                <Breadcrumbs />
            </section>
        </section>
    )
}

export default withRouter<any>(Header)