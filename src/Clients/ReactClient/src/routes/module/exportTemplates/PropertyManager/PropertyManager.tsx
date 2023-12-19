import React from 'react';
import _ from 'lodash';

import { TemplateProperty } from '../exportTemplates';
import { PropertyList } from '../PropertyList/PropertyList';

import styles from './PropertyManager.module.css';

interface PropertyManagerProps {
    items: TemplateProperty[] | null;
    marked: string[];
    handleMarking(id: string): void;
    moveToSelected(): void;
    moveToNotSelected(): void;
    moveUp(id: string): void;
    moveDown(id: string): void;
    setAllSelected(): void;
    setAllNotSelected(): void;
}

export const PropertyManager = (props: PropertyManagerProps) => {
    const {
        items,
        marked,
        handleMarking,
        moveToSelected,
        moveToNotSelected,
        moveUp,
        moveDown,
        setAllSelected,
        setAllNotSelected,
    } = props;

    const anyMarked = marked.length > 0;

    return (
        <div className="mt-3 mb-3">
            <div className={styles.propertyManager}>
                <PropertyList
                    title="Available properties"
                    items={_.orderBy(items && items.filter(item => !item.selected), ['title'])}
                    markedItems={marked}
                    handleMarking={handleMarking}
                />
                <div className={styles.buttomColumn}>
                    <button
                        className="btn btn-primary mb-3"
                        onClick={anyMarked ? moveToSelected : setAllSelected}
                    >
                        {anyMarked ? '>' : '>>'}
                    </button>
                    <button
                        className="btn btn-primary"
                        onClick={anyMarked ? moveToNotSelected : setAllNotSelected}
                    >
                        {anyMarked ? '<' : '<<'}
                    </button>
                </div>
                <PropertyList
                    title="Selected properties"
                    items={items && items.filter(item => item.selected)}
                    markedItems={marked}
                    handleMarking={handleMarking}
                    moveUp={moveUp}
                    moveDown={moveDown}
                />
            </div>
        </div>
    );
};
