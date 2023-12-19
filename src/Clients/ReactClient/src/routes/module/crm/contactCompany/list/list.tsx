import React from 'react';
import { Query } from 'react-apollo';
import Cookies from 'universal-cookie';
import i18next from 'i18next';

import apolloClient from 'apolloClient';

import FilterManager from 'helpers/module/crm/filterManager';
import { ConfirmDialog } from 'helpers/module/dialogs';
import { handleGraphQlErrors, handleGraphQlException } from 'helpers/module/errorManagement';
import { queryPreDataHandler } from 'helpers/module/queryPreDataHandler';

import CardList from './CardList';
import { ICardCompanyProps } from './Card';
import CompanyList from './ListComponent';
import { ListFilter } from './ListFilter';

import { ADD_USER_FAVORITE } from 'graphQL/module/crm/mutations/userFavorite/addUserFavorite';
import { DELETE_USER_FAVORITE } from 'graphQL/module/crm/mutations/userFavorite/deleteUserFavorite';
import { DELETE_CONTACTCOMPANY } from 'graphQL/module/crm/mutations/contactCompany/delete';
import { GET_COMPANIES_LIST } from 'graphQL/module/crm/queries/contactCompany/getCompaniesList';
import { DELETED_COMPANIES_SUBSCRIPTION } from 'graphQL/module/crm/subscriptions/contactCompany/subscribeToDeletedCompanies';
import { getCompanyListData } from 'graphQL/module/crm/generatedTypes/getCompanyListData';
import { deleteCompaniesSubscription } from 'graphQL/module/crm/generatedTypes/deleteCompaniesSubscription';
import {
    deleteContactCompany,
    deleteContactCompanyVariables,
} from 'graphQL/module/crm/generatedTypes/deleteContactCompany';
import {
    addUserFavorite,
    addUserFavoriteVariables,
} from 'graphQL/module/crm/generatedTypes/addUserFavorite';
import { UserFavoriteEntityTypeEnum } from 'graphQL/module/crm/generatedTypes/globalTypes';

import '../sharedItems/companies.css';

export interface IListFilter {
    onlyShowFavorites: boolean;
}

interface IListProps {
    history: any;
    location: any;
}

interface IListState {
    useCardView: boolean;
    filter: IListFilter;
}

class List extends React.Component<IListProps, IListState> {
    private filterManager: FilterManager;

    constructor(props: any) {
        super(props);

        this.filterManager = new FilterManager('contacCompanyListFilter', this.props.location, {
            onlyShowFavorites: true,
        });

        const cookies = new Cookies();

        this.state = {
            useCardView: cookies.get('CardView') === 'true',
            filter: this.filterManager.getFilter(),
        };
    }

    public componentWillUnmount() {
        this.filterManager.updateSessionStorage(this.state.filter, false);
    }

    public toggleUseCardView = () => {
        const cookies = new Cookies();
        this.setState({ useCardView: !this.state.useCardView }, () =>
            cookies.set('CardView', this.state.useCardView, { path: '/' })
        );
    };

    public updateFilter = (filter: IListFilter) => this.setState({ filter });

    public deleteCompany = (id: string, onSuccess?: () => void) => {
        ConfirmDialog(i18next.t('messages.deleteCompany')).then(result => {
            if (result.value !== true) {
                return;
            }
            apolloClient
                .mutate<deleteContactCompany, deleteContactCompanyVariables>({
                    mutation: DELETE_CONTACTCOMPANY,
                    variables: { id },
                })
                .then(({ errors }: any) => {
                    handleGraphQlErrors(errors, onSuccess);
                })
                .catch(errors => handleGraphQlException(errors));
        });
    };

    public setFavorite = (id: string, isFavorite: boolean, onError?: () => void) => {
        apolloClient
            .mutate<addUserFavorite, addUserFavoriteVariables>({
                mutation: isFavorite ? ADD_USER_FAVORITE : DELETE_USER_FAVORITE,
                variables: { id, entityType: UserFavoriteEntityTypeEnum.COMPANY },
            })
            .then(({ errors }: any) => {
                handleGraphQlErrors(errors);

                if (errors && errors.length > 0 && onError) {
                    onError();
                }
            })
            .catch((error: any) => {
                handleGraphQlException(error);

                if (onError) {
                    onError();
                }
            });
    };

    public render() {
        let unsubscribe: any = null;

        return (
            <div className="d-flex flex-column">
                <ListFilter
                    history={this.props.history}
                    filter={this.state.filter}
                    useCardView={this.state.useCardView}
                    filterUpdater={this.updateFilter}
                    toggleUseCardView={this.toggleUseCardView}
                />
                <Query<getCompanyListData>
                    query={GET_COMPANIES_LIST}
                    variables={{ take: 100000, ...this.state.filter }}
                >
                    {({ loading, error, data, subscribeToMore }) => {
                        const queryPreData = queryPreDataHandler({ loading, error, data });
                        if (queryPreData) {
                            return queryPreData;
                        }
                        if (!data || !data.contactCompanyList) {
                            return null;
                        }

                        if (!unsubscribe) {
                            unsubscribe = subscribeToMore<deleteCompaniesSubscription>({
                                document: DELETED_COMPANIES_SUBSCRIPTION,
                                variables: {},
                                updateQuery: (prev, { subscriptionData: { data } }) => {
                                    if (!data || !prev.contactCompanyList) return prev;
                                    let remainingListOfCompanies = prev.contactCompanyList.filter(
                                        company => {
                                            return (
                                                data.contactCompanyDeletedEvent &&
                                                company.contactCompanyId !==
                                                    data.contactCompanyDeletedEvent.contactCompanyId
                                            );
                                        }
                                    );
                                    return {
                                        contactCompanyList: remainingListOfCompanies,
                                    };
                                },
                                onError: error => console.warn(error),
                            });
                        }

                        const contactCompanies: ICardCompanyProps[] = data.contactCompanyList.map(
                            company => {
                                return {
                                    activityCount: company.activityCount,
                                    contactCompanyId: company.contactCompanyId,
                                    contactPersons: company.contactPersons,
                                    email: company.email,
                                    isUserFavorite: company.isUserFavorite,
                                    name: company.name,
                                    phone: company.phone,
                                    tags: company.tags,
                                    setFavorite: this.setFavorite,
                                    deleteCompany: this.deleteCompany,
                                };
                            }
                        );

                        return this.state.useCardView ? (
                            <CardList
                                history={this.props.history}
                                contactCompanies={contactCompanies}
                            />
                        ) : (
                            <CompanyList
                                contactCompanyList={contactCompanies}
                                setFavorite={this.setFavorite}
                                delete={this.deleteCompany}
                                applyDataTableFilter={() =>
                                    this.filterManager.applyDataTableFilter(this.state.filter)
                                }
                                history={this.props.history}
                            />
                        );
                    }}
                </Query>
            </div>
        );
    }
}
export default List;
