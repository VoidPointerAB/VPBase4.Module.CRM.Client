import React from 'react';
import { Route } from 'react-router-dom';

import { RouteWrapper } from 'routes';

import Edit from './edit/edit';
import List from './list/list';
import New from './new/new';

const routes = (props: any) => (
    <RouteWrapper>
        <Route exact={false} path={`${props.match.path}/list`} component={List} />
        <Route exact={true} path={`${props.match.path}/new`} component={New} />
        <Route exact={true} path={`${props.match.path}/edit/:activityId`} component={Edit} />
    </RouteWrapper>
);

export default routes;
