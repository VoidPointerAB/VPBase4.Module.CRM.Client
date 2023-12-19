import React from 'react';

interface IProps {
    text: string,
    icon: JSX.Element,
    level: 'second' | 'third',
    children: React.ReactNode
}

const MenuGroup = (props: IProps) => {
    const text = props.level === 'second'
        ? <>{props.icon}<span className="nav-label">{props.text}</span></>
        : props.text

    return (
        <li className={`menu-group ${props.level}-level`}>
            <a href="#" className="has-arrow" aria-expanded="false">{text}</a>
            <ul aria-expanded="false" className={`nav nav-${props.level}-level collapse`} style={{ height: 0 }}>
                {props.children}
            </ul>
        </li>
    );
}

export default MenuGroup;