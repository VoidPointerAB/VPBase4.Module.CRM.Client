import React from 'react';
import i18next from 'i18next';

import withBreadcrumbs from 'react-router-breadcrumbs-hoc';

import { Link } from 'react-router-dom';
import './breadcrumb.css'

const routes = [
  { path: '/matchingentities', breadcrumb: () => <Link to={{ pathname: '/matchingentities/list', state: { navigatedFromBreadCrumb: true } }}>{i18next.t('breadcrumbs.matchingEntities')}</Link> },
  { path: '/contactcompanies', breadcrumb: () => <Link to={{ pathname: '/contactcompanies/list', state: { navigatedFromBreadCrumb: true } }}>{i18next.t('breadcrumbs.contactCompanies')}</Link> },
  { path: '/contactpersons', breadcrumb: () => <Link to={{ pathname: '/contactpersons/list', state: { navigatedFromBreadCrumb: true } }}>{i18next.t('breadcrumbs.contactPersons')}</Link> },
  { path: '/activities', breadcrumb: () => i18next.t('breadcrumbs.activities') },
  { path: '/activities/list', breadcrumb: null },
  { path: '/contactpersons/list', breadcrumb: null },
  { path: '/contactcompanies/list', breadcrumb: null },
  { path: '/contactpersons/view', breadcrumb: null },
  { path: '/contactpersons/new', breadcrumb: () => i18next.t('breadcrumbs.new') },
  { path: '/contactpersons/edit', breadcrumb: () => i18next.t('breadcrumbs.edit') },
  { path: '/contactpersons/advancedfilter', breadcrumb: () => 'Advanced filter' },
  { path: '/contactcompanies/view', breadcrumb: null },
  { path: '/contactcompanies/edit', breadcrumb: () => i18next.t('breadcrumbs.edit') },
  { path: '/contactcompanies/new', breadcrumb: () => i18next.t('breadcrumbs.new') },
  { path: '/contactcompanies/advancedfilter', breadcrumb: () => 'Advanced filter' },
  { path: '/activities/new', breadcrumb: () => i18next.t('breadcrumbs.new') },
  { path: '/activities/edit', breadcrumb: () => i18next.t('breadcrumbs.edit') },
  { path: '/exporttemplates', breadcrumb: () => 'Export templates' },
  { path: '/', breadcrumb: () => <Link to={{ pathname: '/', state: { navigatedFromBreadCrumb: true } }}>{i18next.t('breadcrumbs.home')}</Link> },
];

const Breadcrumbs = ({breadcrumbs} : any) => {
  return (
    <ol className="breadcrumb">
      {breadcrumbs.map(({breadcrumb}: any) => (
        <li key={breadcrumb.key} className="breadcrumb-item">
          {breadcrumb}
        </li>
      ))}
    </ol>
  )
};

export default withBreadcrumbs(routes)(Breadcrumbs);