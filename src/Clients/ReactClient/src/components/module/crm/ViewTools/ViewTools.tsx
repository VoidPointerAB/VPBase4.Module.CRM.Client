import React, { FunctionComponent } from 'react';

import styles from './ViewTools.module.css';

interface ViewToolsProps {
    className?: string;
}

export const ViewTools: FunctionComponent<ViewToolsProps> = props => (
    <div className={`${styles.container} ${props.className ? props.className : ''}`}>{props.children}</div>
);
