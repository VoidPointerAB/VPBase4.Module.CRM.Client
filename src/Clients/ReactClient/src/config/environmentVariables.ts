interface IEnvironment {
    applicationAddress: string;
    applicationClientId: string;
    applicationLogoLocation: string;
    applicationLogoSmallLocation: string;
    applicationName: string;
    applicationTabTitle: string;
    applicationScope: string;

    serverAddress: string;
    serverGraphqlAddress: string;
    serverWebsocketGraphqlAddress: string;

    authAddress: string;
    authCookieDomain: string;
    authCookieMaxAge: number;
    authCookiePrefix: string;

    themeMenuHeaderColor: string;
}

const vars = process.env;
const missingVariable = 'Missing variable';
const common = {
    applicationAddress: vars.REACT_APP_APPLICATION_ADDRESS || missingVariable,
    applicationClientId: vars.REACT_APP_APPLICATION_CLIENT_ID || missingVariable,
    applicationLogoLocation: vars.REACT_APP_APPLICATION_LOGO_LOCATION || missingVariable,
    applicationLogoSmallLocation: vars.REACT_APP_APPLICATION_LOGO_SMALL_LOCATION || missingVariable,
    applicationName: vars.REACT_APP_APPLICATION_NAME || missingVariable,
    applicationTabTitle: vars.REACT_APP_APPLICATION_TAB_TITLE || missingVariable,
    applicationScope: vars.REACT_APP_APPLICATION_SCOPE || missingVariable,

    serverAddress: vars.REACT_APP_SERVER_ADDRESS || missingVariable,
    serverGraphqlAddress: vars.REACT_APP_SERVER_GRAPHQL_ADDRESS || missingVariable,
    serverWebsocketGraphqlAddress:
        vars.REACT_APP_SERVER_WEBSOCKET_GRAPHQL_ADDRESS || missingVariable,

    authAddress: vars.REACT_APP_AUTH_ADDRESS || missingVariable,
    authCookieDomain:
        vars.REACT_APP_AUTH_COOKIE_DOMAIN === undefined
            ? missingVariable
            : vars.REACT_APP_AUTH_COOKIE_DOMAIN,
    authCookieMaxAge: vars.REACT_APP_AUTH_COOKIE_MAXAGE
        ? parseInt(vars.REACT_APP_AUTH_COOKIE_MAXAGE)
        : -1,
    authCookiePrefix: vars.REACT_APP_AUTH_COOKIE_PREFIX || missingVariable,

    themeMenuHeaderColor: vars.REACT_APP_THEME_MENU_HEADER_COLOR || missingVariable,
};

const dev: IEnvironment = {
    ...common,
};

const stage: IEnvironment = {
    ...common,
};

const environments = {
    dev: dev,
    stage: stage,
};

const environmentVariables: IEnvironment = (environments as any)[vars.REACT_APP_ENVIRONMENT as any];

let hasCheckedVariables = false;
export function verifyEnvironmenVariables() {
    if (!hasCheckedVariables) {
        const missingVariableError = (key: string) => {
            alert(`Missing value for environment variable: "${key}"`);
            throw new Error(`Missing value for environment variable: "${key}"`);
        };

        for (const variable in environmentVariables) {
            if ((environmentVariables as any)[variable] === missingVariable) {
                missingVariableError(variable);
            }
        }

        if (environmentVariables.authCookieMaxAge === -1) {
            missingVariableError('authCookieMaxAge');
        }

        hasCheckedVariables = true;
    }
}

export default environmentVariables;
