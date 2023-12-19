import React from 'react';
import { Query } from 'react-apollo';
import Cookies from 'universal-cookie';
import moment from 'moment';
import i18next from 'i18next';

import apolloClient from 'apolloClient';

import FilterManager from 'helpers/module/crm/filterManager';
import { ConfirmDialog } from 'helpers/module/dialogs';
import { handleGraphQlErrors, handleGraphQlException } from 'helpers/module/errorManagement';
import { queryPreDataHandler } from 'helpers/module/queryPreDataHandler';

import CardList from './CardList';
import { ICardPersonProps } from './Card';
import PersonList from './ListComponent';
import { ListFilter } from './ListFilter';

import { ADD_USER_FAVORITE } from 'graphQL/module/crm/mutations/userFavorite/addUserFavorite';
import { DELETE_CONTACT_PERSON } from 'graphQL/module/crm/mutations/contactPerson/delete';
import { DELETE_USER_FAVORITE } from 'graphQL/module/crm/mutations/userFavorite/deleteUserFavorite';
import { GET_PERSON_LIST } from 'graphQL/module/crm/queries/contactPerson/getPersonList';
import { DELETED_PERSONS_SUBSCRIPTION } from 'graphQL/module/crm/subscriptions/contactPerson/subscribeToDeletedPersons';
import { getContactPersonList } from 'graphQL/module/crm/generatedTypes/getContactPersonList';
import {
    deleteContactPerson,
    deleteContactPersonVariables,
} from 'graphQL/module/crm/generatedTypes/deleteContactPerson';
import {
    addUserFavorite,
    addUserFavoriteVariables,
} from 'graphQL/module/crm/generatedTypes/addUserFavorite';
import { UserFavoriteEntityTypeEnum } from 'graphQL/module/crm/generatedTypes/globalTypes';

import { deletePersonsSubscription } from 'graphQL/module/crm/generatedTypes/deletePersonsSubscription';

import '../sharedItems/persons.css';

export interface IListFilter {
    contactCompanyId?: string;
    type: ListFilterType;
}

type ListFilterType = 'ALL' | 'FAVORITES' | 'CONTACT_COMPANY';

interface IListProps {
    location: any;
    history: any;
}

interface IListState {
    useCardView: boolean;
    filter: IListFilter;
}

class List extends React.Component<IListProps, IListState> {
    private filterManager: FilterManager;

    constructor(props: IListProps) {
        super(props);

        const contactCompanyId = props.location.state
            ? props.location.state.contactCompanyId
            : undefined;

        this.filterManager = new FilterManager('contacPersonListFilter', this.props.location, {
            contactCompanyId: contactCompanyId,
            type: contactCompanyId ? 'CONTACT_COMPANY' : 'ALL',
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

    public updateFilter = (filter: IListFilter) => {
        if (filter.type !== 'CONTACT_COMPANY') {
            filter.contactCompanyId = undefined;
        }

        this.setState({ filter })
    };

    public deletePerson = (id: string, onSuccess?: () => void) => {
        ConfirmDialog(i18next.t('messages.deletePerson')).then(result => {
            if (result.value !== true) {
                return;
            }
            apolloClient
                .mutate<deleteContactPerson, deleteContactPersonVariables>({
                    mutation: DELETE_CONTACT_PERSON,
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
                variables: { id, entityType: UserFavoriteEntityTypeEnum.PERSON },
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

        const queryVariables = {
            take: 100000,
            onlyShowFavorites: this.state.filter.type === 'FAVORITES'
        };
        
        return (
            <div className="d-flex flex-column">
                <ListFilter
                    history={this.props.history}
                    filter={this.state.filter}
                    useCardView={this.state.useCardView}
                    filterUpdater={this.updateFilter}
                    toggleUseCardView={this.toggleUseCardView}
                />
                <Query<getContactPersonList> query={GET_PERSON_LIST} variables={queryVariables}>
                    {({ loading, error, data, subscribeToMore }) => {
                        const queryPreData = queryPreDataHandler({ loading, error, data });

                        if (queryPreData) {
                            return queryPreData;
                        }
                        if (!data || !data.contactPersonList) {
                            return null;
                        }
                        if (!unsubscribe) {
                            unsubscribe = subscribeToMore<deletePersonsSubscription>({
                                document: DELETED_PERSONS_SUBSCRIPTION,
                                variables: {},
                                updateQuery: (prev, { subscriptionData: { data } }) => {
                                    if (!data || !prev.contactPersonList) return prev;
                                    let remainingListOfPersons = prev.contactPersonList.filter(
                                        person =>
                                            data.contactPersonDeletedEvent &&
                                            person.contactPersonId !==
                                                data.contactPersonDeletedEvent.contactPersonId
                                    );
                                    return {
                                        contactPersonList: remainingListOfPersons,
                                    };
                                },
                            });
                        }

                        const contactPersons: ICardPersonProps[] = data.contactPersonList.map(
                            person => {
                                return {
                                    activityCount: person.activityCount,
                                    contactPersonId: person.contactPersonId,
                                    contactCompany: person.contactCompany,
                                    createdUtc: moment.utc(person.createdUtc).format('YYYY-MM-DD'),
                                    firstName: person.firstName,
                                    email: person.email,
                                    isUserFavorite: person.isUserFavorite,
                                    mainPhone: person.mainPhone,
                                    lastName: person.lastName,
                                    skype: person.skype,
                                    tags: person.tags,
                                    title: person.title,
                                    website: person.website,
                                    setFavorite: this.setFavorite,
                                    deletePerson: this.deletePerson,
                                };
                            }
                        );

                        return this.state.useCardView ? (
                            <CardList
                                history={this.props.history}
                                contactPersons={contactPersons}
                            />
                        ) : (
                            <PersonList
                                contactPersons={contactPersons}
                                setFavorite={this.setFavorite}
                                delete={this.deletePerson}
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
