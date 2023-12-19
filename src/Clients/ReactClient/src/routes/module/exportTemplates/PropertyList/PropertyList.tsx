import React from 'react';
import _ from 'lodash';

import { TemplateProperty } from '../exportTemplates';

import { PropertyListItem } from '../PropertyListItem/PropertyListItem';

import styles from './PropertyList.module.css';

interface PropertyListProps {
    title: string;
    items: TemplateProperty[] | null;
    markedItems: string[];
    handleMarking(id: string): void;
    moveUp?(id: string): void;
    moveDown?(id: string): void;
}

export const PropertyList = (props: PropertyListProps) => {
    if(!props.items) return null;
    const items = props.items.map(item => (
        <PropertyListItem
            key={item.id}
            {...item}
            marked={_.includes(props.markedItems, item.id)}
            handleMarking={props.handleMarking}
            moveUp={props.moveUp}
            moveDown={props.moveDown}
        />
    ));

    return (
        <div className={styles.list}>
            <h4>{props.title}</h4>
            <ul>{items}</ul>
        </div>
    );
};
