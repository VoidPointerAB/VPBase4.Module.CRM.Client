import React from 'react';
import { Route, Redirect } from 'react-router';

import { isLoggedIn, logIn } from 'authManager';

export const ProtectedRoute = ({ accessCondition, component: Component, ...rest }: any) => {
    return (
        <Route
            {...rest}
            render={props => {
                if (!isLoggedIn()) {
                    logIn(rest.location.pathname);
                    return null;
                }

                if (accessCondition === undefined || accessCondition()) {
                    return <Component {...props} />;
                }

                return (
                    <Redirect
                        to={{
                            pathname: '/403',
                            state: { from: props.location },
                        }}
                    />
                );
            }}
        />
    );
};
