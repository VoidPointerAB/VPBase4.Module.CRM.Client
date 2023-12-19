import React from 'react';

import styles from './BoxItem.module.css';

export interface IBoxItemProps {
    className?: string,
    type?: IBoxItemType,
    onClick?(): any,
    children: any,
}

export type IBoxItemType = 'default' | 'primary' | 'success' | 'info' | 'warning' | 'danger';

export const BoxItem = (props: IBoxItemProps) => {

    const className = applyType(props.className ? props.className : '', props.type ? props.type : 'primary');

    return (
        <div className={`${styles.item} ${className}`}>{props.children}</div>
    )
}

function applyType(className: string, type: IBoxItemType): string {
    const classesToAdd = [
        `bg-${type}`,
    ];

    return className.concat(` ${classesToAdd.join(' ')}`);
}
