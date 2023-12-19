import React from 'react';
import { graphql, DataValue} from 'react-apollo';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Translation } from 'react-i18next';

import { IBox, IBoxContent } from 'components/module/inspinia/IBox/IBox';
import { GET_NUMBER_OF_COMPANY_COMPARISONS } from 'graphQL/module/crm/queries/matchingEntities/contactCompanyComparisonProposals';
import { GET_NUMBER_OF_PERSON_COMPARISONS } from 'graphQL/module/crm/queries/matchingEntities/contactPersonComparisonProposals';
import { numberOfContactCompanyComparisonProposals } from 'graphQL/module/crm/generatedTypes/numberOfContactCompanyComparisonProposals';
import { numberOfContactPersonComparisonProposals } from 'graphQL/module/crm/generatedTypes/numberOfContactPersonComparisonProposals';
import { DELETED_PERSONS_SUBSCRIPTION } from 'graphQL/module/crm/subscriptions/contactPerson/subscribeToDeletedPersons';
import { DELETED_COMPANIES_SUBSCRIPTION } from 'graphQL/module/crm/subscriptions/contactCompany/subscribeToDeletedCompanies';
import { queryPreDataHandler } from 'helpers/module/queryPreDataHandler';

let unsubscribe: any = null; 

interface InputPropsPerson extends VariablesPerson {}

interface InputPropsCompany extends VariablesCompany {}

type VariablesPerson = {}

type VariablesCompany = {}

type ChildPropsPersonComparison = InputPropsPerson & {
    personComparison: DataValue<numberOfContactPersonComparisonProposals, VariablesPerson>;
};

type ChildPropsCompanyComparison = InputPropsCompany & {
    companyComparison: DataValue<numberOfContactCompanyComparisonProposals, VariablesCompany>;
};

const personComparisonProposalsQuery = graphql<InputPropsPerson & InputPropsCompany, numberOfContactPersonComparisonProposals, VariablesPerson, ChildPropsPersonComparison>(GET_NUMBER_OF_PERSON_COMPARISONS, {name: 'personComparison'})
const companyComparisonProposalsQuery = graphql<InputPropsCompany & ChildPropsPersonComparison, numberOfContactCompanyComparisonProposals, VariablesCompany, ChildPropsCompanyComparison>(GET_NUMBER_OF_COMPANY_COMPARISONS, {name: 'companyComparison'})

export const MatchingEntities = personComparisonProposalsQuery(
    companyComparisonProposalsQuery(
        ({
            personComparison: { loading: personLoading, numberOfContactPersonComparisonProposals, error: errorPerson, subscribeToMore: subscribeToDeletedPersons },
            companyComparison: { loading: companyLoading, numberOfContactCompanyComparisonProposals, error: errorCompany, subscribeToMore: subscribeToDeletedCompanies},
        }) => {
            let error: any = errorPerson ? errorPerson : errorCompany;
            let content: any = (
                <Translation>
                    {(t) => 
                        <IBox className="ibox-matching-entities">
                        <IBoxContent className="widget yellow-bg m-0 d-flex justify-content-around align-items-center">
                            <FontAwesomeIcon icon="exclamation-circle" size="2x" className="mr-3" />
                            <p className="mr-auto mb-0 align-self-center">{t(getKeyTranslator(), {countCompany: numberOfContactCompanyComparisonProposals, countPerson: numberOfContactPersonComparisonProposals})}</p>
                            <Link className="link-widget" to="/matchingentities/list">{t('buttonLabels.Review')}<FontAwesomeIcon icon="chevron-right" size="1x" className="ml-2" /></Link> 
                        </IBoxContent>
                    </IBox>
                    }
                </Translation>
            );
 
			const queryPreData = queryPreDataHandler(
				{ 
					loading: personLoading || companyLoading, 
					error: error, 
                    data: {numberOfContactCompanyComparisonProposals, numberOfContactPersonComparisonProposals},
                    noDataHandler: () => {
                        if (numberOfContactCompanyComparisonProposals === 0 && numberOfContactPersonComparisonProposals === 0) {
                            return null;
                        }
                    }
                }
            );

			if (queryPreData !== undefined) {
				return queryPreData;
            }

            if (!unsubscribe) {
                unsubscribe = subscribeToDeletedCompanies({
                    document: DELETED_COMPANIES_SUBSCRIPTION,
                    variables: {},
                    updateQuery: (prev: numberOfContactCompanyComparisonProposals, {subscriptionData}: any) => {
                        // if (!subscriptionData.data || !prev.contactCompanyComparisonProposals) return prev;
                        // let remainingListOfCompanies = prev 
                        //     ? prev.contactCompanyComparisonProposals.filter((company: any) => 
                        //         company.contactCompanyOneId !== subscriptionData.data.contactCompanyDeletedEvent.contactCompanyId && company.contactCompanyTwoId !== subscriptionData.data.contactCompanyDeletedEvent.contactCompanyId ) 
                        //     : [];
                        // return  {
                        //     contactCompanyComparisonProposals: remainingListOfCompanies
                        // }
                    },
                    onError: (error) => console.warn(error)
                });

                unsubscribe = subscribeToDeletedPersons({
                    document: DELETED_PERSONS_SUBSCRIPTION,
                    variables: {},
                    updateQuery: (prev: numberOfContactPersonComparisonProposals, {subscriptionData}: any) => {
                        // if (!subscriptionData.data || !prev.contactPersonComparisonProposals) return prev;
                        // let remainingListOfPersons = prev 
                        //     ? prev.contactPersonComparisonProposals.filter((person: any) => 
                        //         person.contactPersonOneId !== subscriptionData.data.contactPersonDeletedEvent.contactPersonId && person.contactPersonTwoId !== subscriptionData.data.contactPersonDeletedEvent.contactPersonId ) 
                        //     : [];
                        // return  {
                        //     contactPersonComparisonProposals: remainingListOfPersons,
                        // }
                    },
                    onError: (error) => console.warn(error)
                });
            }

            const getKeyTranslator = () => {
                if (numberOfContactPersonComparisonProposals === 1 && numberOfContactCompanyComparisonProposals === 1) {
                    return "onePersonOneCompany"
                } 
                else if (numberOfContactPersonComparisonProposals === 1 && numberOfContactCompanyComparisonProposals === 0) {
                    return "onePerson"
                }
                else if (numberOfContactCompanyComparisonProposals === 1 && numberOfContactPersonComparisonProposals === 0) {
                    return "oneCompany"
                }
                else {
                    return "persons_companies_plural"
                }
            }    

            return content;
        }
    )
);
