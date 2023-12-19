import React from 'react';
import { Route } from 'react-router-dom';

import { RouteWrapper } from 'routes';

import MatchingEntities from './matchingEntities';

const routes = (props: any) => (
    <RouteWrapper>
        <Route exact={true} path={`${props.match.path}/list`} component={MatchingEntities} />
    </RouteWrapper>
);

export default routes;
