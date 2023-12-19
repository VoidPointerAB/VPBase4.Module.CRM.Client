import React from 'react';
import { Translation } from 'react-i18next';
import { Query } from 'react-apollo';

import { IBox, IBoxContent } from 'components/module/inspinia/IBox/IBox';

import ItemList from "./MatchingEntitiesList/MatchingEntitiesList";
import { queryPreDataHandler } from 'helpers/module/queryPreDataHandler';

import { GET_COMPANY_COMPARISON_LIST }from 'graphQL/module/crm/queries/matchingEntities/contactCompanyComparisonProposals';
import { GET_PERSON_COMPARISON_LIST }from 'graphQL/module/crm/queries/matchingEntities/contactPersonComparisonProposals';
import { DELETED_PERSONS_SUBSCRIPTION } from 'graphQL/module/crm/subscriptions/contactPerson/subscribeToDeletedPersons';
import { DELETED_COMPANIES_SUBSCRIPTION } from 'graphQL/module/crm/subscriptions/contactCompany/subscribeToDeletedCompanies';
import { getCompanyComparisonProposals } from 'graphQL/module/crm/generatedTypes/getCompanyComparisonProposals';
import { deleteCompaniesSubscription } from 'graphQL/module/crm/generatedTypes/deleteCompaniesSubscription';
import { getPersonsComparisonProposals } from 'graphQL/module/crm/generatedTypes/getPersonsComparisonProposals';
import { deletePersonsSubscription } from 'graphQL/module/crm/generatedTypes/deletePersonsSubscription';

let unsubscribeDeletedCompanies: any = null;
let unsubscribeDeletedPersons: any = null;
const MatchingEntities = () => {
    return (
        <Translation>
            {(t) => 
                <div className="row">
                    <div className="col-6">
                        <IBox>
                            <IBoxContent className="d-flex align-baseline justify-content-between">
                                <h3 className="m-0">{t('contactCompanies')}</h3>
                            </IBoxContent>
                            <IBoxContent>
                                <Query<getCompanyComparisonProposals> query={GET_COMPANY_COMPARISON_LIST}>
                                    {({ loading, error, data, subscribeToMore }) => {
                                        const queryPreData = queryPreDataHandler({loading, error, data})
                        
                                        if (queryPreData) {
                                            return queryPreData;
                                        }

                                        if (!data || !data.contactCompanyComparisonProposals) {
                                            return null;
                                        }

                                        if (!unsubscribeDeletedCompanies) {
                                            unsubscribeDeletedCompanies = subscribeToMore<deleteCompaniesSubscription>({
                                                document: DELETED_COMPANIES_SUBSCRIPTION,
                                                variables: {},
                                                updateQuery: (prev, {subscriptionData: {data}}) => {
                                                    if (!data || !prev.contactCompanyComparisonProposals) return prev;
                                                    let remainingListOfCompanies = prev 
                                                        ? prev.contactCompanyComparisonProposals.filter((company: any) => {
                                                            if (!data.contactCompanyDeletedEvent) {
                                                                return null;
                                                            }
                                                            return company.contactCompanyOneId !== data.contactCompanyDeletedEvent.contactCompanyId && company.contactCompanyTwoId !== data.contactCompanyDeletedEvent.contactCompanyId }) 
                                                        : [];
                                                    return {
                                                        contactCompanyComparisonProposals: remainingListOfCompanies
                                                    } 
                                                }
                                            })
                                        }

                                        const items = data.contactCompanyComparisonProposals.map(item => {
                                            return {
                                                left:  {
                                                    id: item.contactCompanyOneId,
                                                    name: item.contactCompanyOneName,
                                                },
                                                right: {
                                                    id: item.contactCompanyTwoId,
                                                    name: item.contactCompanyTwoName,
                                                }
                                            }
                                        })
        
                                        return <ItemList pathTo="/contactcompanies/view/" items={items} type="company" />
                                    }}
                                </Query>
                            </IBoxContent>
                        </IBox>
                    </div>
                    <div className="col-6">
                        <IBox>
                            <IBoxContent className="d-flex align-baseline justify-content-between">
                                <h3 className="m-0">{t('contactPersons')}</h3>
                            </IBoxContent>
                            <IBoxContent>
                                <Query<getPersonsComparisonProposals> query={GET_PERSON_COMPARISON_LIST}>
                                    {({ loading, error, data, subscribeToMore }) => {
                                        const queryPreData = queryPreDataHandler({loading, error, data})
                    
                                        if (queryPreData) {
                                            return queryPreData;
                                        }

                                        if (!data || !data.contactPersonComparisonProposals) {
                                            return null;
                                        }

                                        if (!unsubscribeDeletedPersons) {
                                            unsubscribeDeletedPersons = subscribeToMore<deletePersonsSubscription>({
                                                document: DELETED_PERSONS_SUBSCRIPTION,
                                                variables: {},
                                                updateQuery: (prev, {subscriptionData: {data}}) => {
                                                    if (!data || !prev.contactPersonComparisonProposals) return prev;
                                                    let remainingListOfPersons = prev 
                                                        ? prev.contactPersonComparisonProposals.filter((person: any) => {
                                                            if (!data.contactPersonDeletedEvent) {
                                                                return null;
                                                            }
                                                            return person.contactPersonOneId !== data.contactPersonDeletedEvent.contactPersonId && person.contactPersonTwoId !== data.contactPersonDeletedEvent.contactPersonId })
                                                        : [];
                                                    return {
                                                        contactPersonComparisonProposals: remainingListOfPersons,
                                                    }
                                                }
                                            })
                                        }
        
                                        const items = data.contactPersonComparisonProposals.map(item => {
                                            return {
                                                left:  {
                                                    id: item.contactPersonOneId,
                                                    name: item.contactPersonOneName,
                                                },
                                                right: {
                                                    id: item.contactPersonTwoId,
                                                    name: item.contactPersonTwoName,
                                                }
                                            }
                                        })
        
                                        return <ItemList pathTo="/contactpersons/view/" items={items} type="person" />
                                    }}
                                </Query>
                            </IBoxContent>
                        </IBox>
                    </div>
                </div>
            }
        </Translation>
        
    )
}

export default MatchingEntities;