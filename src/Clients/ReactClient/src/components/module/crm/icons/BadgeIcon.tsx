import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

interface IBadgeProps {
    children?: any;
    className?: string;
    icon?: IconProp;
    onClick?(): any;
}

const BadgeIcon = (props: IBadgeProps) => {
    const icon = props.icon ? (
        <FontAwesomeIcon className={`${props.children !== undefined ? 'mr-1' : ''}`} icon={props.icon} size="1x" />
    ) : null;

    return (
        <span className={`badge ${props.className ? props.className : ''}`} onClick={props.onClick}>
            {icon}
            {props.children}
        </span>
    );
};

export default BadgeIcon;
