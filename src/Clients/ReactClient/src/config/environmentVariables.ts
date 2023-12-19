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

const demo: IEnvironment = {
    ...common,
    serverGraphqlAddress: 'http://demo.crm.server.vpdev.se/graphql',
    serverWebsocketGraphqlAddress: 'ws://demo.crm.server.vpdev.se/graphql',
};

const prod: IEnvironment = {
    ...common,
	applicationAddress: 'https://crm.voidpointer.se',
    applicationClientId: 'VPBase_Crm_ApplicationClient_WebReact',
    applicationLogoLocation: 'https://voidpointer.se/upload/brand/logo.png',
    applicationLogoSmallLocation: 'https://voidpointer.se/upload/brand/logo.png',
    applicationName: 'CRM',
    applicationTabTitle: 'VoidPointer CRM',
    applicationScope: 'Crm',

    serverAddress: 'https://crmserver.voidpointer.se',
    serverGraphqlAddress: 'https://crmserver.voidpointer.se/graphql',
    serverWebsocketGraphqlAddress: 'wss://crmserver.voidpointer.se:443/graphql',

    authAddress: 'https://auth.voidpointer.se',
    authCookieDomain: '.voidpointer.se',
    authCookiePrefix: 'VP_',
    authCookieMaxAge: 100000000,

    themeMenuHeaderColor: '#428bca',
};

const cciprod: IEnvironment = {
    ...common,
    applicationAddress: 'https://crm.corecode.se',
    applicationClientId: 'VPBase_Crm_ApplicationClient_WebReact',
    applicationLogoLocation: 'https://corecode.se/upload/Loggor/corecode-logo_white.png',
    applicationLogoSmallLocation: 'https://corecode.se/upload/Loggor/corecode-logo_small_white.png',
    applicationName: 'CRM',
    applicationTabTitle: 'CoreCode CRM',
    applicationScope: 'Cci',

    serverAddress: 'https://crmserver.corecode.se',
    serverGraphqlAddress: 'https://crmserver.corecode.se/graphql',
    serverWebsocketGraphqlAddress: 'wss://crmserver.corecode.se:443/graphql',

    authAddress: 'https://auth.corecode.se',
    authCookieDomain: '.corecode.se',
    authCookiePrefix: 'CCI_',

    themeMenuHeaderColor: '#357641',
};

const vpazureprod: IEnvironment = {
    ...common,
    applicationAddress: 'https://crm.voidpointer.se',
    applicationClientId: 'VPBase_Crm_ApplicationClient_WebReact',
    applicationLogoLocation: 'https://voidpointer.se/upload/brand/void-1.jpg',
    applicationLogoSmallLocation: 'https://voidpointer.se/upload/brand/logo-footer.png',
    applicationName: 'CRM',
    applicationTabTitle: 'Void Pointer CRM',
    applicationScope: 'VPBase',

    serverAddress: 'https://crmserver.voidpointer.se',
    serverGraphqlAddress: 'https://crmserver.voidpointer.se/graphql',
    serverWebsocketGraphqlAddress: 'wss://crmserver.voidpointer.se:443/graphql',

    authAddress: 'https://auth2.voidpointer.se',
    authCookieDomain: '.voidpointer.se',
    authCookiePrefix: 'VP_',

    themeMenuHeaderColor: '#357641',
};

const environments = {
    dev: dev,
    stage: stage,
    demo: demo,
    prod: prod,
    cciprod: cciprod,
	vpazureprod: vpazureprod,
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
