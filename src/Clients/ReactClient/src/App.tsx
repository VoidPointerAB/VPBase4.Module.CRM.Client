import React from 'react';

import { withRouter, Redirect } from 'react-router';

import { handleAuthState, isLoggedIn, logIn } from 'authManager';

import { verifyEnvironmenVariables } from 'config/environmentVariables';

import Layout from 'components/module/Layout/Layout';

import routes from 'routes';

class App extends React.Component<any, any> {
    public render() {
        verifyEnvironmenVariables();

        const redirectUrl = handleAuthState(this.props);
        if (redirectUrl) {
            return <Redirect to={redirectUrl} />;
        }

        if (!isLoggedIn()) {
            logIn(this.props.location.pathname);
            return null;
        }

        return <Layout>{routes}</Layout>;
    }
}

export default withRouter<any>(App);
