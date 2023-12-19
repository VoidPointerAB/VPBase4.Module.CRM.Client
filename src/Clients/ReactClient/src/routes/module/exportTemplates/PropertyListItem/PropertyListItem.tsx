import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { TemplateProperty } from '../exportTemplates';

import styles from './PropertyListItem.module.css';

interface PropertyListItemProps extends TemplateProperty {
    marked: boolean;
    handleMarking(id: string): void;
    moveUp?(id: string): void;
    moveDown?(id: string): void;
}

export const PropertyListItem = (props: PropertyListItemProps) => {
    return (
        <div className={`${styles.item} ${props.marked ? styles.marked : ''}`}>
            <span className={styles.title} onClick={() => props.handleMarking(props.id)}>{props.title}</span>
            {props.selected && (
                <div className={styles.controls}>
                    <span onClick={() => (props.moveUp ? props.moveUp(props.id) : null)}>
                        <FontAwesomeIcon icon="chevron-up" size="1x" />
                    </span>
                    <span onClick={() => (props.moveDown ? props.moveDown(props.id) : null)}>
                        <FontAwesomeIcon icon="chevron-down" size="1x" className="ml-2" />
                    </span>
                </div>
            )}
        </div>
    );
};
