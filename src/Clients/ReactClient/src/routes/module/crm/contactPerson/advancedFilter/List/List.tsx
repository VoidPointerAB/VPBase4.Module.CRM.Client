import React from 'react';
import { Query } from 'react-apollo';

import { queryPreDataHandler } from 'helpers/module/queryPreDataHandler';
import { ISearchTerm } from 'components/module/crm/SearchTermManager/TemplateManager/TemplateManager';
import PersonList from './ListComponent';

import { CONTACT_PERSON_SEARCH } from 'graphQL/module/crm/queries/advancedSearch/contactPerson';
import { contactPersonSearch, contactPersonSearchVariables } from 'graphQL/module/crm/generatedTypes/contactPersonSearch';

import '../../sharedItems/persons.css';

interface IListProps {
    searchTerms: ISearchTerm[];
}

export const List = (props: IListProps) => {
    return (
        <>
            {props.searchTerms.length > 0 && (
                <Query<contactPersonSearch, contactPersonSearchVariables>
                    query={CONTACT_PERSON_SEARCH}
                    variables={{ take: 1000000, searchTerms: getServerSearchTerms(props.searchTerms) }}
                >
                    {({ loading, error, data }) => {
                        const queryPreData = queryPreDataHandler({loading, error, data})
                    
                        if (queryPreData) {
                            return queryPreData;
                        }

                        if (!data || !data.contactPersonSearch) {
                            return null;
                        }
                        return <PersonList list={[...data.contactPersonSearch]} />;
                    }}
                </Query>
            )}
        </>
    );
};

function getServerSearchTerms(searchTerms: ISearchTerm[]) {
    return searchTerms.map(({ term, has, entityType }) => ({
        term: term,
        has: has,
        entity: entityType,
    }));
}

export default List;
