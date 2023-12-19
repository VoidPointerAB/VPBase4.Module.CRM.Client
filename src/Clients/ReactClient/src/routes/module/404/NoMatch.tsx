import React from 'react';

import styles from './NoMatch.module.css';

export const NoMatch = () => (
    <>
        <svg width="200" height="130">
            <rect style={{ fill: 'cadetblue' }} x="3" y="3" width="60" height="60" />
            <rect style={{ fill: 'cadetblue' }} x="80" y="80" width="30" height="30" />
        </svg>
        <section className={styles.container}>
            <h2 className={styles.header}>404</h2>
            <p className={styles.subHeader}>Page not found</p>
            <p className={styles.message}>
                Sorry, but the page you are looking for has note been found. Try checking the URL
                for error, then hit the refresh button on your browser.
            </p>
        </section>
        <svg width="200" height="100" className={styles.imageBottom}>
            <rect style={{ fill: 'cadetblue' }} x="65" y="0" width="30" height="30" />
            <rect style={{ fill: 'cadetblue' }} x="120" y="40" width="60" height="60" />
        </svg>
    </>
);
