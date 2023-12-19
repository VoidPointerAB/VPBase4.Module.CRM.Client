import React from 'react';
import { Query } from 'react-apollo';

import { ISearchTerm } from 'components/module/crm/SearchTermManager/TemplateManager/TemplateManager';
import CompanyList from './ListComponent';
import { queryPreDataHandler } from 'helpers/module/queryPreDataHandler';

import { CONTACT_COMPANY_SEARCH } from 'graphQL/module/crm/queries/advancedSearch/contactCompany';
import {
    contactCompanySearch,
    contactCompanySearchVariables,
} from 'graphQL/module/crm/generatedTypes/contactCompanySearch';

import '../../sharedItems/companies.css';

interface IListProps {
    searchTerms: ISearchTerm[];
}

export const List = (props: IListProps) => {
    return (
        <>
            {props.searchTerms.length > 0 && (
                <Query<contactCompanySearch, contactCompanySearchVariables>
                    query={CONTACT_COMPANY_SEARCH}
                    variables={{
                        take: 1000000,
                        searchTerms: getServerSearchTerms(props.searchTerms),
                    }}
                >
                    {({ loading, error, data }) => {
                        const queryPreData = queryPreDataHandler({ loading, error, data });

                        if (queryPreData) {
                            return queryPreData;
                        }

                        if (!data || !data.contactCompanySearch) {
                            return null;
                        }

                        const companies: any = data.contactCompanySearch.map(company => {
                            let postAddressData =
                                company.addresses === null || company.addresses.length === 0
                                    ? null
                                    : company.addresses.filter(
                                          address => address.addressType === 'PostAddress'
                                      )[0];
                            const postAddress = postAddressData
                                ? `${postAddressData.street}, ${postAddressData.postCode}, ${postAddressData.city}`
                                : '';

                            return { ...company, postAddress: postAddress };
                        });

                        return <CompanyList list={[...companies]} />;
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
