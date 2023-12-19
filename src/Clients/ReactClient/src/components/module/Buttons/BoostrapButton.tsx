import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

interface IBootstrapButton {
    className?: string;
    type: ButtonType;
    children: any,
    isSubmit?: boolean;
    isDisabled: boolean;
    icon?: IconProp;
    onClick?(event?: any): void;
}

type ButtonType = 'warning' | 'success' | 'danger' | 'primary' | 'info' | 'secondary' | 'default';

const BootstrapButton = (props: IBootstrapButton) => {
    const icon = props.icon ? (
        <FontAwesomeIcon className='mr-1' icon={props.icon} size="1x" />
    ) : null;

    return (
        <button
            className={`btn btn-${props.type} ${props.className ? props.className : ''}`}
            type={props.isSubmit ? 'submit' : 'button'}
            onClick={props.isDisabled ? undefined : props.onClick}
            disabled={props.isDisabled}
        >
            {props.children}
            {icon}
        </button>
    );
};

export default BootstrapButton;
