import React from 'react';

import { NavLink } from 'react-router-dom';

interface INavigationItemProps {
    text: string,
    icon: JSX.Element,
    exact?: boolean,
    to: string,
}

const NavigationItem = (props: INavigationItemProps) => {
    props = {
        exact: false,
        ...props
    }

    return (
        <li>
            <NavLink exact={props.exact} to={props.to}>{props.icon}<span className="nav-label">{props.text}</span></NavLink>
        </li>
    )
};

export default NavigationItem;