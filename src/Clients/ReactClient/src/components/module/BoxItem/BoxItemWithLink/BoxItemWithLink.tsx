import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { BoxItem, IBoxItemType } from '../BoxItem'

import styles from './BoxItemWithLink.module.css'

interface IBoxItemWithLinkProps {
    className?: string,
    type?: IBoxItemType,
    text: string,
    linkText: string,
    link: string
}

export const BoxItemWithLink = (props: IBoxItemWithLinkProps) => {
    return (
        <BoxItem
            className={`${styles.item} ${props.className}`}
            type={props.type}>
            <>
                <label>{props.text}</label>
                <Link to={props.link}>{props.linkText}<FontAwesomeIcon icon="chevron-right" size="1x" className="ml-2" /></Link>
            </>
        </BoxItem>
    )
}
