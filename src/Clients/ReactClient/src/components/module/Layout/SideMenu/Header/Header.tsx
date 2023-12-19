import React, { useState } from 'react';

import { logOut, getAuthData, AuthData } from 'authManager';

import environmentVariables from 'config/environmentVariables';

import styles from './Header.module.css';

const profileStyles = {
    backgroundColor: environmentVariables.themeMenuHeaderColor,
    backgroundImage: 'none',
    backgroundBlendMode: 'multiply',
};

const Header = () => {
    const authData = getAuthData();

    const [logo, setLogo] = useState<any>(undefined);
    const [smallLogo, setSmallLogo] = useState<any>(undefined);

    if (logo === undefined) {
        getLogo(environmentVariables.applicationLogoLocation, image => setLogo(image));
        getLogo(environmentVariables.applicationLogoSmallLocation, image => setSmallLogo(image));
    }

    const logoElement = logo !== undefined && <img alt="logo" className="img-fluid" src={logo} />;
    const smallLogoElement = smallLogo !== undefined && <img alt="logo" className="img-fluid" src={smallLogo} />;

    return (
        <li className={`${styles.content} nav-header`} style={profileStyles}>
            <div className="dropdown profile-element">
                <span>{logoElement}</span>
                <span className={styles.appName}>{environmentVariables.applicationName}</span>

                {authData && loggedInData(authData)}
            </div>
            <div className="logo-element">{smallLogoElement}</div>
        </li>
    );
};

const loggedInData = (authData: AuthData) => (
    <>
        <hr />

        <a data-toggle="dropdown" className={`${styles.loggedInName} dropdown-toggle`} href="/">
            <strong>
                {authData.claims.family_name
                    ? `${authData.claims.given_name} ${authData.claims.family_name}`
                    : `${authData.claims.given_name}`}
            </strong>
            <i className="fa fa-caret-down ml-2" />
        </a>
        <span className={`${styles.tenantName} block mt-1`}>{authData.activeTenantName}</span>

        <ul className={`${styles.dropdownMenu} dropdown-menu m-t-xs`}>
            <li onClick={logOut}>Logout</li>
        </ul>
    </>
);

function getLogo(imagePath: string, imageSetter: (image: any) => any) {
    if (imagePath.substring(0, 4) === 'http') {
        imageSetter(imagePath);
    } else {
        import(`assets/${imagePath}`)
            .then(importedImage => {
                imageSetter(importedImage.default);
            })
            .catch(error => console.error('Could not get application logo', error));
    }
}

export default Header;
