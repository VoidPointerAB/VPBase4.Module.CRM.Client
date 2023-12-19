import React from 'react';
import { Route } from 'react-router-dom';

import { RouteWrapper } from 'routes';

import View from './view/view';
import Edit from './edit/edit';
import List from './list/list';
import New from './new/new';
import AdvancedFilter from './advancedFilter/advancedFilter'

const routes = (props: any) => (
    <RouteWrapper>
        <Route exact={true} path={`${props.match.path}/list`} component={List} />
        <Route exact={true} path={`${props.match.path}/new`} component={New} />
        <Route exact={true} path={`${props.match.path}/edit/:contactPersonId`} component={Edit} />
        <Route exact={true} path={`${props.match.path}/view/:contactPersonId`} component={View} />
        <Route exact={true} path={`${props.match.path}/advancedfilter`} component={AdvancedFilter} />
    </RouteWrapper>
)

export default routes;
