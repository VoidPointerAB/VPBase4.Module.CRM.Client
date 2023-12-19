import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import _ from 'lodash';

import styles from './AvailableConditions.module.css';

export interface IAvailableConditionItem {
    label: string;
    description: string;
    onClick(): any;
}

interface IAvailableConditionsProps {
    items: IAvailableConditionItem[];
}

export const AvailableConditions = (props: IAvailableConditionsProps) => {
    const [description, setDescription] = useState<string | undefined>(undefined);
    const [filter, setFilter] = useState<string | undefined>(undefined);

    const filteredItems = filter
        ? props.items.filter(item => _.includes(_.toLower(item.label), filter))
        : props.items;

    const items = filteredItems.map(item => (
        <li
            key={item.label}
            onClick={item.onClick}
            onMouseEnter={() => setDescription(item.description)}
            onMouseLeave={() => setDescription(undefined)}
        >
            <span className={styles.item}>
                <FontAwesomeIcon icon="plus" size="1x" />
                {item.label}
            </span>
        </li>
    ));

    const handleFilterChange = (e: any) => {
        setFilter(_.toLower(e.target.value));
    };

    return (
        <>
            <label className="font-bold">Available conditions</label>
            <div className="pr-3">
                <input
                    className="form-control mb-2 mt-2"
                    onChange={handleFilterChange}
                    placeholder="Search..."
                />
            </div>
            <ul className={styles.list}>{items}</ul>
            <div className={`${styles.description} ${description ? '' : styles.hidden}`}>
                <strong>Description:</strong> {description}
            </div>
        </>
    );
};
