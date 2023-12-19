import React from 'react';
import { Route } from 'react-router-dom';

import { RouteWrapper } from 'routes';

import CompanyDetails from './view/view';
import Edit from './edit/edit';
import List from './list/list';
import New from './new/new';
import AdvancedFilter from './advancedFilter/advancedFilter'

const routes = (props: any) => (
    <RouteWrapper>
        <Route exact={true} path={`${props.match.path}/list`} component={List} />
        <Route exact={true} path={`${props.match.path}/new`} component={New} />
        <Route exact={true} path={`${props.match.path}/edit/:contactCompanyId`} component={Edit} />
        <Route exact={true} path={`${props.match.path}/view/:contactCompanyId`} component={CompanyDetails} />
        <Route exact={true} path={`${props.match.path}/advancedfilter`} component={AdvancedFilter} />
    </RouteWrapper>
)

export default routes;
