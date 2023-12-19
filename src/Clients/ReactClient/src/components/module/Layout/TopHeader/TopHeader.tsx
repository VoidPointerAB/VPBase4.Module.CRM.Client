/* global $ */

import React, { Suspense } from 'react';
import { Translation } from 'react-i18next';
import { FontAwesomeIcon as FA } from '@fortawesome/react-fontawesome';

import { logOut } from 'authManager';

import { SpinnerBounce } from 'components/module/Spinners/Spinner';

import styles from './TopHeader.module.css';

class TopHeader extends React.Component<any, any> {
    public toggleNavigation = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        $('body').toggleClass('mini-navbar');
        this.toggleMenu();
    };

    public toggleMenu = () => {
        if (!$('body').hasClass('mini-navbar') || $('body').hasClass('body-small')) {
            // Hide menu in order to smoothly turn on when maximize menu
            $('#side-menu').hide();
            // For smoothly turn on menu
            setTimeout(() => $('#side-menu').fadeIn(400), 200);
        } else if ($('body').hasClass('fixed-sidebar')) {
            $('#side-menu').hide();
            setTimeout(() => $('#side-menu').fadeIn(400), 100);
        } else {
            // Remove all inline style from jquery fadeIn function to reset menu state
            $('#side-menu').removeAttr('style');
        }
    };

    public render() {
        return (
            <div className="row border-bottom">
                <nav
                    className="navbar navbar-static-top white-bg"
                    role="navigation"
                    style={{ marginBottom: 0, width: '100%' }}
                >
                    <div className="navbar-header">
                        <a
                            href="/"
                            className="navbar-minimalize minimalize-styl-2 btn btn-primary"
                            onClick={this.toggleNavigation}
                        >
                            <FA icon="bars" />
                        </a>
                    </div>
                    <ul className="nav navbar-top-links navbar-right">
                        <li>
                            <Suspense
                                fallback={
                                    <SpinnerBounce className="d-flex justify-content-center" />
                                }
                            >
                                <Translation>
                                    {t => (
                                        <span id={styles.logout} onClick={logOut}>
                                            <FA
                                                icon="sign-out-alt"
                                                style={{ marginRight: '5px' }}
                                            />
                                            {t('button.logout')}
                                        </span>
                                    )}
                                </Translation>
                            </Suspense>
                        </li>
                    </ul>
                </nav>
            </div>
        );
    }
}

export default TopHeader;
