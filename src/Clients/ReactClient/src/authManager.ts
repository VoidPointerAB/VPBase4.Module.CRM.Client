import Cookies from 'universal-cookie';
import queryString from 'query-string';

import environmentVariables from 'config/environmentVariables';

import { ConfirmDialog } from 'helpers/module/dialogs';

const cookies = new Cookies();
const authCookieTenantId = `${environmentVariables.authCookiePrefix}ActiveTenantId`;
const authCookieTenantName = `${environmentVariables.authCookiePrefix}ActiveTenantName`;
const authCookieJwt = `${environmentVariables.authCookiePrefix}__auth`;
const tempRedirect = 'tempRedirect';
const externalLogInHandler = '/signin-oidc';
const externalLogOutHandler = '/signout-callback-oidc';

export interface AuthData {
    jwt: string;
    claims: { [key: string]: string };
    activeTenant: string;
    activeTenantName: string;
}

let authData: AuthData | undefined = undefined;

export function logIn(returnUrl?: string) {
    if (returnUrl) {
        sessionStorage.setItem(tempRedirect, returnUrl);
    }

    window.location.href = `${environmentVariables.authAddress}/connect/authorize?client_id=${environmentVariables.applicationClientId}&redirect_uri=${environmentVariables.applicationAddress}%2Fsignin-oidc&response_type=id_token&scope=openid%20profile%20${environmentVariables.applicationScope}&nonce=637006044076347671.NmI4MzRjMDctY2E0OS00Y2NhLThhNTktM2E1NDkwNGE5OGMwNWVkMjMyZTEtMTQ5NS00NDM1LTg0ODktMzNkMTMxNTc0ZDY2&state=CfDJ8NOXPKVUtNhFqVI8P6-lBTm2hwxEjV2qyZDnAuoHGPPTX76zGJLdjEPd4audq30EGTRgyx8pn6tRYWca0NupEXixYQrPq1FxwfH37QMZhGz59Nt-O8n-UGeAfJ-U-y5jpjxyOzR3M2KKz4d-8DjnladW0NT3CNYs1nar0TgMHWstoejuCyMqKDs2tnOoQEPJ-dV06WB4SNs00izIYefev0Vr3oiRiPABxaqqWC6UOIDf4cuGNUG4bSDPyawv-fNFYinHRwZWOw2aZSdNl-VUp1RXa5yJHFAV9_73BxbffK96JnZrFsCspxLK5CGt7_gEan0AOl-skaPqOwyfxp9uY632b_iGc6kPmnYRhBFnWNP8RrDdr8hy1jfbdmNwsjUKgQ&x-client-SKU=ID_NETSTANDARD1_4&x-client-ver=5.2.0.0`;
}

export function logOut() {
    ConfirmDialog('Are you sure you want to log out?').then(result => {
        if (result.value) {
            if (!authData) {
                return;
            }

            window.location.href = `${environmentVariables.authAddress}/connect/endsession?post_logout_redirect_uri=${environmentVariables.applicationAddress}%2Fsignout-callback-oidc&id_token_hint=${authData.jwt}&state=CfDJ8KWNBDlIh11MpAzP0H86xldBIq_nygKOLRP_w2vLsiIR5mGNFtYVgbShuItOql6aaCc8xPveAkdPVIhPUXVdnfkvg_Nrlar48H7Ha5zDrK0iVyQzuErAhWIegRd8QR8lZUk_RZr_qRfihYidv3_tImDp9bbD2A7P0YfHmeqCCXwGF08Q_iaB9PZ2YLU-9nGYlg&x-client-SKU=ID_NETSTANDARD1_4&x-client-ver=5.2.0.0`;
        }
    });
}

export function isLoggedIn(): boolean {
    return authData !== undefined;
}

export function isHandlingExternalLogin(routerData: any): boolean {
    return (
        routerData.location.pathname === externalLogInHandler ||
        routerData.location.pathname === externalLogOutHandler
    );
}

export function handleAuthState(routerData: any) {
    const persistentJwt = cookies.get(authCookieJwt);
    const persistentActiveTenantId = cookies.get(authCookieTenantId);
    const persistentActiveTenantName = cookies.get(authCookieTenantName);

    if (
        persistentJwt === undefined ||
        persistentJwt === 'undefined' ||
        persistentActiveTenantId === undefined ||
        persistentActiveTenantId === 'undefined' ||
        persistentActiveTenantName === undefined ||
        persistentActiveTenantName === 'undefined'
    ) {
        authData = undefined;
    } else if (
        authData === undefined &&
        persistentJwt &&
        persistentActiveTenantId &&
        persistentActiveTenantName
    ) {
        authData = {
            jwt: persistentJwt,
            activeTenant: persistentActiveTenantId,
            activeTenantName: persistentActiveTenantName,
            claims: parseJwt(persistentJwt),
        };
    }

    if (routerData.location.pathname === externalLogInHandler) {
        return handleExternalLogIn(routerData);
    }

    if (routerData.location.pathname === externalLogOutHandler) {
        return handleExternalLogOut(routerData);
    }
}

function handleExternalLogIn(signInData: any) {
    // Handle unsuccessfull login? redirect?

    const hashData: any = queryString.parse(signInData.location.hash);
    const queryStringData: any = queryString.parse(signInData.location.search);

    const cookieOptions = {
        domain: environmentVariables.authCookieDomain,
        maxAge: environmentVariables.authCookieMaxAge,
    };

    cookies.set(authCookieJwt, hashData.id_token, cookieOptions);
    cookies.set(authCookieTenantId, queryStringData.active_tenant, cookieOptions);
    cookies.set(authCookieTenantName, queryStringData.active_tenantname, cookieOptions);

    const returnUrl = sessionStorage.getItem(tempRedirect);
    sessionStorage.removeItem(tempRedirect);

    return returnUrl ? returnUrl : '/';
}

function parseJwt(token: string) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(
        atob(base64)
            .split('')
            .map(function(c) {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            })
            .join('')
    );

    return JSON.parse(jsonPayload);
}

function handleExternalLogOut(signOutData: any) {
    const cookieOptions = { domain: environmentVariables.authCookieDomain };

    cookies.remove(authCookieJwt, cookieOptions);
    cookies.remove(authCookieTenantId, cookieOptions);
    cookies.remove(authCookieTenantName, cookieOptions);

    authData = undefined;

    return '/';
}

export function getAuthData() {
    return authData;
}

export function getLoggedInUserId() {
    if (!authData) {
        return undefined;
    }

    return authData.claims['userid'];
}

export function hasClaim(claimType: string, requiredValue?: string | number): boolean {
    if (authData === undefined) {
        return false;
    }

    const claim = authData.claims[claimType];

    if (claim === undefined) {
        return false;
    }

    if (!requiredValue) {
        return true;
    }

    if (Array.isArray(claim)) {
        for (let i = 0; i < claim.length; i++) {
            if (claim[i] === requiredValue) {
                return true;
            }
        }
        return false;
    }

    return claim === requiredValue;
}
