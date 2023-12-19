import React from 'react';

import { Link } from 'react-router-dom';
import SearchPopOver from './SearchPopOver';
import i18next from 'i18next';

interface IProps {
    entityId: string,
    entityName: string,
    entityType: 'CONTACTPERSON' | 'CONTACTCOMPANY' | 'ACTIVITY'
    history: any
}

const SearchResultItem = (props: IProps) => {
    const getKeyTranslator = (entityType: string) => {
        if ( entityType === 'CONTACTCOMPANY') {
            return i18next.t('contactCompanyType')
        }
        if ( entityType === 'CONTACTPERSON' ) {
            return i18next.t('contactPersonType')
        }
        if ( entityType === 'ACTIVITY' ) {
            return i18next.t('activityType')
        }
        else { 
            return i18next.t('defaultType')
        }
    }
    const typeofSearch = props.entityType !== null ? getKeyTranslator(props.entityType) : ''
    return (
        <div key={props.entityId} className="search-item col-12">
            <li>
                <Link  className={props.entityType !== 'ACTIVITY' ? '' : 'd-none'} to={props.entityType === 'CONTACTCOMPANY'
                    ? `/contactcompanies/view/${props.entityId}`
                    : `/contactpersons/view/${props.entityId}`}>{props.entityName}
                </Link>
                <div className={props.entityType === 'ACTIVITY' ? '' : 'd-none'}>
                    {props.entityName}
                </div>
                <span className="pl-1"> ({typeofSearch.toLowerCase()})</span>
            </li>
            <section className="search-result-menu">
                <SearchPopOver id={props.entityId} type={props.entityType} history={props.history} />
            </section>
        </div>
    )
}

export default SearchResultItem;