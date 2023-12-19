import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import { hasClaim } from 'authManager'

import { ProtectedRoute } from 'components/module/ProtectedRoute/ProtectedRoute';

// Base routes
import Dashboard from 'routes/module/dashboard/dashboard';

import ExportTemplates from 'routes/module/exportTemplates/exportTemplates';
import { AccessDenied } from 'routes/module/accessDenied/accessDenied';
import { NoMatch } from 'routes/module/404/NoMatch';

import Activities from 'routes/module/crm/activities/routes';
import ContactCompany from 'routes/module/crm/contactCompany/routes';
import Person from 'routes/module/crm/contactPerson/routes';
import MatchingEntities from 'routes/module/crm/matchingEntities/routes';

// import Vp_Template_Basic from 'routes/module/Vp_Template_Basic';

// Custom routes

export const RouteWrapper = ({ children }: any) => (
    <Switch>
        {children}
        <Redirect to="/404" />
    </Switch>
);

const crmAccess = () => hasClaim('role', 'Crm Admin');

const routes = (
    <RouteWrapper>
        {/* Base routes start */}
        <ProtectedRoute path="/exporttemplates" exact={true} component={ExportTemplates} accessCondition={crmAccess} />
        {/* Base routes end */}

        {/* Custom routes start */}
        <ProtectedRoute path="/contactcompanies" component={ContactCompany} accessCondition={crmAccess} />
        <ProtectedRoute path="/contactpersons" component={Person} accessCondition={crmAccess} />
        <ProtectedRoute path="/activities" component={Activities} accessCondition={crmAccess} />
        <ProtectedRoute path="/matchingentities" component={MatchingEntities} accessCondition={crmAccess} />
        <ProtectedRoute path="/exporttemplates" component={ExportTemplates} accessCondition={crmAccess} />

        {/* Custom routes end */}

        {/* Template start */}
        {/* <ProtectedRoute path="/Vp_Template_Basic" component={Vp_Template_Basic} /> */}
        {/* Template end */}

        <ProtectedRoute path="/" exact={true} component={Dashboard} accessCondition={crmAccess} />
        <Route path="/403" exact={true} component={AccessDenied} />
        <Route path="/404" exact={true} component={NoMatch} />
    </RouteWrapper>
);

export default routes;
