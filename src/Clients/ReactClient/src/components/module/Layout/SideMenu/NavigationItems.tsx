import React from 'react';

interface IProps {
    children: React.ReactNode
}

const NavigationItems = (props: IProps) => {
    return (
        <ul className="nav metismenu" id="side-menu">
            {props.children}
        </ul>
    )
};

export default NavigationItems;