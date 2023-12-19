import React from 'react';

import NoData from 'components/module/NoData/NoData';

import { MatchingEntitiesListItem } from './MatchingEntitiesListItem';

import styles from './MatchingEntitiesList.module.css';

interface IListProps {
    pathTo: string;
    type: MatchType;
    items: IListItemProps[];
}

interface IListItemProps {
    left: {
        id: string;
        name: string;
    };
    right: {
        id: string;
        name: string;
    };
}

export type MatchType = 'person' | 'company';

const List = (props: IListProps) => {
    const matches = props.items.map((item: IListItemProps) => (
        <MatchingEntitiesListItem
            key={`${item.left.id}${item.right.id}`}
            left={item.left}
            right={item.right}
            pathTo={props.pathTo}
            type={props.type}
            className={styles.item}
        />
    ));

    return matches.length === 0 ? <NoData /> : <div className={styles.list}>{matches}</div>;
};

export default List;
