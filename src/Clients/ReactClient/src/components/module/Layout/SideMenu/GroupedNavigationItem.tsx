import React from 'react';

import { NavLink } from 'react-router-dom';

interface INavigationItemProps {
    text: string,
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
            <NavLink exact={props.exact} to={props.to}>{props.text}</NavLink>
        </li>
    )
};

export default NavigationItem;