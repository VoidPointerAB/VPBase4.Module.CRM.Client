import React from 'react';
import { Query } from 'react-apollo';
import moment from 'moment';

import ActivityList, { IActivityItem } from 'routes/module/crm/activities/list/ListComponent';
import { queryPreDataHandler } from 'helpers/module/queryPreDataHandler';
import FilterManager from 'helpers/module/crm/filterManager';

import ListFilter from './ListFilter';

import { GET_ACTIVITIES_WITH_COMPANIES_PERSONS_LIST } from 'graphQL/module/crm/queries/activities/getActivitiesWithCompanyAndPersons';
import { DELETED_ACTIVITIES_SUBSCRIPTION } from 'graphQL/module/crm/subscriptions/activities/subscribeToDeletedActivities';
import { deleteActivitiesSubscription } from 'graphQL/module/crm/generatedTypes/deleteActivitiesSubscription';
import { getActivities } from 'graphQL/module/crm/generatedTypes/getActivities';

interface IListProps {
    location: any;
    history: any;
}

export interface IListFilter {
    contactPersonId: string | null;
    contactCompanyId: string | null;
    startDate: moment.Moment | null;
    endDate: moment.Moment | null;
}

interface IListState {
    filter: IListFilter;
}

class List extends React.Component<IListProps, IListState> {
    private filterManager: FilterManager;

    constructor(props: IListProps) {
        super(props);

        const routerState: any = props.location.state;
        const selectedPersonId: string = routerState ? routerState.contactPersonId : null;
        const selectedCompanyId: string = routerState ? routerState.contactCompanyId : null;

        this.filterManager = new FilterManager('activityListFilter', this.props.location, {
            contactCompanyId: selectedCompanyId,
            contactPersonId: selectedPersonId,
            startDate: moment().subtract(1, 'months'),
            endDate: moment().add(1, 'months'),
        });

        const storedFilter = this.filterManager.getFilter();

        this.state = {
            filter: {
                ...storedFilter,
                startDate: storedFilter.startDate ? moment(storedFilter.startDate) : null,
                endDate: storedFilter.endDate ? moment(storedFilter.endDate) : null,
            },
        };
    }

    public componentWillUnmount() {
        this.filterManager.updateSessionStorage(this.state.filter, false);
    }

    public setFilter = (filter: IListFilter) => {
        this.setState({ filter });
    }

    public createNewActivity = () => {
        this.props.history.push('/activities/new');
    };

    public render() {
        return (
            <>
                <ListFilter
                    filter={this.state.filter}
                    setFilter={this.setFilter}
                    createNewActivity={this.createNewActivity}
                />
                <Query<getActivities>
                    query={GET_ACTIVITIES_WITH_COMPANIES_PERSONS_LIST}
                    variables={{
                        contactCompanyId: this.state.filter.contactCompanyId,
                        contactPersonId: this.state.filter.contactPersonId,
                        startDate: this.state.filter.startDate,
                        endDate: this.state.filter.endDate,
                    }}
                >
                    {({ loading, error, data, subscribeToMore }) => {
                        let unsubscribe = null;

                        const queryPreData = queryPreDataHandler({ loading, error, data });

                        if (queryPreData) {
                            return queryPreData;
                        }

                        if (!unsubscribe) {
                            unsubscribe = subscribeToMore<deleteActivitiesSubscription>({
                                document: DELETED_ACTIVITIES_SUBSCRIPTION,
                                variables: {},
                                updateQuery: (prev, { subscriptionData: { data } }) => {
                                    if (!data || !prev.activities) return prev;

                                    let remainingActivities = prev.activities.filter(activity => {
                                        return (
                                            data.activityDeletedEvent &&
                                            activity &&
                                            activity.activityId !==
                                                data.activityDeletedEvent.activityId
                                        );
                                    });

                                    return {
                                        activities: remainingActivities,
                                    };
                                },
                                onError: error => console.warn(error),
                            });
                        }

                        if (!data || !data.activities) {
                            return null;
                        }

                        const activities: IActivityItem[] = data.activities.map(activity => {
                            const contactCompanies = activity.contactCompanies
                                ? activity.contactCompanies.map(({ id, name }) => ({ id, name }))
                                : [];
                            const contactPersons = activity.contactPersons
                                ? activity.contactPersons.map(({ id, name }) => ({ id, name }))
                                : [];

                            return {
                                activityId: activity.activityId,
                                contactCompanies,
                                contactPersons,
                                description: activity.description,
                                type: getTypeData(activity.type),
                                createdUtc: activity.createdUtc,
                                date: activity.date,
                                time: activity.time
                                    ? moment(activity.time, 'HH:mm').format('HH:mm')
                                    : '',
                            };
                        });

                        return (
                            <ActivityList
                                activities={activities}
                                location={this.props.location}
                                history={this.props.history}
                                applyDataTableFilter={() =>
                                    this.filterManager.applyDataTableFilter(this.state.filter)
                                }
                            />
                        );
                    }}
                </Query>
            </>
        );

        function getTypeData(type: string) {
            let display;
            switch (type) {
                case 'PHONE':
                    display = '<i class="fa fa-phone my-0 mr-2"></i>Phone';
                    break;
                case 'EMAIL':
                    display = '<i class="fa fa-at my-0 mr-2"></i>Email';
                    break;
                case 'MEETING':
                    display = '<i class="fa fa-users my-0 mr-2"></i>Meeting';
                    break;
                case 'NOTE':
                    display = '<i class="fa fa-sticky-note my-0 mr-2"></i>Note';
                    break;
                default:
                    display = '<i class="fa fa-calendar my-0 mr-2"></i>Other';
            }

            return {
                display: display,
                sort: type,
            };
        }
    }
}
export default List;
